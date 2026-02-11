<template>
  <div class="select-nebula">
    <label v-if="name" class="select-label">{{ name }}</label>

    <div :class="['select-wrapper', { 'has-error': !!error }]">
      <!-- simple native select to ensure accessibility and predictable behavior -->
      <select
        :value="internalValue"
        @change="onChange($event)"
        class="select-element"
      >
        <option value="" disabled>{{ placeholderText }}</option>
        <option
          v-for="opt in options"
          :key="opt.id ?? opt.code ?? opt.name"
          :value="opt"
        >
          {{ opt.name ?? opt.fullname ?? opt.fullName ?? opt }}
        </option>
      </select>
      <Icon v-if="showChevron" name="ci:chevron-down" class="chev" width="20" height="20" />
    </div>

    <!-- single error message rendered here (component is responsible for showing it) -->
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SelectNebula",
  props: {
    modelValue: {
      type: [String, Number, Object, null],
      default: null,
    },
    statusMatch: {
      // accept array of simple strings or objects
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Chọn",
    },
    error: {
      type: String,
      default: "",
    },
    // whether to show the chevron icon (optional)
    showChevron: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    // expose options consistently as objects with { id, name }
    const options = computed(() =>
      props.statusMatch?.map((item: any) => {
        if (item == null) return item;
        if (typeof item === "string" || typeof item === "number") {
          return { id: item, name: item };
        }
        // keep original object (expected shape: { id, name } or { code, name })
        return item;
      }) ?? []
    );

    const internalValue = computed(() => {
      // return a stable value for the native select; we'll stringify objects
      const v = props.modelValue;
      if (v == null || v === "") return "";
      // If model is an object from the same options, return the object reference.
      // But since native select binds by value, we'll use index or JSON string as value.
      // To keep things simple and robust, we store the actual option object in the option value.
      // Vue will compare by reference when the same object is used.
      return v;
    });

    function onChange(e: Event) {
      const target = e.target as HTMLSelectElement;
      const selectedIndex = target.selectedIndex;
      // First option is placeholder -> index 0
      const realIndex = selectedIndex - 1;
      const selected = realIndex >= 0 ? options.value[realIndex] : null;
      emit("update:modelValue", selected);
      emit("change", selected);
    }

    return {
      options,
      internalValue,
      onChange,
    };
  },
});
</script>

<style scoped>
.select-nebula {
  display: flex;
  flex-direction: column;
}

.select-label {
  font-weight: 600;
  margin-bottom: 8px;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #faf9f9;
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid transparent;
}

.select-wrapper.has-error {
  border-color: #eb0428;
  background: #fff5f5;
}

.select-element {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #111;
  cursor: pointer;
}

/* chevron icon */
.chev {
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: rgba(0,0,0,0.5);
}

/* error */
.error-text {
  color: #eb0428;
  font-size: 13px;
  margin-top: 6px;
}
</style>