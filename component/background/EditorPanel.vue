<template>
  <aside class="editor-panel">
    <details open>
      <summary>Chỉnh background & layout</summary>

      <div class="editor-row">
        <label><input type="radio" value="image" v-model="localBgMode" /> Ảnh</label>
        <label><input type="radio" value="gradient" v-model="localBgMode" /> Gradient</label>
      </div>

      <div v-if="localBgMode === 'image'" class="editor-row">
        <!-- File input for background upload -->
        <input ref="bgFileInput" type="file" accept="image/*" @change="onBgFile" />
        <button @click="$emit('use-bundled')">Dùng background mặc định</button>
        <button @click="$emit('reset-bg')">Xóa</button>
      </div>

      <div v-if="localBgMode === 'gradient'" class="editor-row">
        <label>Màu 1 <input type="color" v-model="localGradientStart" @input="emitGradient" /></label>
        <label>Màu 2 <input type="color" v-model="localGradientEnd" @input="emitGradient" /></label>
        <label>Góc <input type="range" min="0" max="360" v-model.number="localGradientAngle" @input="emitGradient" /> {{ localGradientAngle }}°</label>
      </div>

      <div class="editor-row">
        <label>Overlay opacity
          <input type="range" min="0" max="1" step="0.01" v-model.number="localOverlay" @input="$emit('update:overlayOpacity', localOverlay)" />
          {{ Math.round(localOverlay * 100) }}%
        </label>
      </div>

      <div class="editor-row">
        <label><input type="checkbox" :checked="dragEnabled" @change="$emit('toggle-drag', $event.target.checked)" /> Bật di chuyển</label>
        <label><input type="checkbox" :checked="showEditHints" @change="$emit('toggle-hints', $event.target.checked)" /> Hiển thị gợi ý</label>
        <button @click="$emit('reset-positions')">Reset vị trí</button>
      </div>

      <div class="editor-row">
        <input v-model="localPresetName" placeholder="Tên preset" />
        <button @click="onSavePreset" :disabled="!localPresetName">Lưu preset</button>

        <select v-model="localSelectedPreset">
          <option value="">-- Chọn preset --</option>
          <option v-for="p in presetsList" :key="p.name" :value="p.name">{{ p.name }}</option>
        </select>
        <button @click="onLoadPreset" :disabled="!localSelectedPreset">Tải</button>
        <button @click="$emit('clear-presets')" v-if="presetsList?.length">Xóa tất cả</button>
      </div>

      <!-- Team management -->
      <div class="editor-row">
        <button @click="$emit('add-team')">Thêm đội</button>
      </div>

      <!-- New: add custom text -->
      <div class="editor-row">
        <input v-model="newText" placeholder="Nội dung text mới" />
        <button @click="onAddText" :disabled="!newText">Thêm text</button>
      </div>

      <!-- New: add custom image -->
      <div class="editor-row">
        <button @click="$emit('add-image')">Thêm ảnh</button>
      </div>
    </details>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "EditorPanel",
  props: {
    bgMode: { type: String, default: 'image' },
    gradientStart: { type: String, default: '#f17f4b' },
    gradientEnd: { type: String, default: '#9339f6' },
    gradientAngle: { type: Number, default: 90 },
    overlayOpacity: { type: Number, default: 0.28 },
    dragEnabled: { type: Boolean, default: false },
    showEditHints: { type: Boolean, default: true },
    presetName: { type: String, default: '' },
    selectedPreset: { type: String, default: '' },
    presetsList: { type: Array, default: () => [] }
  },
  emits: ['update:bgMode','update:gradientStart','update:gradientEnd','update:gradientAngle','update:overlayOpacity','toggle-drag','toggle-hints','use-bundled','reset-bg','save-preset','load-preset','clear-presets','reset-positions','background-selected','add-team','add-text','add-image'],
  setup(props, { emit }) {
    const localBgMode = ref(props.bgMode);
    const localGradientStart = ref(props.gradientStart);
    const localGradientEnd = ref(props.gradientEnd);
    const localGradientAngle = ref(props.gradientAngle);
    const localOverlay = ref(props.overlayOpacity);
    const localPresetName = ref('');
    const localSelectedPreset = ref(props.selectedPreset);
    const bgFileInput = ref<HTMLInputElement | null>(null);

    const newText = ref('');

    watch(() => props.bgMode, v => localBgMode.value = v);
    watch(() => props.gradientStart, v => localGradientStart.value = v);
    watch(() => props.gradientEnd, v => localGradientEnd.value = v);
    watch(() => props.gradientAngle, v => localGradientAngle.value = v);
    watch(() => props.overlayOpacity, v => localOverlay.value = v);
    watch(() => props.selectedPreset, v => localSelectedPreset.value = v);

    watch(localBgMode, v => emit('update:bgMode', v));
    const emitGradient = () => {
      emit('update:gradientStart', localGradientStart.value);
      emit('update:gradientEnd', localGradientEnd.value);
      emit('update:gradientAngle', localGradientAngle.value);
    };

    function onFile(e: Event) {
      const input = e.target as HTMLInputElement;
      const f = input?.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        // emit the background dataURL
        emit('background-selected', String(reader.result));
      };
      reader.readAsDataURL(f);
    }

    async function onBgFile(e: Event) {
      // reuse onFile logic, but also set mode to image via parent binding
      const input = bgFileInput.value || (e.target as HTMLInputElement);
      const f = input?.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        emit('background-selected', String(reader.result));
        emit('update:bgMode', 'image');
      };
      reader.readAsDataURL(f);
    }

    function onSavePreset() { emit('save-preset', localPresetName.value); localPresetName.value = ''; }
    function onLoadPreset() { emit('load-preset', localSelectedPreset.value); }

    function onAddText() {
      if (!newText.value) return;
      emit('add-text', newText.value);
      newText.value = '';
    }

    return {
      localBgMode, localGradientStart, localGradientEnd, localGradientAngle, localOverlay, localPresetName, localSelectedPreset, emitGradient, onFile, onBgFile, bgFileInput, onSavePreset, onLoadPreset,
      newText, onAddText
    };
  }
});
</script>

<style scoped>
.editor-panel { position:absolute; left:16px; top:16px; z-index:60; background: rgba(0,0,0,0.45); padding:10px; border-radius:8px; color:#fff; font-size:13px; max-width:360px; }
.editor-row { display:flex; gap:8px; align-items:center; margin-top:8px; flex-wrap:wrap; }
.editor-row input[type="text"], .editor-row input[type="search"], .editor-row input[type="color"] { min-width:120px; }
</style>