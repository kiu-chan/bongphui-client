<template>
  <transition name="fade">
    <div
      v-if="open"
      class="bgPopup fixed inset-0 flex justify-center items-center z-999"
    >
      <div class="w-full h-full shadow-2xl overflow-hidden text-black relative">
        <div class="PopUp absolute inset-0 fc-radial-bg z-0"></div>
        <div class="relative z-10 h-full">
          <!-- Header -->
          <div
            style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
            class="titlePopUp px-5 py-4 border-white flex items-center h-[10%]"
          >
            <h2 class="text-xl font-bold text-white">{{ title }}</h2>
          </div>
          <div class="h-[80%] overflow-auto px-5 py-4">
            <slot />
          </div>
          <!-- Footer -->
          <div
            class="px-5 py-3 border-t-4 border-gray-300 flex justify-end gap-4 h-[10%]"
          >
            <button
              @click="$emit('success')"
              style="
                background: linear-gradient(90deg, #e97552 0%, #a949cf 100%);
                color: rgba(255, 255, 255, 1);
              "
              class="ButtonColor px-5 py-2 rounded-lg"
            >
              Tạo
            </button>
            <button
              @click="$emit('toggle')"
              style="
                border: 1px solid rgba(4, 184, 10, 1);
                color: rgba(4, 184, 10, 1);
              "
              class="ButtonColor px-5 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      require: true,
    },
    width: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {},
});
</script>

<style scoped>
.PopUp {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 5px 10px;
}
.bg-fc-dark {
  background-color: var(--background);
}
.PopUp-text {
  background-image: radial-gradient(
    ellipse 68% 117% at 49% 1%,
    rgb(7, 71, 34),
    transparent 94%
  );
}
/* .bgPopup {
  background-color: rgba(0, 0, 0, 0.7);
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
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
.ButtonColor {
  color: var(--textsport);
  background-color: var(--background);
  border: 1px solid var(--textButton);
  transition: all 0.4s ease-out;
}
.ButtonColor:hover {
  box-shadow: 0 5px 8px rgba(48, 207, 56, 0.3),
    0 10px 20px rgba(105, 236, 111, 0.3), 0 15px 40px rgba(93, 247, 101, 0.3),
    0 20px 60px rgba(80, 250, 89, 0.3);
}
</style>
