<template>
  <div class="input-area">
    <label v-if="name" class="label">{{ name }}</label>

    <textarea
      :placeholder="placeholder"
      class="textarea"
      :value="modelValue"
      @input="onInput"
      :rows="rows"
    ></textarea>

    <!-- Hiển thị lỗi duy nhất từ prop error -->
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputArea",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 4,
    },
  },
  emits: ["update:modelValue", "input"],
  setup(props, { emit }) {
    function onInput(e: Event) {
      const val = (e.target as HTMLTextAreaElement).value;
      emit("update:modelValue", val);
      emit("input", val);
    }

    return { onInput };
  },
});
</script>

<style scoped>
.input-area {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 8px;
}

.textarea {
  background: #faf9f9;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid transparent;
  min-height: 100px;
  resize: vertical;
  font-size: 14px;
  color: #111;
  outline: none;
  box-sizing: border-box;
}

.textarea:focus {
  border-color: rgba(0,0,0,0.08);
}

.error-text {
  color: #eb0428;
  font-size: 13px;
  margin-top: 6px;
}
</style>