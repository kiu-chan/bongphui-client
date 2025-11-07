<template>
  <div class="">
    <label
      style="color: rgba(0, 0, 0, 1)"
      class="block text-[25px] font-medium"
      >{{ name }}</label
    >
    <select
      style="border-radius: 15px"
      class="selectBackground w-full h-full mt-4"
      name=""
      id=""
      v-model="inputValue"
    >
      <option value="" disabled selected hidden>Chọn khu vực</option>
      <option
        v-for="(item, index) in statusMatch"
        :key="index"
        :value="item.name"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import type { PropType } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
    statusMatch: {
      type: Object as PropType<{ id: number; name?: string }[]>,
      required: true,
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
.selectBackground {
  background-color: rgba(250, 249, 249, 1);
  height: 70px;
  align-items: center;
  border-radius: 15px;
  padding-left: 20px;
  outline: none;
}
</style>
