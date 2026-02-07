<template>
  <main class="background-page">
    <div class="layout-container">
      <!-- LEFT PANEL - Editor Controls -->
      <div class="left-panel" :class="{ 'panel-collapsed': isPanelCollapsed }">
        <div class="panel-header">
          <h2 class="panel-title">
            <Icon name="mdi:palette" class="text-[24px]" />
            <span>Bảng điều khiển</span>
          </h2>
          <button @click="togglePanel" class="toggle-btn" title="Thu gọn/Mở rộng">
            <Icon :name="isPanelCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" class="text-[24px]" />
          </button>
        </div>

        <div class="panel-content" v-show="!isPanelCollapsed">
          <EditorPanel
            :bg-mode="bgMode"
            :gradient-start="gradientStart"
            :gradient-end="gradientEnd"
            :gradient-angle="gradientAngle"
            :overlay-opacity="overlayOpacity"
            :drag-enabled="dragEnabled"
            :show-edit-hints="showEditHints"
            :preset-name.sync="presetName"
            :selected-preset.sync="selectedPreset"
            :presets-list="presetsList"
            @update:bgMode="val => (bgMode = val)"
            @update:gradientStart="val => (gradientStart = val)"
            @update:gradientEnd="val => (gradientEnd = val)"
            @update:gradientAngle="val => (gradientAngle = val)"
            @update:overlayOpacity="val => (overlayOpacity = val)"
            @toggle-drag="val => (dragEnabled = val)"
            @toggle-hints="val => (showEditHints = val)"
            @use-bundled="useBundledBg"
            @reset-bg="resetBackground"
            @save-preset="handleSavePreset"
            @load-preset="handleLoadPreset"
            @clear-presets="clearPresets"
            @reset-positions="resetAllPositions"
            @background-selected="onBackgroundSelected"
            @add-team="addTeam"
            @add-text="(t) => addCustomText(t)"
            @add-image="triggerAddImage"
          />
        </div>
      </div>

      <!-- RIGHT PANEL - Canvas Design Area -->
      <div class="right-panel">
        <!-- Top Actions Bar -->
        <div class="top-actions-bar">
          <div class="actions-left">
            <button @click="togglePanel" class="action-btn secondary" v-if="isPanelCollapsed">
              <Icon name="mdi:menu" class="text-[20px]" />
              <span>Mở bảng điều khiển</span>
            </button>
          </div>

          <div class="actions-right">
            <button 
              class="action-btn primary" 
              @click="handleDownload" 
              :disabled="loading || downloading"
            >
              <Icon v-if="downloading" name="mdi:loading" class="animate-spin text-[20px]" />
              <Icon v-else name="mdi:download" class="text-[20px]" />
              <span>{{ downloading ? "Đang chuẩn bị..." : "Tải ảnh thiết kế" }}</span>
            </button>
          </div>
        </div>

        <!-- Canvas Container -->
        <div class="canvas-container" ref="captureRoot">
          <!-- Background Layer -->
          <div class="bg-layer" :style="bgLayerStyle" aria-hidden="true"></div>

          <!-- Overlay -->
          <div class="overlay">
            <div class="canvas-content">
              <!-- Loading State -->
              <div v-if="loading" class="loading-state">
                <div class="spinner" aria-hidden="true"></div>
                <div class="loading-text">Đang tải dữ liệu...</div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="error-state">
                <Icon name="mdi:alert-circle" class="text-[48px] text-red-400 mb-4" />
                <p class="text-lg">Lỗi khi tải dữ liệu:</p>
                <p class="text-sm text-gray-300 mt-2">{{ error }}</p>
              </div>

              <!-- Canvas -->
              <TournamentCanvas
                v-else-if="tournament"
                :tournament="tournament"
                :teams="teams"
                :positions="positions"
                :editable-texts="editableTexts"
                :editing-state="editingState"
                :drag-enabled="dragEnabled"
                :show-edit-hints="showEditHints"
                :gap="gap"
                :active-logo-target="activeLogoTarget"
                :custom-texts="customTexts"
                :custom-images="customImages"
                @start-drag="startDrag"
                @enable-edit="enableEdit"
                @disable-edit="disableEdit"
                @editable-input="onEditableInput"
                @logo-dblclick="onLogoDblClick"
                @trigger-logo="triggerLogoFile"
                @remove-logo="removeElement"
                @trigger-image="triggerCustomImageReplace"
                @remove-element="removeElement"
              />

              <!-- No Data State -->
              <div v-else class="error-state">
                <Icon name="mdi:file-alert-outline" class="text-[48px] text-yellow-400 mb-4" />
                <p class="text-lg">Không tìm thấy dữ liệu</p>
                <p class="text-sm text-gray-300 mt-2">Tournament ID: {{ id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden File Input -->
    <LogoFileInput ref="logoInputRef" @file-selected="onLogoFileSelected" data-no-export />
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import EditorPanel from "~/component/background/EditorPanel.vue";
import TournamentCanvas from "~/component/background/TournamentCanvas.vue";
import LogoFileInput from "~/component/background/LogoFileInput.vue";
import bgImg from "~/assets/img/bg.png";

import { useBackgroundData } from "~/composables/background/useBackgroundData";
import { useBackgroundDrag } from "~/composables/background/useBackgroundDrag";
import { useBackgroundPresets } from "~/composables/background/useBackgroundPresets";
import { useBackgroundExport } from "~/composables/background/useBackgroundExport";

const route = useRoute();
const id = String(route.params.id || "");

// Panel collapse state
const isPanelCollapsed = ref(false);

// Data composable
const {
  loading,
  error,
  tournament,
  teams,
  positions,
  editableTexts,
  editingState,
  fallbackSvgDataUri,
  fetchTournament,
  addTeam,
  removeTeamByIndex,
  resetAllPositions,
} = useBackgroundData();

// Drag composable
const { dragEnabled, startDrag } = useBackgroundDrag(positions);

// Presets composable
const {
  presetsList,
  presetName,
  selectedPreset,
  refreshPresets,
  savePreset,
  loadPreset,
  clearPresets,
} = useBackgroundPresets();

// Export composable
const { downloading, downloadImage } = useBackgroundExport();

// Local state
const bgMode = ref<"image" | "gradient">("image");
const currentBgData = ref<string | null>(null);
const gradientStart = ref("#f17f4b");
const gradientEnd = ref("#9339f6");
const gradientAngle = ref<number>(90);
const overlayOpacity = ref<number>(0.28);
const bgEmbedded = ref<string | null>(null);
const captureRoot = ref<HTMLElement | null>(null);
const showEditHints = ref(true);
const activeLogoTarget = ref<string | null>(null);
const pendingLogoTarget = ref<string | null>(null);
const logoInputRef = ref<any>(null);

// Custom elements
const customTexts = ref<Array<{ id: string }>>([]);
const customImages = ref<Array<{ id: string; dataUrl: string }>>([]);

const gap = computed(() => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w >= 1600) return 40;
  if (w >= 1200) return 32;
  if (w >= 768) return 24;
  return 14;
});

const bgLayerStyle = computed(() => {
  if (bgMode.value === "image" && currentBgData.value) {
    return {
      backgroundImage: `url("${currentBgData.value}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    } as Record<string, string>;
  } else {
    const g = `linear-gradient(${gradientAngle.value}deg, ${gradientStart.value} 0%, ${gradientEnd.value} 100%)`;
    return {
      backgroundImage: g,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    } as Record<string, string>;
  }
});

// Methods
function togglePanel() {
  isPanelCollapsed.value = !isPanelCollapsed.value;
}

function enableEdit(key: string) {
  editingState[key] = true;
  nextTick(() => {
    const el = document.querySelector<HTMLElement>(`[data-key="${key}"]`);
    if (el) {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  });
}

function disableEdit(key: string) {
  editingState[key] = false;
}

function onEditableInput(key: string, ev: Event) {
  const el = ev.target as HTMLElement;
  const value = (el.innerText ?? "").trim();
  editableTexts[key] = value;
}

function onLogoDblClick(key: string) {
  activeLogoTarget.value = activeLogoTarget.value === key ? null : key;
}

function triggerLogoFile(key: string) {
  pendingLogoTarget.value = key;
  const comp = logoInputRef.value;
  if (comp && comp.open) comp.open();
}

function onLogoFileSelected(payload: { dataUrl: string }) {
  const key = pendingLogoTarget.value;
  pendingLogoTarget.value = null;
  if (!key) return;
  
  if (key === "organizer" || key === "center") {
    if (tournament.value) tournament.value.logoEmbedded = payload.dataUrl;
  } else if (key.startsWith("team-")) {
    const idx = Number(key.split("-")[1]);
    if (!Number.isNaN(idx) && teams.value[idx]) teams.value[idx].logoEmbedded = payload.dataUrl;
  } else if (key === "new-image") {
    const id = String(Date.now()) + "-" + Math.floor(Math.random() * 1000);
    customImages.value.push({ id, dataUrl: payload.dataUrl });
    positions[`img-${id}`] = { x: 0, y: 0 };
  } else if (key.startsWith("img-")) {
    const id = key.slice(4);
    const idx = customImages.value.findIndex((it) => it.id === id);
    if (idx >= 0) customImages.value[idx].dataUrl = payload.dataUrl;
  }
  
  activeLogoTarget.value = null;
}

function removeElement(key: string) {
  if (!key) return;

  if (key === "organizer" || key === "center") {
    if (tournament.value) tournament.value.logoEmbedded = null;
    activeLogoTarget.value = null;
    return;
  }

  if (key.startsWith("team-")) {
    const idx = Number(key.split("-")[1]);
    if (!Number.isNaN(idx)) {
      removeTeamByIndex(idx);
    }
    activeLogoTarget.value = null;
    return;
  }

  if (key.startsWith("custom-")) {
    const id = key.slice("custom-".length);
    const tIdx = customTexts.value.findIndex((it) => it.id === id);
    if (tIdx >= 0) customTexts.value.splice(tIdx, 1);
    delete editableTexts[`custom-${id}`];
    delete positions[`custom-${id}`];
    activeLogoTarget.value = null;
    return;
  }

  if (key.startsWith("img-")) {
    const id = key.slice("img-".length);
    const idx = customImages.value.findIndex((it) => it.id === id);
    if (idx >= 0) customImages.value.splice(idx, 1);
    delete positions[`img-${id}`];
    activeLogoTarget.value = null;
    return;
  }
}

function onBackgroundSelected(dataUrl: string) {
  if (!dataUrl) return;
  currentBgData.value = dataUrl;
  bgMode.value = "image";
}

function useBundledBg() {
  bgMode.value = "image";
  currentBgData.value = bgEmbedded.value;
}

function resetBackground() {
  currentBgData.value = null;
  bgMode.value = "gradient";
}

function addCustomText(text?: string) {
  const id = String(Date.now()) + "-" + Math.floor(Math.random() * 1000);
  customTexts.value.push({ id });
  const key = `custom-${id}`;
  editableTexts[key] = text || "New text";
  positions[key] = { x: 0, y: 0 };
}

function triggerAddImage() {
  pendingLogoTarget.value = "new-image";
  const comp = logoInputRef.value;
  if (comp && comp.open) comp.open();
}

function triggerCustomImageReplace(id: string) {
  pendingLogoTarget.value = `img-${id}`;
  const comp = logoInputRef.value;
  if (comp && comp.open) comp.open();
}

function handleSavePreset(name?: string) {
  const state = {
    mode: bgMode.value,
    image: currentBgData.value,
    gradientStart: gradientStart.value,
    gradientEnd: gradientEnd.value,
    gradientAngle: gradientAngle.value,
    overlayOpacity: overlayOpacity.value,
    positions: JSON.parse(JSON.stringify(positions)),
    texts: JSON.parse(JSON.stringify(editableTexts)),
    customTexts: JSON.parse(JSON.stringify(customTexts.value)),
    customImages: JSON.parse(JSON.stringify(customImages.value)),
  };
  savePreset(state, name);
}

function handleLoadPreset(name: string) {
  const v = loadPreset(name);
  if (!v) return;
  
  bgMode.value = v.mode || "image";
  currentBgData.value = v.image || null;
  gradientStart.value = v.gradientStart || gradientStart.value;
  gradientEnd.value = v.gradientEnd || gradientEnd.value;
  gradientAngle.value = v.gradientAngle ?? gradientAngle.value;
  overlayOpacity.value = v.overlayOpacity ?? overlayOpacity.value;
  
  if (v.positions) {
    Object.keys(v.positions).forEach((k) => {
      if (positions[k]) {
        positions[k].x = Number(v.positions[k].x) || 0;
        positions[k].y = Number(v.positions[k].y) || 0;
      } else {
        positions[k] = { x: Number(v.positions[k].x) || 0, y: Number(v.positions[k].y) || 0 };
      }
    });
  }
  
  if (v.texts) Object.keys(v.texts).forEach((k) => (editableTexts[k] = v.texts[k]));
  if (v.customTexts) customTexts.value = v.customTexts || [];
  if (v.customImages) customImages.value = v.customImages || [];
}

async function handleDownload() {
  await downloadImage(captureRoot.value, editableTexts, overlayOpacity.value);
}

onMounted(async () => {
  refreshPresets();
  if (!id) {
    loading.value = false;
    error.value = "Missing tournamentId trong route params";
    return;
  }
  const bg = await fetchTournament(id, bgImg);
  if (bg) {
    bgEmbedded.value = bg;
    if (!currentBgData.value) currentBgData.value = bg;
  }
});
</script>

<style scoped>
/* Base Layout */
.background-page {
  min-height: 100vh;
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  overflow: hidden;
}

.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

/* LEFT PANEL - Editor Controls */
.left-panel {
  width: 380px;
  background: linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 20;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.3);
}

.left-panel.panel-collapsed {
  width: 0;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.panel-content::-webkit-scrollbar {
  width: 8px;
}

.panel-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.panel-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* RIGHT PANEL - Canvas Area */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0f0f0f;
  overflow: hidden;
}

.top-actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.actions-left,
.actions-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.action-btn.primary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.action-btn.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* Canvas Container */
.canvas-container {
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.28);
}

.canvas-content {
  width: 100%;
  max-width: 1400px;
  padding: 40px 24px;
  box-sizing: border-box;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #fff;
  padding: 60px 20px;
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.1);
  border-top-color: #f97316;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 16px;
  font-weight: 500;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 60px 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .left-panel {
    width: 320px;
  }

  .panel-title {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .left-panel {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 320px;
    z-index: 100;
  }

  .left-panel.panel-collapsed {
    transform: translateX(-100%);
  }

  .action-btn span {
    display: none;
  }

  .action-btn {
    padding: 10px;
  }

  .canvas-content {
    padding: 20px 12px;
  }
}

/* Export Mode */
.export-mode .top-actions-bar,
.export-mode .panel-header {
  display: none !important;
}
</style>