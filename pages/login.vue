<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-900 p-6">
    <div class="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
      <!-- Single column: form -->
      <div class="p-8 bg-white">
        <div class="max-w-md mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-slate-900">Đăng nhập</h1>
              <p class="text-sm text-slate-500 mt-1">Nhập email/username và mật khẩu để tiếp tục</p>
            </div>
            <img src="/favicon.ico" alt="logo" class="w-10 h-10 rounded" />
          </div>

          <form @submit.prevent="onSubmit" novalidate class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Tài khoản (username)</label>
              <div
                :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.username ? 'border-red-400' : 'border-slate-200']"
              >
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12H8m8 0l-4-4m4 4l-4 4" />
                </svg>
                <input
                  v-model="username"
                  type="text"
                  class="w-full bg-transparent outline-none text-slate-900"
                  placeholder="username hoặc email"
                  aria-label="username"
                />
              </div>
              <p v-if="errors.username" class="text-xs text-red-600 mt-1">{{ errors.username }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Mật khẩu</label>
              <div
                :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.password ? 'border-red-400' : 'border-slate-200']"
              >
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                </svg>

                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full bg-transparent outline-none text-slate-900"
                  placeholder="Ít nhất 6 ký tự"
                  aria-label="password"
                />

                <button type="button" @click="showPassword = !showPassword" class="text-sm text-slate-500">
                  {{ showPassword ? 'Ẩn' : 'Hiện' }}
                </button>
              </div>
              <p v-if="errors.password" class="text-xs text-red-600 mt-1">{{ errors.password }}</p>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-slate-600">
                <input type="checkbox" v-model="remember" class="form-checkbox h-4 w-4 rounded" />
                Ghi nhớ đăng nhập
              </label>
              <NuxtLink to="/forgot-password" class="text-indigo-600 hover:underline">Quên mật khẩu?</NuxtLink>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading || success"
                class="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:scale-[1.01] transform transition disabled:opacity-60"
              >
                <span v-if="!loading && !success">Đăng nhập</span>
                <span v-else-if="loading">Đang xử lý...</span>
                <span v-else>Đã đăng nhập ✓</span>
              </button>
            </div>

            <div class="text-center text-sm text-slate-500">
              Chưa có tài khoản?
              <NuxtLink to="/register" class="text-indigo-600 hover:underline font-medium"> Đăng ký</NuxtLink>
            </div>

            <div v-if="apiError" class="text-sm text-red-600 mt-2 text-center">{{ apiError }}</div>
          </form>

          <!-- Success panel -->
          <transition name="fade-slide">
            <div v-if="success" class="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center gap-3">
              <svg class="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div class="font-medium">Đăng nhập thành công</div>
                <div class="text-xs">Bạn sẽ được chuyển hướng trong giây lát...</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from '#app';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const remember = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);

const errors = reactive<{ username?: string; password?: string }>({});
const apiError = ref('');

const validate = () => {
  errors.username = '';
  errors.password = '';
  apiError.value = '';
  let ok = true;

  if (!username.value) {
    errors.username = 'Vui lòng nhập username';
    ok = false;
  }

  if (!password.value) {
    errors.password = 'Vui lòng nhập mật khẩu';
    ok = false;
  } else if (password.value.length < 6) {
    errors.password = 'Mật khẩu ít nhất 6 ký tự';
    ok = false;
  }

  return ok;
};

const onSubmit = async () => {
  if (!validate()) return;

  loading.value = true;
  apiError.value = "";
  try {
    const token = await authStore.login(username.value, password.value, remember.value);

    // mark success and store already set by store
    success.value = true;

    // small delay so user sees success
    setTimeout(() => {
      // redirect to home or dashboard
      router.push('/');
    }, 900);
  } catch (err: any) {
    apiError.value = err?.message ?? 'Lỗi đăng nhập';
    success.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 280ms ease;
}
.fade-slide-enter-from {
  transform: translateY(-6px);
  opacity: 0;
}
.fade-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.fade-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.fade-slide-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}

/* Optional: small card animation on appear */
@keyframes popIn {
  from {
    transform: translateY(6px) scale(0.995);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
div[max-width] {
  animation: popIn 360ms ease;
}

/* tiny visual tweaks for form-checkbox when tailwind plugin not present */
.form-checkbox {
  appearance: none;
  background-color: #fff;
  border: 1px solid #cbd5e1;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-radius: 0.25rem;
  position: relative;
}
.form-checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
}
.form-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 0.22rem;
  top: 0.04rem;
  width: 0.22rem;
  height: 0.52rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>