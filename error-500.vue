<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8 relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-64 h-64 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <Icon name="mdi:server-network-off" class="relative text-[120px] text-red-500 mx-auto animate-pulse" />
      </div>

      <!-- Error Message -->
      <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        <span class="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          500
        </span>
      </h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Lỗi máy chủ
      </h2>
      <p class="text-lg text-gray-600 mb-8">
        Rất tiếc, đã xảy ra lỗi trong quá trình xử lý yêu cầu của bạn. 
        Chúng tôi đang khắc phục sự cố này.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/" 
          class="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Icon name="mdi:home" class="text-[24px]" />
          <span>Về trang chủ</span>
        </NuxtLink>

        <button 
          @click="$router.go(0)"
          class="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-red-300 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Icon name="mdi:refresh" class="text-[24px]" />
          <span>Thử lại</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '500 - Lỗi máy chủ',
});
</script>