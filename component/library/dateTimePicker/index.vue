<template>
  <div class="nebula-input">
    <input
      :required="true"
      type="datetime-local"
      name="text"
      v-model="inputValue"
      class="input"
    />
    <label class="user-label">{{ name }}</label>
    <div
      class="nebula-particle"
      style="--x: 0.2; --y: -0.4; --delay: 0.1s"
    ></div>
    <div
      class="nebula-particle"
      style="--x: 0.5; --y: -0.2; --delay: 0.3s"
    ></div>
    <div
      class="nebula-particle"
      style="--x: 0.3; --y: 0.3; --delay: 0.5s"
    ></div>
    <div
      class="nebula-particle"
      style="--x: 0.7; --y: 0.1; --delay: 0.2s"
    ></div>
    <div
      class="nebula-particle"
      style="--x: 0.1; --y: -0.7; --delay: 0.4s"
    ></div>
    <div
      class="nebula-particle"
      style="--x: 0.6; --y: 0.4; --delay: 0.6s"
    ></div>
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

<style>
.input {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  border: 1.5px solid var(--textButton);
  border-radius: 0.5rem;
  box-shadow: 2.5px 3px 0 var(--textButton);
  outline: none;
  transition: ease 0.25s;
}

.input:focus {
  box-shadow: 5.5px 7px 0 var(--textButton);
}
/* From Uiverse.io by risabbir */
.nebula-input {
  position: relative;
  width: 100%;
  margin: 10px auto;
}

.nebula-input .input {
  width: 100%;
  padding: 15px;
  border: 2px solid #2a2a3a;
  background: #00000f;
  color: white;
  font-size: 16px;
  outline: none;
  border-radius: 8px;
  transition: all 0.4s ease-out;
}

.nebula-input .user-label {
  position: absolute;
  left: 15px;
  top: 15px;
  pointer-events: none;
  color: #6a6a8a;
  transition: all 0.4s ease-out;
  background: #00000f;
  padding: 0 5px;
}

.nebula-input .input:focus {
  border-color: var(--textButton);
  box-shadow: 0 5px 8px rgba(48, 207, 56, 0.3),
    0 10px 20px rgba(105, 236, 111, 0.3), 0 15px 40px rgba(93, 247, 101, 0.3),
    0 20px 60px rgba(80, 250, 89, 0.3);
}

.nebula-input .input:focus ~ .user-label,
.nebula-input .input:valid ~ .user-label {
  transform: translateY(-25px);
  font-size: 12px;
  color: var(--textsport);
  left: 10px;
}

.nebula-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  top: 50%;
  left: 10px;
  filter: blur(0.8px);
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
}

.nebula-input .input:focus ~ .nebula-particle {
  animation: nebula-float 2s forwards ease-out;
}

@keyframes nebula-float {
  0% {
    transform: translate(0, -50%) scale(0.8);
    opacity: 0;
    background: #77f8a2;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(var(--x) * 140px), calc(var(--y) * 35px))
      scale(1.1);
    opacity: 0;
    background: #6df2ff;
  }
}
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(180deg);
}
</style>
