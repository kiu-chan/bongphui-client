<template>
  <div
    class="flex w-full flex-col items-center justify-center bg-background py-5 lg:py-12"
  >
    <div class="w-full px-4 sm:max-w-[376px] lg:px-0">
      <h2 class="text-4xl font-semibold text-secondary">Get Started</h2>
      <p class="mt-1 text-xsm font-normal">Create a new account</p>
      <form action="">
        <div class="space-y-2 mt-3 sm:mt-[26px]">
          <label>Email</label>
          <input
            type="text"
            placeholder="Negaxy@gmail.com"
            class="mt-[8px] px-[12px] py-[8px] flex border-input bg-background px-3 py-2 text-sm ring-offset-baczkground duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:cursor-not-allowed disabled:opacity-50 h-12 w-full items-center rounded-full border pl-8"
          />
        </div>
        <div class="space-y-2 mt-3 sm:mt-[26px]">
          <label>Password</label>
          <div class="relative">
            <input
              :type="openPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="text-lg mt-[8px] px-[12px] py-[8px] flex border-input bg-background px-3 py-2 text-sm ring-offset-baczkground duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:cursor-not-allowed disabled:opacity-50 h-12 w-full items-center rounded-full border pl-8"
            />
            <button
              type="button"
              @click="openPassword = !openPassword"
              class="buttonEye inline-flex items-center duration-300 justify-center whitespace-nowrap rounded-full text-sm font-normal absolute bottom-0 right-2 w-7 sm:h-10"
            >
              <Icon
                class="buttonEyeIcon w-[17px] h-[17px]"
                :name="
                  openPassword
                    ? 'ic:outline-remove-red-eye'
                    : 'ic:outline-visibility-off'
                "
                width="24"
                height="24"
              />
            </button>
          </div>
        </div>
        <div class="space-y-2 mt-3 sm:mt-[26px]">
          <label>Confirm Password</label>
          <div class="relative">
            <input
              :type="openConfirmPw ? 'text' : 'password'"
              placeholder="••••••••"
              class="text-lg mt-[8px] px-[12px] py-[8px] flex border-input bg-background px-3 py-2 text-sm ring-offset-baczkground duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:cursor-not-allowed disabled:opacity-50 h-12 w-full items-center rounded-full border pl-8"
            />
            <button
              type="button"
              @click="openConfirmPw = !openConfirmPw"
              class="buttonEye inline-flex items-center duration-300 justify-center whitespace-nowrap rounded-full text-sm font-normal absolute bottom-0 right-2 w-7 sm:h-10"
            >
              <Icon
                class="buttonEyeIcon w-[17px] h-[17px]"
                :name="
                  openConfirmPw
                    ? 'ic:outline-remove-red-eye'
                    : 'ic:outline-visibility-off'
                "
                width="24"
                height="24"
              />
            </button>
          </div>
        </div>
      </form>

      <button
        class="inline-flex sm:h-12 items-center duration-300 justify-center viewChallenger whitespace-nowrap rounded-full text-sm font-normal ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:shadow-button-hover hover:text-secondary-foreground px-4 py-2 mt-3 h-12 w-full border-2 max-sm:h-[auto] max-sm:py-2.5 sm:mt-[21px]"
      >
        Login
      </button>
      <div
        class="mt-4 flex items-center justify-between gap-[29px] sm:mt-[30px]"
      >
        <span class="h-[1px] w-full bg-primary-light"> </span>
        or
        <span class="h-[1px] w-full bg-primary-light"> </span>
      </div>
      <div class="flex justify-center gap-4 mt-6">
        <div
          class="authIcon rounded-[10px] w-[40px] h-[40px] flex justify-center items-center"
        >
          <Icon
            class="w-[20px] h-[20px]"
            name="mingcute:google-fill"
            width="24"
            height="24"
          />
        </div>
        <div
          class="authIcon rounded-[10px] w-[40px] h-[40px] flex justify-center items-center"
        >
          <Icon
            class="w-[20px] h-[20px]"
            name="mingcute:facebook-fill"
            width="24"
            height="24"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-center">
        <p class="text-sm text-secondary">
          Don’t have an account?<a
            class="relative z-[1] font-normal tracking-tight after:absolute after:bottom-[-3px] after:left-1/2 after:z-[-1] after:h-[2px] after:w-0 after:bg-primary after:duration-300 hover:after:left-0 hover:after:w-full mx-2 text-sm text-primary-light"
            @click="emit('toogle')"
            >Sign up</a
          >
        </p>
      </div>
      <div class="mt-10 sm:text-center">
        <p class="text-xs text-secondary-light sm:mx-auto sm:max-w-sm">
          By continuing, you agree to FUTNext’s
          <a
            class="relative z-[1] font-normal tracking-tight after:absolute after:bottom-[-3px] after:left-1/2 after:z-[-1] after:h-[2px] after:w-0 after:bg-primary after:duration-300 hover:after:left-0 hover:after:w-full text-xs text-primary-light"
            href="/tos"
            >Terms of Service</a
          >
          and
          <a
            class="relative z-[1] font-normal tracking-tight after:absolute after:bottom-[-3px] after:left-1/2 after:z-[-1] after:h-[2px] after:w-0 after:bg-primary after:duration-300 hover:after:left-0 hover:after:w-full text-xs text-primary-light"
            href="/privacy-policy"
            >Privacy Policy</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
const emit = defineEmits<{
  (e: "toogle"): void;
}>();
const openPassword: Ref<boolean> = ref(false);
const openConfirmPw: Ref<boolean> = ref(false);
</script>
