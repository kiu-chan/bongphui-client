<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-900 p-6">
    <div class="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-8 bg-white">
        <div class="max-w-md mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-slate-900">Đăng ký</h1>
              <p class="text-sm text-slate-500 mt-1">Tạo tài khoản mới để tham gia</p>
            </div>
            <img src="/favicon.ico" alt="logo" class="w-10 h-10 rounded" />
          </div>

          <form @submit.prevent="onSubmit" novalidate class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Họ và tên</label>
              <div :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.name ? 'border-red-400' : 'border-slate-200']">
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a5 5 0 015-5h2a5 5 0 015 5v1" />
                </svg>
                <input v-model="name" type="text" class="w-full bg-transparent outline-none text-slate-900" placeholder="Nguyễn Văn A" aria-label="name" />
              </div>
              <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Email (sẽ dùng làm username)</label>
              <div :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.email ? 'border-red-400' : 'border-slate-200']">
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input v-model="email" type="email" class="w-full bg-transparent outline-none text-slate-900" placeholder="you@example.com" aria-label="email" />
              </div>
              <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Mật khẩu</label>
              <div :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.password ? 'border-red-400' : 'border-slate-200']">
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                </svg>

                <input v-model="password" :type="showPassword ? 'text' : 'password'" class="w-full bg-transparent outline-none text-slate-900" placeholder="Ít nhất 6 ký tự" aria-label="password" />
                <button type="button" @click="showPassword = !showPassword" class="text-sm text-slate-500">
                  {{ showPassword ? 'Ẩn' : 'Hiện' }}
                </button>
              </div>
              <p v-if="errors.password" class="text-xs text-red-600 mt-1">{{ errors.password }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-slate-700">Xác nhận mật khẩu</label>
              <div :class="['flex items-center gap-2 border rounded-lg px-3 py-2 transition', errors.confirmPassword ? 'border-red-400' : 'border-slate-200']">
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 10-8 0v4M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                </svg>
                <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" class="w-full bg-transparent outline-none text-slate-900" placeholder="Nhập lại mật khẩu" aria-label="confirm-password" />
              </div>
              <p v-if="errors.confirmPassword" class="text-xs text-red-600 mt-1">{{ errors.confirmPassword }}</p>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-slate-600">
                <input type="checkbox" v-model="agree" class="form-checkbox h-4 w-4 rounded" />
                Tôi đồng ý với điều khoản dịch vụ
              </label>
              <NuxtLink to="/login" class="text-indigo-600 hover:underline">Đã có tài khoản?</NuxtLink>
            </div>

            <div>
              <button type="submit" :disabled="loading || success" class="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:scale-[1.01] transform transition disabled:opacity-60">
                <span v-if="!loading && !success">Tạo tài khoản</span>
                <span v-else-if="loading">Đang xử lý...</span>
                <span v-else>Đã tạo ✓</span>
              </button>
            </div>

            <div class="text-center text-sm text-slate-500">
              Hoặc trở lại
              <NuxtLink to="/login" class="text-indigo-600 hover:underline font-medium"> Đăng nhập</NuxtLink>
            </div>

            <div v-if="apiError" class="text-sm text-red-600 mt-2 text-center">{{ apiError }}</div>
          </form>

          <transition name="fade-slide">
            <div v-if="success" class="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center gap-3">
              <svg class="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div class="font-medium">Đăng ký thành công</div>
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

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agree = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);

const errors = reactive<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
const apiError = ref('');

const validate = () => {
  errors.name = '';
  errors.email = '';
  errors.password = '';
  errors.confirmPassword = '';
  apiError.value = '';
  let ok = true;

  if (!name.value || !name.value.trim()) {
    errors.name = 'Vui lòng nhập họ và tên';
    ok = false;
  }

  if (!email.value) {
    errors.email = 'Vui lòng nhập email';
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.email = 'Email không hợp lệ';
    ok = false;
  }

  if (!password.value) {
    errors.password = 'Vui lòng nhập mật khẩu';
    ok = false;
  } else if (password.value.length < 6) {
    errors.password = 'Mật khẩu ít nhất 6 ký tự';
    ok = false;
  }

  if (!confirmPassword.value) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    ok = false;
  } else if (confirmPassword.value !== password.value) {
    errors.confirmPassword = 'Mật khẩu không khớp';
    ok = false;
  }

  if (!agree.value) {
    errors.confirmPassword = errors.confirmPassword || 'Vui lòng đồng ý với điều khoản';
    ok = false;
  }

  return ok;
};

const onSubmit = async () => {
  if (!validate()) return;

  loading.value = true;
  apiError.value = '';
  try {
    // API expects: { username, password, role }
    // We'll use email as username and role = "user"
    const username = email.value;
    const role = "user";
    const res = await authStore.register(username, password.value, role);

    // res should be the created object (id, username, role, createdDate)
    success.value = true;

    // Optionally store some returned info to sessionStorage for demo
    try {
      if (res && res.username) sessionStorage.setItem('auth_demo_registered_username', res.username);
    } catch (e) {}

    setTimeout(() => {
      router.push('/login');
    }, 1200);
  } catch (err: any) {
    apiError.value = err?.message ?? 'Lỗi khi đăng ký';
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