<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 p-4 md:p-6">
    <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Left Panel - Branding -->
      <div class="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-orange-400 via-orange-500 to-purple-600 text-white relative overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 text-center">
          <img src="/img/imglg.png" alt="logo" class="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg object-contain bg-white p-2" />
          <h1 class="text-4xl font-bold mb-4">Giải Đấu Việt</h1>
          <p class="text-lg text-white/90 mb-8">Nền tảng quản lý giải đấu bóng đá chuyên nghiệp</p>
          
          <div class="space-y-4 text-left max-w-sm mx-auto">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:trophy" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">Quản lý giải đấu</p>
                <p class="text-sm text-white/80">Dễ dàng tổ chức và theo dõi</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:account-group" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">Quản lý đội bóng</p>
                <p class="text-sm text-white/80">Thông tin cầu thủ chi tiết</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:calendar-star" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">Lịch thi đấu</p>
                <p class="text-sm text-white/80">Cập nhật liên tục theo thời gian thực</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Login Form -->
      <div class="p-8 md:p-12">
        <div class="max-w-md mx-auto">
          <!-- Mobile Logo -->
          <div class="lg:hidden text-center mb-6">
            <img src="/img/imglg.png" alt="logo" class="w-16 h-16 mx-auto mb-3 rounded-xl shadow-lg object-contain" />
            <h1 class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Giải Đấu Việt
            </h1>
          </div>

          <!-- Header -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
            <p class="text-gray-600">Chào mừng bạn quay trở lại!</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="onSubmit" novalidate class="space-y-5">
            <!-- Username -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">
                Tài khoản
              </label>
              <div
                :class="[
                  'flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all',
                  errors.username 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-orange-50/30'
                ]"
              >
                <Icon name="mdi:account-outline" class="text-gray-400 text-[22px] flex-shrink-0" />
                <input
                  v-model="username"
                  type="text"
                  class="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  placeholder="Username hoặc email"
                  aria-label="username"
                />
              </div>
              <Transition name="error-slide">
                <p v-if="errors.username" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Icon name="mdi:alert-circle" class="text-[16px]" />
                  {{ errors.username }}
                </p>
              </Transition>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">
                Mật khẩu
              </label>
              <div
                :class="[
                  'flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all',
                  errors.password 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-orange-50/30'
                ]"
              >
                <Icon name="mdi:lock-outline" class="text-gray-400 text-[22px] flex-shrink-0" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  placeholder="Nhập mật khẩu"
                  aria-label="password"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword" 
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-[20px]" />
                </button>
              </div>
              <Transition name="error-slide">
                <p v-if="errors.password" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Icon name="mdi:alert-circle" class="text-[16px]" />
                  {{ errors.password }}
                </p>
              </Transition>
            </div>

            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-gray-700 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="remember" 
                  class="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2 cursor-pointer" 
                />
                <span class="group-hover:text-orange-600 transition-colors">Ghi nhớ đăng nhập</span>
              </label>
              <NuxtLink 
                to="/forgot-password" 
                class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Quên mật khẩu?
              </NuxtLink>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading || success"
              class="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold text-[16px] shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Icon v-if="loading" name="mdi:loading" class="animate-spin text-[20px]" />
              <Icon v-else-if="success" name="mdi:check-circle" class="text-[20px]" />
              <span v-if="!loading && !success">Đăng nhập</span>
              <span v-else-if="loading">Đang xử lý...</span>
              <span v-else>Đăng nhập thành công!</span>
            </button>

            <!-- Register Link -->
            <div class="text-center pt-2">
              <span class="text-gray-600">Chưa có tài khoản? </span>
              <NuxtLink 
                to="/register" 
                class="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Đăng ký ngay
              </NuxtLink>
            </div>

            <!-- API Error -->
            <Transition name="error-slide">
              <div v-if="apiError" class="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 flex items-start gap-3">
                <Icon name="mdi:alert-circle" class="text-[24px] flex-shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-sm">Đăng nhập thất bại</p>
                  <p class="text-sm">{{ apiError }}</p>
                </div>
              </div>
            </Transition>
          </form>

          <!-- Success Panel -->
          <Transition name="success-slide">
            <div v-if="success" class="mt-6 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                  <Icon name="mdi:check" class="text-white text-[28px]" />
                </div>
                <div>
                  <p class="font-bold text-green-800 text-[16px]">Đăng nhập thành công!</p>
                  <p class="text-sm text-green-700">Đang chuyển hướng về trang chủ...</p>
                </div>
              </div>
            </div>
          </Transition>
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
    errors.username = 'Vui lòng nhập username hoặc email';
    ok = false;
  }

  if (!password.value) {
    errors.password = 'Vui lòng nhập mật khẩu';
    ok = false;
  } else if (password.value.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
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

    success.value = true;

    setTimeout(() => {
      router.push('/');
    }, 1200);
  } catch (err: any) {
    apiError.value = err?.message ?? 'Tài khoản hoặc mật khẩu không chính xác';
    success.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Error slide animation */
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}
.error-slide-enter-from {
  transform: translateY(-8px);
  opacity: 0;
}
.error-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.error-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.error-slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

/* Success slide animation */
.success-slide-enter-active {
  transition: all 0.4s ease;
}
.success-slide-enter-from {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
.success-slide-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* Checkbox styling */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  border: 2px solid #d1d5db;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="checkbox"]:hover {
  border-color: #f97316;
}

input[type="checkbox"]:checked {
  background-color: #f97316;
  border-color: #f97316;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 0.25rem;
  top: 0.05rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Focus ring */
input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}
</style>