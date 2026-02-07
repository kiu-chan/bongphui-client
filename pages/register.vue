<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 p-4 md:p-6">
    <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Left Panel - Branding -->
      <div class="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 text-white relative overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 text-center">
          <img src="/img/imglg.png" alt="logo" class="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg object-contain bg-white p-2" />
          <h1 class="text-4xl font-bold mb-4">Tham gia cùng chúng tôi</h1>
          <p class="text-lg text-white/90 mb-8">Tạo tài khoản để trải nghiệm đầy đủ tính năng</p>
          
          <div class="space-y-4 text-left max-w-sm mx-auto">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:lightning-bolt" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">Đăng ký nhanh chóng</p>
                <p class="text-sm text-white/80">Chỉ mất vài phút thiết lập</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:shield-check" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">An toàn & bảo mật</p>
                <p class="text-sm text-white/80">Thông tin được mã hóa</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:star-circle" class="text-[24px]" />
              </div>
              <div>
                <p class="font-semibold">Miễn phí sử dụng</p>
                <p class="text-sm text-white/80">Truy cập đầy đủ tính năng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Register Form -->
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
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Đăng ký tài khoản</h2>
            <p class="text-gray-600">Điền thông tin để bắt đầu</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="onSubmit" novalidate class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">
                Họ và tên
              </label>
              <div
                :class="[
                  'flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all',
                  errors.name 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-orange-50/30'
                ]"
              >
                <Icon name="mdi:account-outline" class="text-gray-400 text-[22px] flex-shrink-0" />
                <input
                  v-model="name"
                  type="text"
                  class="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  placeholder="Nguyễn Văn A"
                  aria-label="name"
                />
              </div>
              <Transition name="error-slide">
                <p v-if="errors.name" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Icon name="mdi:alert-circle" class="text-[16px]" />
                  {{ errors.name }}
                </p>
              </Transition>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">
                Email
              </label>
              <div
                :class="[
                  'flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all',
                  errors.email 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-orange-50/30'
                ]"
              >
                <Icon name="mdi:email-outline" class="text-gray-400 text-[22px] flex-shrink-0" />
                <input
                  v-model="email"
                  type="email"
                  class="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  placeholder="email@example.com"
                  aria-label="email"
                />
              </div>
              <Transition name="error-slide">
                <p v-if="errors.email" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Icon name="mdi:alert-circle" class="text-[16px]" />
                  {{ errors.email }}
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
                  placeholder="Ít nhất 6 ký tự"
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

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div
                :class="[
                  'flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all',
                  errors.confirmPassword 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 hover:border-orange-300 focus-within:border-orange-500 focus-within:bg-orange-50/30'
                ]"
              >
                <Icon name="mdi:lock-check-outline" class="text-gray-400 text-[22px] flex-shrink-0" />
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  placeholder="Nhập lại mật khẩu"
                  aria-label="confirm-password"
                />
              </div>
              <Transition name="error-slide">
                <p v-if="errors.confirmPassword" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <Icon name="mdi:alert-circle" class="text-[16px]" />
                  {{ errors.confirmPassword }}
                </p>
              </Transition>
            </div>

            <!-- Agree Terms -->
            <div>
              <label class="flex items-start gap-3 text-sm text-gray-700 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="agree" 
                  class="mt-0.5 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2 cursor-pointer" 
                />
                <span class="group-hover:text-orange-600 transition-colors">
                  Tôi đồng ý với 
                  <NuxtLink to="/terms" class="text-orange-600 hover:text-orange-700 font-semibold">Điều khoản dịch vụ</NuxtLink>
                  và 
                  <NuxtLink to="/privacy" class="text-orange-600 hover:text-orange-700 font-semibold">Chính sách bảo mật</NuxtLink>
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading || success"
              class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold text-[16px] shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Icon v-if="loading" name="mdi:loading" class="animate-spin text-[20px]" />
              <Icon v-else-if="success" name="mdi:check-circle" class="text-[20px]" />
              <span v-if="!loading && !success">Tạo tài khoản</span>
              <span v-else-if="loading">Đang xử lý...</span>
              <span v-else>Đăng ký thành công!</span>
            </button>

            <!-- Login Link -->
            <div class="text-center pt-2">
              <span class="text-gray-600">Đã có tài khoản? </span>
              <NuxtLink 
                to="/login" 
                class="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Đăng nhập ngay
              </NuxtLink>
            </div>

            <!-- API Error -->
            <Transition name="error-slide">
              <div v-if="apiError" class="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 flex items-start gap-3">
                <Icon name="mdi:alert-circle" class="text-[24px] flex-shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold text-sm">Đăng ký thất bại</p>
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
                  <p class="font-bold text-green-800 text-[16px]">Đăng ký thành công!</p>
                  <p class="text-sm text-green-700">Đang chuyển hướng đến trang đăng nhập...</p>
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
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
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
    apiError.value = 'Vui lòng đồng ý với điều khoản dịch vụ';
    ok = false;
  }

  return ok;
};

const onSubmit = async () => {
  if (!validate()) return;

  loading.value = true;
  apiError.value = '';
  try {
    const username = email.value;
    const role = "user";
    const res = await authStore.register(username, password.value, role);

    success.value = true;

    try {
      if (res && res.username) sessionStorage.setItem('auth_demo_registered_username', res.username);
    } catch (e) {}

    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (err: any) {
    apiError.value = err?.message ?? 'Email đã được sử dụng hoặc có lỗi xảy ra';
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

input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}
</style>