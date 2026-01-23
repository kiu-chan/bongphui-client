<template>
  <!-- tag có thể là 'div', 'h1', 'h2', ... truyền qua prop `tag` -->
  <component
    :is="tag"
    ref="el"
    v-bind="$attrs"
    :contenteditable="editable"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.enter.prevent="onEnter"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "ContentEditable",
  props: {
    modelValue: { type: String, default: "" },
    tag: { type: String, default: "div" },
    editable: { type: Boolean, default: true },
    // optional trim
    trim: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "blur"],
  setup(props, { emit }) {
    const el = ref<HTMLElement | null>(null);
    const focused = ref(false);

    const setInner = (value: string) => {
      if (!el.value) return;
      // Only update if actual text differs to avoid unnecessary mutations
      if ((el.value.innerText || "") !== (value || "")) {
        el.value.innerText = value ?? "";
      }
    };

    // initialize
    onMounted(() => {
      setInner(props.modelValue);
    });

    // Watch external model changes — but DO NOT overwrite while focused
    watch(
      () => props.modelValue,
      (v) => {
        if (!focused.value) {
          // update DOM (will not move caret because not focused)
          nextTick(() => setInner(v));
        }
      }
    );

    function onInput() {
      if (!el.value) return;
      const raw = el.value.innerText ?? "";
      const value = props.trim ? raw.trim() : raw;
      emit("update:modelValue", value);
    }

    function onFocus() {
      focused.value = true;
    }

    function onBlur(e: FocusEvent) {
      focused.value = false;
      // ensure model sync on blur
      if (el.value) {
        const raw = el.value.innerText ?? "";
        const value = props.trim ? raw.trim() : raw;
        emit("update:modelValue", value);
      }
      emit("blur", e);
    }

    function onEnter(e: Event) {
      // blur on Enter (caller prevents default)
      if (el.value) el.value.blur();
    }

    return { el, onInput, onFocus, onBlur, onEnter };
  },
});
</script>

<style scoped>
/* nothing specific here; styling comes from parent classes */
</style>