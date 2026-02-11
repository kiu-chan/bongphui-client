<template>
  <div v-if="show" @click="closeSidebar" class="sideBar fixed ">
    <div
      @click.stop
      :class="['sideBar-color', isClosing ? 'side-left' : 'side-right']"
      class="w-[310px] h-full "
    >
    <div class="flex justify-end px-[16px] pt-[16px]">
      <Icon name="mdi:close"  class="w-[24px] h-[24px]" width="48" height="48" />
    </div>
    <NuxtLink href="#" >
        <div class="px-[24px]">
          <div class="flex  gap-2 items-center">
              <img
                  class="logo "
                  src="../assets/img/logo_giaudauviet.png"
                  alt="FUTNext Logo"
              />
          </div>
          <ul class=" ms-[20px] ">
            <NuxtLink v-for="item in headerLeague" :key="item.title" :to="item.router">
                <li class="TextLeague mt-[20px] p-[21px]  inline-block rounded-full border border-transparent">{{ item.title }}</li>
            </NuxtLink>
        </ul>
        </div>
    </NuxtLink>
  </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { headerLeague } from '../utils/header';
export default {
  props: {
    openSideBar: Boolean,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(props.openSideBar)
    const isClosing = ref(false)

    watch(
      () => props.openSideBar,
      (newVal) => {
        if (newVal) {
          show.value = true
          isClosing.value = false
        } else {
          // Bật animation đóng
          isClosing.value = true
          setTimeout(() => {
            show.value = false
            emit('close')
          }, 600)
        }
      }
    )

    function closeSidebar() {
      isClosing.value = true
      setTimeout(() => {
        show.value = false
        emit('close')
      }, 600)
      document.body.classList.remove('overflow-hidden')
    }

    return {
      closeSidebar,
      show,
      isClosing,
    }
  },
}
</script>

<style>
.sideBar {
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999999999;
}
.sideBar-color {
  background-color: var(--background);
  animation-fill-mode: forwards;
}
.side-right {
  animation: side-right 0.6s ease-out forwards;
}
.side-left {
  animation: side-left 0.6s ease-out forwards;
}
.TextLeague {
  transition: background-color 0.4s ease-in;
}

.TextLeague:hover {
  border: 1px solid var(--textPrimary);
  background-color: var(--textLeguage);
  color: var(--textsport);
}
@keyframes side-right {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes side-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
