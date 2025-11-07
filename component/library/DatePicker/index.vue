<template>
  <div class="inputDate">
    <label
      style="color: rgba(0, 0, 0, 1)"
      class="block text-[25px] font-medium"
      >{{ name }}</label
    >
    <input
      :required="true"
      type="date"
      name="text"
      v-model="inputValue"
      class="input mt-4"
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
.inputDate .input {
  width: 100%;
  padding: 15px;
  color: rgba(132, 132, 132, 1);
  font-size: 16px;
  outline: none;
  border-radius: 8px;
}

.inputDate .user-label {
  pointer-events: none;
  color: #6a6a8a;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

input[type="date"] {
  position: relative;
  background-color: rgba(250, 249, 249, 1); /* Giữ lại màu nền */
  background-image: url("../../../assets/img/datePicker.png");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
  padding-right: 35px;
  height: 70px;
  border-radius: 15px;
  border: none;
}
</style>
