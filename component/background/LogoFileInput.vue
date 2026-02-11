<template>
  <input ref="input" type="file" accept="image/*" style="display:none" @change="onChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LogoFileInput",
  emits: ['file-selected'],
  setup(_, { emit, expose }) {
    const input = ref<HTMLInputElement | null>(null);

    function open() {
      if (!input.value) return;
      input.value.value = '';
      input.value.click();
    }

    function onChange(e: Event) {
      const el = e.target as HTMLInputElement;
      const file = el?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        emit('file-selected', { dataUrl, fileName: file.name });
      };
      reader.readAsDataURL(file);
    }

    expose({ open });
    return { input, onChange };
  }
});
</script>