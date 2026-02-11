<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[999] flex justify-center items-center bgPopup"
    >
      <div
        class="PopUp rounded-xl shadow-2xl overflow-y-auto text-black"
        :style="{ width: width + 'px', maxHeight: height + 'px' }"
      >
        <div
          style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
          class="px-5 py-4 border-b border-gray-300"
        >
          <h2 style="color: rgba(255, 255, 255, 1)" class="text-xl font-bold">
            {{ title }}
          </h2>
        </div>

        <slot></slot>

        <div class="px-5 py-3 border-t border-gray-300 flex justify-end gap-4">
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
  </transition>
</template>

<script lang="ts" setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: false },
});
defineEmits(["toggle", "success"]);
</script>

<style scoped>
.bgPopup {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.PopUp {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  z-index: 1000;
}

.ButtonColor {
  cursor: pointer;
  transition: all 0.4s ease-out;
}
</style>
