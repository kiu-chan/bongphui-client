<template>
  <div class="col-span-3">
    <label
      style="color: rgba(0, 0, 0, 1)"
      class="block text-[25px] font-medium"
      >{{ name }}</label
    >
    <textarea
      type="text"
      name="text"
      autocomplete="off"
      rows="4"
      placeholder="Nhập mô tả"
      v-model="inputValue"
      cols="50"
      class="inputBackground w-full pt-2 mt-4"
    >
    </textarea>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });
    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
.inputBackground {
  background-color: rgba(250, 249, 249, 1);
  align-items: center;
  border-radius: 15px;
  padding-left: 20px;
  outline: none;
}
</style>
