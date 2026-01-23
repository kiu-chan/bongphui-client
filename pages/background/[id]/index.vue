<template>
  <main class="background-page" ref="captureRoot">
    <!-- single background layer (image or gradient) -->
    <div class="bg-layer" :style="bgLayerStyle" aria-hidden="true"></div>

    <div class="overlay">
      <div class="container">
        <!-- Editor panel (hidden during export) -->
        <EditorPanel
          data-no-export
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
          @save-preset="savePreset"
          @load-preset="loadPreset"
          @clear-presets="clearPresets"
          @reset-positions="resetAllPositions"
          @background-selected="onBackgroundSelected"
          @add-team="addTeam"
          @add-text="(t) => addCustomText(t)"
          @add-image="triggerAddImage"
        />

        <!-- Download button -->
        <div class="top-actions" data-no-export>
          <button class="download-btn" @click="downloadImage" :disabled="loading || downloading">
            {{ downloading ? "Đang chuẩn bị..." : "Tải ảnh thiết kế (PNG)" }}
          </button>
        </div>

        <!-- Loading / error -->
        <div v-if="loading" class="loading">
          <div class="spinner" aria-hidden="true"></div>
          <div>Đang tải dữ liệu...</div>
        </div>

        <div v-else-if="error" class="no-data">Lỗi khi tải dữ liệu: {{ error }}</div>

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
          @remove-logo="removeLogo"
          @trigger-image="triggerCustomImageReplace"
          @remove-element="removeElement"
        />

        <div v-else class="no-data">Không tìm thấy dữ liệu cho tournamentId {{ id }}</div>
      </div>
    </div>

    <!-- Hidden file input component used for logos and custom images -->
    <LogoFileInput ref="logoInputRef" @file-selected="onLogoFileSelected" data-no-export />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed, nextTick } from "vue";
import { useRoute } from "vue-router";

/* child components (expected under component/background) */
import EditorPanel from "~/component/background/EditorPanel.vue";
import TournamentCanvas from "~/component/background/TournamentCanvas.vue";
import LogoFileInput from "~/component/background/LogoFileInput.vue";

/* bundled background asset */
import bgImg from "~/assets/img/bg.png";

/* fallback inline SVG used when remote images fail */
const fallbackSvgDataUri =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#374151"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="2">No Image</text>
    </svg>`
  );

export default defineComponent({
  name: "BackgroundPageById",
  components: { EditorPanel, TournamentCanvas, LogoFileInput },
  setup() {
    const route = useRoute();
    const id = String(route.params.id || "");

    const loading = ref(true);
    const error = ref<string | null>(null);
    const tournament = ref<any | null>(null);
    const teams = ref<Array<{ name: string; logoEmbedded: string }>>([]);

    // custom elements
    const customTexts = ref<Array<{ id: string }>>([]);
    const customImages = ref<Array<{ id: string; dataUrl: string }>>([]);

    // background selection / state
    const bgMode = ref<"image" | "gradient">("image");
    const currentBgData = ref<string | null>(null); // data URL or null
    const gradientStart = ref("#f17f4b");
    const gradientEnd = ref("#9339f6");
    const gradientAngle = ref<number>(90);
    const overlayOpacity = ref<number>(0.28);
    const bgEmbedded = ref<string | null>(null);

    // presets
    const presetName = ref("");
    const selectedPreset = ref("");
    const presetsKey = "tournament_bg_presets";
    const presetsList = ref<any[]>([]);

    // capture / export
    const captureRoot = ref<HTMLElement | null>(null);
    const downloading = ref(false);

    // drag/edit state
    const dragEnabled = ref(false);
    const showEditHints = ref(true);

    // reactive positions for elements
    const positions = reactive<Record<string, { x: number; y: number }>>({
      organizer: { x: 0, y: 0 },
      center: { x: 0, y: 0 },
      teamsGroup: { x: 0, y: 0 },
    });

    // editable texts (title, subtitle, team names, organizer, custom texts)
    const editableTexts = reactive<Record<string, string>>({
      title: "Tên Giải đấu",
      subtitle: "",
      organizerText: "ĐƠN VỊ TỔ CHỨC",
    });

    const editingState = reactive<Record<string, boolean>>({});
    const activeLogoTarget = ref<string | null>(null);
    const pendingLogoTarget = ref<string | null>(null);
    const logoInputRef = ref<any>(null);

    const gap = computed(() => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w >= 1600) return 40;
      if (w >= 1200) return 32;
      if (w >= 768) return 24;
      return 14;
    });

    // helper: fetch remote images and convert to data URL (safe for html2canvas)
    async function fetchImageAsDataUrl(url?: string | null, timeoutMs = 9000): Promise<string> {
      if (!url) return fallbackSvgDataUri;
      const u = String(url).trim();
      if (u.startsWith("data:")) return u;
      try {
        const controller = new AbortController();
        const idTimeout = setTimeout(() => controller.abort(), timeoutMs);
        const res = await fetch(u, { mode: "cors", signal: controller.signal });
        clearTimeout(idTimeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => {
            reader.abort();
            reject(new Error("FileReader error"));
          };
          reader.onload = () => {
            const r = reader.result as string | null;
            if (!r) reject(new Error("Empty result from FileReader"));
            else resolve(r);
          };
          reader.readAsDataURL(blob);
        });
      } catch (err) {
        console.warn("fetchImageAsDataUrl failed for", url, err);
        return fallbackSvgDataUri;
      }
    }

    // embed tournament & team logos as data URLs
    async function embedAllImages(t: any) {
      t.logoEmbedded = await fetchImageAsDataUrl(t.logoUrl);
      const list: Array<{ name: string; logoEmbedded: string }> = [];
      if (Array.isArray(t.teams)) {
        const ps = t.teams.map(async (tm: any) => {
          const name = tm.name ?? "Đội bóng";
          const logoEmbedded = await fetchImageAsDataUrl(tm.logoUrl);
          return { name, logoEmbedded };
        });
        const resolved = await Promise.all(ps);
        for (const r of resolved) list.push(r);
      }

      bgEmbedded.value = await fetchImageAsDataUrl(bgImg);
      if (!currentBgData.value) currentBgData.value = bgEmbedded.value;

      editableTexts.title = t.tournamentName || editableTexts.title;
      editableTexts.subtitle = (t.location ? t.location : "") + (t.startDate ? " " + t.startDate : "");
      editableTexts.organizerText = editableTexts.organizerText || "ĐƠN VỊ TỔ CHỨC";

      list.forEach((tm, i) => {
        editableTexts[`team-${i}`] = tm.name || `Đội ${i + 1}`;
        if (!positions[`team-${i}`]) positions[`team-${i}`] = { x: 0, y: 0 };
      });

      teams.value = list;
      return { tournamentWithLogo: t, teamList: list };
    }

    // fetch tournament data
    async function fetchTournament(tournamentId: string) {
      loading.value = true;
      error.value = null;
      tournament.value = null;
      teams.value = [];
      try {
        const apiUrl = `http://localhost:8080/api/export/tournaments?tournamentId=${encodeURIComponent(tournamentId)}`;
        const resp = await fetch(apiUrl);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        let t: any = null;
        if (Array.isArray(data)) t = data.find((x: any) => String(x.id) === String(tournamentId)) || data[0] || null;
        else if (data && typeof data === "object") t = data;
        if (!t) throw new Error("Không tìm thấy dữ liệu từ API");
        await embedAllImages(t);
        tournament.value = t;
      } catch (err: any) {
        console.error("fetchTournament error:", err);
        error.value = err?.message ? String(err.message) : String(err);
      } finally {
        loading.value = false;
      }
    }

    // presets helpers
    function refreshPresets() {
      try {
        const raw = localStorage.getItem(presetsKey);
        presetsList.value = raw ? JSON.parse(raw) : [];
      } catch {
        presetsList.value = [];
      }
    }
    function savePreset(name = presetName.value) {
      if (!name) return;
      const p = {
        name,
        value: {
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
        },
      };
      const list = JSON.parse(localStorage.getItem(presetsKey) || "[]");
      const idx = list.findIndex((x: any) => x.name === p.name);
      if (idx >= 0) list[idx] = p;
      else list.push(p);
      localStorage.setItem(presetsKey, JSON.stringify(list));
      refreshPresets();
      presetName.value = "";
    }
    function loadPreset(name: string) {
      if (!name) return;
      const list = JSON.parse(localStorage.getItem(presetsKey) || "[]");
      const p = list.find((x: any) => x.name === name);
      if (!p) return;
      const v = p.value;
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
      if (v.customTexts) {
        customTexts.value = v.customTexts || [];
      }
      if (v.customImages) {
        customImages.value = v.customImages || [];
      }
    }
    function clearPresets() {
      if (!confirm("Xóa tất cả preset background?")) return;
      localStorage.removeItem(presetsKey);
      refreshPresets();
      selectedPreset.value = "";
    }

    // Drag implementation (parent handles pointer capture & movement)
    const dragging = ref<
      | null
      | {
          key: string;
          startX: number;
          startY: number;
          origX: number;
          origY: number;
          el: HTMLElement | null;
          pointerId: number;
        }
    >(null);

    function startDrag(payload: any) {
      if (!dragEnabled.value) return;
      const e: PointerEvent = payload?.originalEvent;
      const key: string = payload?.key;
      if (!e || !key) return;

      const el = (e.currentTarget as HTMLElement) || null;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!positions[key]) positions[key] = { x: 0, y: 0 };

      dragging.value = {
        key,
        startX: clientX,
        startY: clientY,
        origX: positions[key].x,
        origY: positions[key].y,
        el,
        pointerId: e.pointerId,
      };

      try {
        if (el && el.setPointerCapture) el.setPointerCapture(e.pointerId);
      } catch (_) {
        /* ignore */
      }

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", endDrag);
      document.body.style.userSelect = "none";
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging.value) return;
      if (e.pointerId != null && dragging.value.pointerId != null && e.pointerId !== dragging.value.pointerId) return;
      e.preventDefault();
      const dx = e.clientX - dragging.value.startX;
      const dy = e.clientY - dragging.value.startY;
      const key = dragging.value.key;
      positions[key].x = Math.round(dragging.value.origX + dx);
      positions[key].y = Math.round(dragging.value.origY + dy);
    }

    function endDrag() {
      if (!dragging.value) return;
      const el = dragging.value.el;
      const pid = dragging.value.pointerId;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      try {
        if (el && pid != null && el.releasePointerCapture) el.releasePointerCapture(pid);
      } catch (_) {
        /* ignore */
      }
      dragging.value = null;
      document.body.style.userSelect = "";
    }

    // editable text handlers
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

    // logo file flow using LogoFileInput child
    function onLogoDblClick(key: string) {
      activeLogoTarget.value = activeLogoTarget.value === key ? null : key;
    }
    function triggerLogoFile(key: string) {
      pendingLogoTarget.value = key;
      const comp = logoInputRef.value;
      if (comp && comp.open) comp.open();
    }

    // Add / remove teams (existing behavior)
    function addTeam() {
      const idx = teams.value.length;
      const name = `Đội ${idx + 1}`;
      teams.value.push({ name, logoEmbedded: fallbackSvgDataUri });
      editableTexts[`team-${idx}`] = name;
      positions[`team-${idx}`] = { x: 0, y: 0 };
    }

    function removeTeamByIndex(idx: number) {
      if (idx < 0 || idx >= teams.value.length) return;
      const oldTeams = teams.value.slice();
      oldTeams.splice(idx, 1);
      teams.value = oldTeams;

      // rebuild positions for team-* (preserve other keys)
      Object.keys(positions).forEach((k) => {
        if (k.startsWith("team-")) delete positions[k];
      });
      for (let i = 0; i < teams.value.length; i++) {
        positions[`team-${i}`] = { x: 0, y: 0 };
      }

      // rebuild editableTexts team entries
      Object.keys(editableTexts).forEach((k) => {
        if (k.startsWith("team-")) delete editableTexts[k];
      });
      teams.value.forEach((tm, i) => {
        editableTexts[`team-${i}`] = tm.name || `Đội ${i + 1}`;
      });
    }

    // Updated: when clicking "Xóa" on a team, remove the whole team (handled below in removeElement)

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
        // add new custom image
        const id = String(Date.now()) + "-" + Math.floor(Math.random() * 1000);
        customImages.value.push({ id, dataUrl: payload.dataUrl });
        positions[`img-${id}`] = { x: 0, y: 0 };
      } else if (key.startsWith("img-")) {
        // replace existing custom image
        const id = key.slice(4);
        const idx = customImages.value.findIndex((it) => it.id === id);
        if (idx >= 0) customImages.value[idx].dataUrl = payload.dataUrl;
      }
      activeLogoTarget.value = null;
    }

    // Trigger opening logoInput for adding a new custom image
    function triggerAddImage() {
      pendingLogoTarget.value = "new-image";
      const comp = logoInputRef.value;
      if (comp && comp.open) comp.open();
    }

    // Allow replacing a specific custom image
    function triggerCustomImageReplace(id: string) {
      pendingLogoTarget.value = `img-${id}`;
      const comp = logoInputRef.value;
      if (comp && comp.open) comp.open();
    }

    // Remove element (team, custom text, custom image) when user clicks "Xóa" inside element controls
    function removeElement(key: string) {
      if (!key) return;

      // organizer / center logo removal
      if (key === "organizer" || key === "center") {
        if (tournament.value) tournament.value.logoEmbedded = null;
        activeLogoTarget.value = null;
        return;
      }

      // team removal (keep previous reindex logic)
      if (key.startsWith("team-")) {
        const idx = Number(key.split("-")[1]);
        if (!Number.isNaN(idx)) {
          removeTeamByIndex(idx);
        }
        activeLogoTarget.value = null;
        return;
      }

      // custom text removal (key = custom-<id>)
      if (key.startsWith("custom-")) {
        const id = key.slice("custom-".length);
        const tIdx = customTexts.value.findIndex((it) => it.id === id);
        if (tIdx >= 0) customTexts.value.splice(tIdx, 1);
        // delete editableTexts and positions
        delete editableTexts[`custom-${id}`];
        delete positions[`custom-${id}`];
        activeLogoTarget.value = null;
        return;
      }

      // custom image removal (key = img-<id>)
      if (key.startsWith("img-")) {
        const id = key.slice("img-".length);
        const idx = customImages.value.findIndex((it) => it.id === id);
        if (idx >= 0) customImages.value.splice(idx, 1);
        delete positions[`img-${id}`];
        activeLogoTarget.value = null;
        return;
      }
    }

    // background selection from EditorPanel (file upload)
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

    // New: add custom text
    function addCustomText(text?: string) {
      const id = String(Date.now()) + "-" + Math.floor(Math.random() * 1000);
      customTexts.value.push({ id });
      const key = `custom-${id}`;
      editableTexts[key] = text || "New text";
      positions[key] = { x: 0, y: 0 };
    }

    // Export helpers: apply inline styles to ensure team names are fully visible
    function applyExportSafeStyles(): Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }> {
      const changed: Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }> = [];
      const teamNames = document.querySelectorAll<HTMLElement>(".team-name");
      teamNames.forEach((el) => {
        const prev: Partial<CSSStyleDeclaration> = {
          display: el.style.display,
          WebkitLineClamp: (el.style as any).WebkitLineClamp,
          WebkitBoxOrient: (el.style as any).WebkitBoxOrient,
          overflow: el.style.overflow,
          textOverflow: el.style.textOverflow,
          whiteSpace: el.style.whiteSpace,
          maxHeight: el.style.maxHeight,
        };
        el.style.display = "block";
        (el.style as any).WebkitLineClamp = "unset";
        (el.style as any).WebkitBoxOrient = "initial";
        el.style.overflow = "visible";
        el.style.textOverflow = "initial";
        el.style.whiteSpace = "normal";
        el.style.maxHeight = "none";
        changed.push({ el, prev });
      });

      const teamEls = document.querySelectorAll<HTMLElement>(".team");
      teamEls.forEach((pel) => {
        const prev: Partial<CSSStyleDeclaration> = {
          overflow: pel.style.overflow,
          maxHeight: pel.style.maxHeight,
        };
        pel.style.overflow = "visible";
        pel.style.maxHeight = "none";
        changed.push({ el: pel, prev });
      });

      const rows = document.querySelectorAll<HTMLElement>(".teams-row, .container");
      rows.forEach((r) => {
        const prev: Partial<CSSStyleDeclaration> = { overflow: r.style.overflow };
        if (r.style.overflow === "hidden") r.style.overflow = "visible";
        changed.push({ el: r, prev });
      });

      return changed;
    }

    function restoreExportSafeStyles(changes: Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }>) {
      changes.forEach(({ el, prev }) => {
        try {
          if (prev.display !== undefined) el.style.display = prev.display as string;
          if (prev.WebkitLineClamp !== undefined) (el.style as any).WebkitLineClamp = prev.WebkitLineClamp;
          if (prev.WebkitBoxOrient !== undefined) (el.style as any).WebkitBoxOrient = prev.WebkitBoxOrient;
          if (prev.overflow !== undefined) el.style.overflow = prev.overflow as string;
          if (prev.textOverflow !== undefined) el.style.textOverflow = prev.textOverflow as string;
          if (prev.whiteSpace !== undefined) el.style.whiteSpace = prev.whiteSpace as string;
          if (prev.maxHeight !== undefined) el.style.maxHeight = prev.maxHeight as string;
        } catch (_) {
          // ignore restore errors
        }
      });
    }

    // download image (export)
    async function downloadImage() {
      downloading.value = true;
      try {
        const root = captureRoot.value;
        if (!root) throw new Error("Không tìm thấy phần tử để chụp.");

        // apply export mode + hide controls
        root.classList.add("export-mode");
        const nodes = document.querySelectorAll<HTMLElement>("[data-no-export]");
        nodes.forEach((n) => {
          n.dataset.prevDisplay = n.style.display || "";
          n.style.display = "none";
        });

        // inline style fixes
        const inlineChanges = applyExportSafeStyles();

        await nextTick();
        await new Promise((r) => setTimeout(r, 260));

        // ensure html2canvas
        let html2canvas: any = null;
        try {
          const mod = await import("html2canvas");
          html2canvas = (mod && (mod as any).default) || mod;
        } catch {
          const cdn = await import(
            /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
          );
          html2canvas = (cdn && (cdn as any).default) || (window as any).html2canvas;
        }
        if (!html2canvas) throw new Error("html2canvas không sẵn có");

        // temporary overlay
        const overlayEl = document.querySelector(".overlay") as HTMLElement | null;
        const prevOverlayBg = overlayEl?.style.background;
        if (overlayEl) overlayEl.style.background = `rgba(0,0,0,${overlayOpacity.value})`;

        const canvas: HTMLCanvasElement = await html2canvas(root as HTMLElement, {
          useCORS: false,
          allowTaint: false,
          backgroundColor: null,
          scale: Math.min(3, Math.max(1, window.devicePixelRatio || 1)),
        });

        if (overlayEl) overlayEl.style.background = prevOverlayBg ?? "";

        await new Promise<void>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Không thể tạo ảnh"));
              return;
            }
            const safeName = (editableTexts.title || "tournament").replace(/\s+/g, "_");
            const filename = `${safeName}.png`;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1500);
            resolve();
          }, "image/png");
        });

        // restore inline styles and UI
        restoreExportSafeStyles(inlineChanges);
        nodes.forEach((n) => {
          n.style.display = n.dataset.prevDisplay ?? "";
          delete n.dataset.prevDisplay;
        });
        root.classList.remove("export-mode");
      } catch (err: any) {
        console.error(err);
        alert("Lỗi khi xuất ảnh: " + (err?.message || err));
      } finally {
        downloading.value = false;
      }
    }

    onMounted(() => {
      refreshPresets();
      if (!id) {
        loading.value = false;
        error.value = "Missing tournamentId trong route params";
        return;
      }
      fetchTournament(id);
    });

    // computed style for bg layer
    const bgLayerStyle = computed(() => {
      if (bgMode.value === "image" && currentBgData.value) {
        return {
          backgroundImage: `url("${currentBgData.value}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          inset: "0",
          zIndex: 0,
        } as Record<string, string>;
      } else {
        const g = `linear-gradient(${gradientAngle.value}deg, ${gradientStart.value} 0%, ${gradientEnd.value} 100%)`;
        return {
          backgroundImage: g,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          inset: "0",
          zIndex: 0,
        } as Record<string, string>;
      }
    });

    return {
      id,
      loading,
      error,
      tournament,
      teams,
      bgMode,
      currentBgData,
      gradientStart,
      gradientEnd,
      gradientAngle,
      overlayOpacity,
      presetName,
      selectedPreset,
      presetsList,
      bgEmbedded,
      captureRoot,
      downloading,
      downloadImage,
      dragEnabled,
      showEditHints,
      positions,
      editableTexts,
      editingState,
      activeLogoTarget,
      gap,
      startDrag,
      enableEdit,
      disableEdit,
      onEditableInput,
      onLogoDblClick,
      triggerLogoFile,
      removeLogo: removeElement,
      onLogoFileSelected,
      onBackgroundSelected,
      useBundledBg,
      resetBackground,
      savePreset,
      loadPreset,
      clearPresets,
      resetAllPositions: () => {
        Object.keys(positions).forEach((k) => {
          positions[k].x = 0;
          positions[k].y = 0;
        });
      },
      logoInputRef,
      bgLayerStyle,
      addTeam,
      customTexts,
      customImages,
      addCustomText,
      triggerAddImage,
      triggerCustomImageReplace,
      removeElement,
    };
  },
});
</script>

<style scoped>
/* Layout & core styles */
.background-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0;
  color: #fff;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  overflow: visible;
}
.bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* ensure aspect preserved via background-size: cover in inline style */
}

/* overlay */
.overlay {
  background: rgba(0, 0, 0, 0.28);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

/* container */
.container {
  width: 100%;
  max-width: 1200px;
  padding: 36px 24px;
  box-sizing: border-box;
  position: relative;
}

/* Editor & actions */
.top-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 40;
}
.download-btn {
  background: #ffd74d;
  color: #111;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #fff;
}
.spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.16);
  border-top-color: rgba(255, 255, 255, 0.95);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ensure full team names when export-mode class present (safety) */
.export-mode .team-name {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
}

/* No-data */
.no-data {
  color: #fff;
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
}
</style>