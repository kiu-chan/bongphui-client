<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Logo/Icon -->
      <div class="flex justify-center mb-8">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
          </svg>
        </div>
      </div>

      <!-- Error Code -->
      <div class="text-center mb-6">
        <p class="text-orange-500 font-bold text-lg mb-2">{{ error?.statusCode || '404' }}</p>
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          {{ getErrorTitle() }}
        </h1>
        <p class="text-gray-600 text-lg max-w-md mx-auto">
          {{ getErrorMessage() }}
        </p>
      </div>

      <!-- Error Details -->
      <div v-if="error?.message" class="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 text-sm mb-1">Chi tiết lỗi:</p>
            <p class="text-sm text-gray-600">{{ error.message }}</p>
            <p v-if="error.statusCode" class="text-xs text-gray-500 mt-2">
              Mã lỗi: <span class="font-mono font-semibold">{{ error.statusCode }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 mb-10">
        <button
          @click="handleError"
          class="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Về trang chủ</span>
        </button>

        <button 
          @click="goBack"
          class="py-4 px-6 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-orange-300 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Quay lại</span>
        </button>
      </div>

      <!-- Quick Links -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Có thể bạn đang tìm kiếm
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a 
            v-for="link in quickLinks" 
            :key="link.path"
            :href="link.path"
            class="group flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 border border-gray-100 hover:border-orange-200 transition-all duration-200"
          >
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              link.colorClass
            ]">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.iconPath" />
              </svg>
            </div>
            <div class="flex-1 text-left">
              <p class="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                {{ link.name }}
              </p>
              <p class="text-xs text-gray-500">{{ link.description }}</p>
            </div>
            <svg class="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Cần hỗ trợ? Liên hệ 
          <a href="mailto:support@giaidauviet.com" class="text-orange-600 hover:text-orange-700 font-semibold">
            support@giaidauviet.com
          </a>
          hoặc gọi 
          <a href="tel:0123456789" class="text-orange-600 hover:text-orange-700 font-semibold">
            012-345-6789
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
});

// Quick links
const quickLinks = [
  {
    name: 'Trang chủ',
    description: 'Xem tất cả giải đấu',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    colorClass: 'bg-gradient-to-br from-orange-500 to-red-500',
    path: '/'
  },
  {
    name: 'Giải đấu',
    description: 'Danh sách giải đấu',
    iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    colorClass: 'bg-gradient-to-br from-pink-500 to-purple-500',
    path: '/giaidau'
  },
  {
    name: 'Tạo giải đấu',
    description: 'Tạo giải đấu mới',
    iconPath: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
    colorClass: 'bg-gradient-to-br from-orange-500 to-pink-500',
    path: '/taogiaidau'
  },
  {
    name: 'Đăng nhập',
    description: 'Truy cập tài khoản',
    iconPath: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
    colorClass: 'bg-gradient-to-br from-purple-500 to-pink-500',
    path: '/login'
  }
];

// Get error title
const getErrorTitle = () => {
  const statusCode = props.error?.statusCode;
  switch (statusCode) {
    case 404:
      return 'Trang không tồn tại';
    case 500:
      return 'Lỗi máy chủ';
    case 403:
      return 'Truy cập bị từ chối';
    default:
      return 'Đã xảy ra lỗi';
  }
};

// Get error message
const getErrorMessage = () => {
  const statusCode = props.error?.statusCode;
  switch (statusCode) {
    case 404:
      return 'Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy thử tìm kiếm nội dung khác hoặc quay về trang chủ.';
    case 500:
      return 'Rất tiếc, đã xảy ra lỗi trong quá trình xử lý yêu cầu của bạn. Chúng tôi đang khắc phục sự cố này.';
    case 403:
      return 'Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập hoặc liên hệ quản trị viên.';
    default:
      return 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.';
  }
};

// Handle error
const handleError = () => {
  clearError({ redirect: '/' });
};

// Go back
const goBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back();
  } else {
    clearError({ redirect: '/' });
  }
};

// Set page metadata
useHead({
  title: `${props.error?.statusCode || '404'} - Lỗi`,
  meta: [
    { name: 'description', content: getErrorMessage() }
  ]
});
</script>