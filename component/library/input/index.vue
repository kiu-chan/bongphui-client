<template>
  <div class="col-span-3">
    <label
      style="color: rgba(0, 0, 0, 1)"
      class="block text-[25px] font-medium"
      >{{ name }}</label
    >
    <input
      type="text"
      :placeholder="placeHolder"
      class="inputBackground w-full mt-4"
      v-model="inputValue"
    />
  </div>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    placeHolder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
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
  height: 70px;
  align-items: center;
  border-radius: 15px;
  padding-left: 20px;
  outline: none;
}
</style>
