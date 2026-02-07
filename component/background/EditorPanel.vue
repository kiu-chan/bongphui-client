<template>
  <div class="editor-panel">
    <!-- Background Section -->
    <div class="panel-section">
      <div class="section-header" @click="toggleSection('background')">
        <div class="section-title">
          <Icon name="mdi:image" class="section-icon" />
          <span>Nền thiết kế</span>
        </div>
        <Icon 
          :name="expandedSections.background ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="chevron-icon" 
        />
      </div>
      
      <Transition name="slide-fade">
        <div v-show="expandedSections.background" class="section-content">
          <!-- Mode Selection -->
          <div class="control-group">
            <label class="control-label">Loại nền</label>
            <div class="mode-selector">
              <button 
                :class="['mode-btn', { active: bgMode === 'image' }]"
                @click="$emit('update:bgMode', 'image')"
              >
                <Icon name="mdi:image-outline" class="text-[20px]" />
                <span>Hình ảnh</span>
              </button>
              <button 
                :class="['mode-btn', { active: bgMode === 'gradient' }]"
                @click="$emit('update:bgMode', 'gradient')"
              >
                <Icon name="mdi:gradient-horizontal" class="text-[20px]" />
                <span>Gradient</span>
              </button>
            </div>
          </div>

          <!-- Image Background Options -->
          <div v-if="bgMode === 'image'" class="control-group">
            <div class="btn-group">
              <button class="control-btn secondary" @click="$emit('use-bundled')">
                <Icon name="mdi:image-auto-adjust" class="text-[18px]" />
                <span>Nền mặc định</span>
              </button>
              <button class="control-btn secondary" @click="triggerBgUpload">
                <Icon name="mdi:upload" class="text-[18px]" />
                <span>Tải ảnh lên</span>
              </button>
            </div>
            <input
              ref="bgFileInput"
              type="file"
              accept="image/*"
              @change="onBgFileChange"
              style="display: none"
            />
          </div>

          <!-- Gradient Options -->
          <div v-if="bgMode === 'gradient'" class="gradient-controls">
            <div class="control-group">
              <label class="control-label">Màu bắt đầu</label>
              <div class="color-picker-wrapper">
                <input 
                  type="color" 
                  :value="gradientStart" 
                  @input="$emit('update:gradientStart', $event.target.value)"
                  class="color-input"
                />
                <span class="color-value">{{ gradientStart }}</span>
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">Màu kết thúc</label>
              <div class="color-picker-wrapper">
                <input 
                  type="color" 
                  :value="gradientEnd" 
                  @input="$emit('update:gradientEnd', $event.target.value)"
                  class="color-input"
                />
                <span class="color-value">{{ gradientEnd }}</span>
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">Góc xoay: {{ gradientAngle }}°</label>
              <input 
                type="range" 
                min="0" 
                max="360" 
                :value="gradientAngle"
                @input="$emit('update:gradientAngle', Number($event.target.value))"
                class="range-input"
              />
            </div>
          </div>

          <!-- Overlay Opacity -->
          <div class="control-group">
            <label class="control-label">Độ mờ lớp phủ: {{ Math.round(overlayOpacity * 100) }}%</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              :value="overlayOpacity"
              @input="$emit('update:overlayOpacity', Number($event.target.value))"
              class="range-input"
            />
          </div>

          <!-- Reset Background -->
          <div class="control-group">
            <button class="control-btn danger" @click="$emit('reset-bg')">
              <Icon name="mdi:restore" class="text-[18px]" />
              <span>Đặt lại nền</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Elements Section -->
    <div class="panel-section">
      <div class="section-header" @click="toggleSection('elements')">
        <div class="section-title">
          <Icon name="mdi:shape" class="section-icon" />
          <span>Thêm phần tử</span>
        </div>
        <Icon 
          :name="expandedSections.elements ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="chevron-icon" 
        />
      </div>
      
      <Transition name="slide-fade">
        <div v-show="expandedSections.elements" class="section-content">
          <div class="btn-grid">
            <button class="element-btn" @click="$emit('add-team')">
              <Icon name="mdi:account-group" class="text-[24px]" />
              <span>Thêm đội</span>
            </button>
            <button class="element-btn" @click="showTextInput = true">
              <Icon name="mdi:text" class="text-[24px]" />
              <span>Thêm chữ</span>
            </button>
            <button class="element-btn" @click="$emit('add-image')">
              <Icon name="mdi:image-plus" class="text-[24px]" />
              <span>Thêm ảnh</span>
            </button>
          </div>

          <!-- Text Input Modal -->
          <Transition name="fade">
            <div v-if="showTextInput" class="text-input-modal">
              <div class="modal-content">
                <label class="control-label">Nhập nội dung chữ:</label>
                <input 
                  v-model="newText" 
                  type="text" 
                  class="text-input"
                  placeholder="Nhập văn bản..."
                  @keyup.enter="addText"
                />
                <div class="btn-group">
                  <button class="control-btn secondary" @click="showTextInput = false">
                    Hủy
                  </button>
                  <button class="control-btn primary" @click="addText">
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>

    <!-- Edit Tools Section -->
    <div class="panel-section">
      <div class="section-header" @click="toggleSection('tools')">
        <div class="section-title">
          <Icon name="mdi:tools" class="section-icon" />
          <span>Công cụ chỉnh sửa</span>
        </div>
        <Icon 
          :name="expandedSections.tools ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="chevron-icon" 
        />
      </div>
      
      <Transition name="slide-fade">
        <div v-show="expandedSections.tools" class="section-content">
          <div class="toggle-group">
            <label class="toggle-label">
              <input 
                type="checkbox" 
                :checked="dragEnabled" 
                @change="$emit('toggle-drag', $event.target.checked)"
                class="toggle-checkbox"
              />
              <span class="toggle-slider"></span>
              <span class="toggle-text">
                <Icon name="mdi:cursor-move" class="text-[18px]" />
                Cho phép di chuyển
              </span>
            </label>
          </div>

          <div class="toggle-group">
            <label class="toggle-label">
              <input 
                type="checkbox" 
                :checked="showEditHints" 
                @change="$emit('toggle-hints', $event.target.checked)"
                class="toggle-checkbox"
              />
              <span class="toggle-slider"></span>
              <span class="toggle-text">
                <Icon name="mdi:information" class="text-[18px]" />
                Hiện gợi ý chỉnh sửa
              </span>
            </label>
          </div>

          <div class="control-group">
            <button class="control-btn warning" @click="$emit('reset-positions')">
              <Icon name="mdi:restore-alert" class="text-[18px]" />
              <span>Đặt lại vị trí</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Presets Section -->
    <div class="panel-section">
      <div class="section-header" @click="toggleSection('presets')">
        <div class="section-title">
          <Icon name="mdi:bookmark" class="section-icon" />
          <span>Mẫu thiết kế</span>
        </div>
        <Icon 
          :name="expandedSections.presets ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="chevron-icon" 
        />
      </div>
      
      <Transition name="slide-fade">
        <div v-show="expandedSections.presets" class="section-content">
          <!-- Save Preset -->
          <div class="control-group">
            <label class="control-label">Lưu mẫu thiết kế</label>
            <div class="input-with-btn">
              <input 
                v-model="presetName" 
                type="text" 
                class="text-input"
                placeholder="Tên mẫu..."
              />
              <button 
                class="control-btn primary" 
                @click="savePreset"
                :disabled="!presetName.trim()"
              >
                <Icon name="mdi:content-save" class="text-[18px]" />
              </button>
            </div>
          </div>

          <!-- Load Preset -->
          <div v-if="presetsList && presetsList.length > 0" class="control-group">
            <label class="control-label">Tải mẫu có sẵn</label>
            <select 
              v-model="selectedPreset" 
              @change="loadPreset"
              class="select-input"
            >
              <option value="">-- Chọn mẫu --</option>
              <option 
                v-for="preset in presetsList" 
                :key="preset.name" 
                :value="preset.name"
              >
                {{ preset.name }}
              </option>
            </select>
          </div>

          <!-- Clear All Presets -->
          <div v-if="presetsList && presetsList.length > 0" class="control-group">
            <button class="control-btn danger" @click="$emit('clear-presets')">
              <Icon name="mdi:delete-forever" class="text-[18px]" />
              <span>Xóa tất cả mẫu</span>
            </button>
          </div>

          <!-- No Presets Message -->
          <div v-else class="empty-state">
            <Icon name="mdi:bookmark-outline" class="text-[32px] text-gray-500 mb-2" />
            <p class="text-sm text-gray-400">Chưa có mẫu thiết kế nào</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

interface Props {
  bgMode: 'image' | 'gradient';
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  overlayOpacity: number;
  dragEnabled: boolean;
  showEditHints: boolean;
  presetName: string;
  selectedPreset: string;
  presetsList: any[];
}

const props = defineProps<Props>();

const emit = defineEmits([
  'update:bgMode',
  'update:gradientStart',
  'update:gradientEnd',
  'update:gradientAngle',
  'update:overlayOpacity',
  'toggle-drag',
  'toggle-hints',
  'use-bundled',
  'reset-bg',
  'save-preset',
  'load-preset',
  'clear-presets',
  'reset-positions',
  'background-selected',
  'add-team',
  'add-text',
  'add-image',
  'update:presetName',
  'update:selectedPreset',
]);

const bgFileInput = ref<HTMLInputElement | null>(null);
const showTextInput = ref(false);
const newText = ref('');
const presetName = ref('');
const selectedPreset = ref('');

const expandedSections = reactive({
  background: true,
  elements: true,
  tools: false,
  presets: false,
});

function toggleSection(section: keyof typeof expandedSections) {
  expandedSections[section] = !expandedSections[section];
}

function triggerBgUpload() {
  bgFileInput.value?.click();
}

function onBgFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target?.result as string;
    if (dataUrl) {
      emit('background-selected', dataUrl);
    }
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function addText() {
  if (newText.value.trim()) {
    emit('add-text', newText.value);
    newText.value = '';
    showTextInput.value = false;
  }
}

function savePreset() {
  if (presetName.value.trim()) {
    emit('save-preset', presetName.value);
    presetName.value = '';
  }
}

function loadPreset() {
  if (selectedPreset.value) {
    emit('load-preset', selectedPreset.value);
  }
}
</script>

<style scoped>
.editor-panel {
  padding: 0;
}

/* Panel Section */
.panel-section {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.section-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.section-icon {
  font-size: 22px;
  color: #f97316;
}

.chevron-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
}

.section-content {
  padding: 8px 24px 24px;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Control Group */
.control-group {
  margin-bottom: 20px;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
}

/* Mode Selector */
.mode-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.mode-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.mode-btn.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-color: #f97316;
  color: #fff;
}

/* Buttons */
.btn-group {
  display: flex;
  gap: 10px;
}

.control-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.control-btn.primary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: #fff;
}

.control-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
}

.control-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.control-btn.warning {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.control-btn.warning:hover {
  background: rgba(251, 191, 36, 0.3);
}

.control-btn.danger {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.control-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Color Picker */
.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.color-input {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
}

.color-value {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
}

/* Range Input */
.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.5);
}

.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.5);
}

/* Element Buttons */
.btn-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.element-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.element-btn:hover {
  background: rgba(249, 115, 22, 0.2);
  border-color: #f97316;
  color: #fff;
  transform: translateY(-2px);
}

/* Text Input Modal */
.text-input-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Text Input */
.text-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.text-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #f97316;
}

.text-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Input with Button */
.input-with-btn {
  display: flex;
  gap: 10px;
}

.input-with-btn .text-input {
  flex: 1;
}

.input-with-btn .control-btn {
  flex: none;
  padding: 12px;
}

/* Select Input */
.select-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.select-input option {
  background: #1f1f1f;
  color: #fff;
}

/* Toggle */
.toggle-group {
  margin-bottom: 16px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.toggle-checkbox {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-checkbox:checked + .toggle-slider {
  background: #f97316;
}

.toggle-checkbox:checked + .toggle-slider::before {
  transform: translateX(20px);
}

.toggle-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}
</style>