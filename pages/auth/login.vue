<template>
  <div class="relative authentication w-full grid grid-cols-2">
    <Register @toogle="openSlide = false" />
    <div
      class="bg-muted absolute"
      :class="openSlide ? 'slide-right ' : 'slide-left'"
    >
      <aside
        class="relative flex h-full w-full flex-col overflow-hidden bg-cover bg-center px-4 lg:items-center lg:justify-center lg:py-24"
      >
        <a
          aria-label="redirect to home page"
          class="left-5 top-5 z-10 pt-4 lg:absolute"
          href="/"
        >
          <div class="flex items-center gap-2">
            <img
              class="logo"
              src="../../assets/img/logo_giaudauviet.png"
              alt="FUTNext Logo"
            />
          </div>
        </a>
        <div>
          <h1
            class="TextSport z-[101] mb-4 bg-gradient-atb bg-clip-text text-center text-4xl font-bold leading-[121%] tracking-tightest text-transparent md:text-[40px]"
          >
            GIẢI ĐẤU VIỆT<br /><span class="text-white text-3xl"
              >NÂNG TẦM THỂ THAO VIỆT</span
            >
          </h1>
        </div>
        <div
          class="absolute bg-gradient-primary left-[0] top-[0] h-[350px] w-[350px] rounded-[532px] blur-[200px]"
        ></div>
        <div
          class="absolute bg-gradient-primary right-[0] bottom-[0] h-[200px] w-[200px] rounded-[532px] blur-[200px]"
        ></div>
      </aside>
    </div>
    <LoginForm @toogle="openSlide = true" />
  </div>
</template>

<script setup lang="ts">
import LoginForm from "~/component/auth/LoginForm.vue";
import Register from "~/component/auth/Register.vue";
import { ref, type Ref } from "vue";

definePageMeta({
  layout: "auth",
});
const openSlide: Ref<boolean> = ref(false);
</script>
<style>
.authentication {
  height: 100vh;
}
.bg-muted {
  left: 0;
  right: 50%;
  top: 0;
  bottom: 0;
  background-color: var(--muted);
  z-index: 99999;
}

.slide-right {
  animation: slideRight 0.5s ease-out forwards;
}

/* Slide từ phải sang trái (register) */
.slide-left {
  animation: slideLeft 0.5s ease-out forwards;
}

@keyframes slideRight {
  from {
    right: 50%;
    left: 0;
    top: 0;
    bottom: 0;
  }
  to {
    box-shadow: 0;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
  }
}

@keyframes slideLeft {
  from {
    right: 0;
    left: 50%;
    top: 0;
    bottom: 0;
  }
  to {
    right: 50%;
    left: 0;
    top: 0;
    bottom: 0;
  }
}
.bg-gradient-primary {
  background-image: linear-gradient(
    180deg,
    hsl(138.93 100% 40.39% / 1) 0%,
    hsl(138.93 100% 40.39% / 0) 100%
  );
}
.buttonEye {
  height: 100%;
}
.buttonEye:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
/* .buttonEyeIcon:hover {
} */
.bg-primary-light {
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
}
.authIcon:nth-child(1) {
  background-color: #d44638;
}
.authIcon:nth-child(2) {
  background-color: #3f578e;
}
.focus-visible\:ring-primary-light:focus-visible {
  --tw-ring-color: var(--textPrimaryLight);
}
</style>
