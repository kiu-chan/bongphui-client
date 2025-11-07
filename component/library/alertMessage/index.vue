<template>
  <transition name="fade">
    <div
      v-if="open"
      class="bgPopup fixed inset-0 flex justify-center items-center z-999"
    >
      <div
        class="w-full max-w-2xl bg-fc-dark rounded-xl shadow-2xl overflow-hidden text-white relative"
      >
        <div class="PopUp absolute inset-0 fc-radial-bg z-0"></div>
        <div class="PopUp-text relative z-10">
          <!-- Header -->
          <div
            style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
            class="px-5 py-4 border-b border-white border-opacity-10"
          >
            <h2 class="text-xl font-bold">{{ title }}</h2>
          </div>
          <div>
            <p class="text-center mt-7 mb-7 text-black">
              {{ alertmsg }}
              <span style="color: red">{{ alertmsgname }}</span>
            </p>
          </div>
          <!-- Footer -->
          <div
            class="bg-opacity-20 px-5 py-3 border-t border-white border-opacity-10 flex justify-end gap-4"
          >
            <button
              @click="$emit('success')"
              class="ButtonColor px-5 py-2 rounded-lg transition-colors"
              style="
                background: linear-gradient(90deg, #e97552 0%, #a949cf 100%);
                color: rgba(255, 255, 255, 1);
              "
            >
              xóa
            </button>
            <button
              @click="$emit('toggle')"
              class="ButtonColor px-5 py-2 rounded-lg transition-colors"
              style="
                border: 1px solid rgba(4, 184, 10, 1);
                color: rgba(4, 184, 10, 1);
              "
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
    alertmsg: {
      type: String,
      require: true,
    },
    alertmsgname: {
      type: String,
      require: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {},
});
</script>

<style scoped>
.PopUp {
  background-color: rgba(250, 250, 249, 1);
  box-shadow: 5px 10px;
}

.bgPopup {
  background-color: rgba(0, 0, 0, 0.8);
}
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
