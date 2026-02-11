<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <NuxtLink to="/register" class="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors mb-4">
          <Icon name="mdi:arrow-left" class="text-[20px]" />
          Quay lại đăng ký
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Điều khoản dịch vụ</h1>
        <p class="text-gray-600 mt-2">Cập nhật lần cuối: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <!-- Introduction -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:file-document-outline" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Giới thiệu</h2>
          </div>
          <p class="text-gray-700 leading-relaxed">
            Chào mừng bạn đến với <strong class="text-orange-600">Hệ thống Quản lý Giải đấu Bóng đá</strong>. 
            Bằng việc truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện sau đây.
          </p>
        </section>

        <!-- Section 1 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:account-check" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">1. Điều khoản sử dụng dịch vụ</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong class="text-gray-900">1.1. Tài khoản người dùng:</strong> Khi đăng ký tài khoản, bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật. 
              Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.
            </p>
            <p>
              <strong class="text-gray-900">1.2. Quyền truy cập:</strong> Chúng tôi cấp cho bạn quyền truy cập giới hạn, không độc quyền, không thể chuyển nhượng 
              để sử dụng dịch vụ cho mục đích cá nhân và phi thương mại.
            </p>
            <p>
              <strong class="text-gray-900">1.3. Hành vi bị cấm:</strong> Bạn không được:
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li>Sử dụng dịch vụ cho mục đích bất hợp pháp hoặc trái với điều khoản này</li>
              <li>Can thiệp hoặc phá hoại hoạt động của hệ thống</li>
              <li>Truy cập trái phép vào tài khoản của người dùng khác</li>
              <li>Sao chép, sửa đổi hoặc phân phối nội dung mà không có sự cho phép</li>
            </ul>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:shield-check" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">2. Quyền sở hữu trí tuệ</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong class="text-gray-900">2.1. Nội dung của chúng tôi:</strong> Tất cả nội dung, tính năng và chức năng của dịch vụ 
              (bao gồm nhưng không giới hạn văn bản, đồ họa, logo, biểu tượng, hình ảnh, video và phần mềm) 
              đều thuộc sở hữu của chúng tôi hoặc các bên cấp phép của chúng tôi.
            </p>
            <p>
              <strong class="text-gray-900">2.2. Nội dung của người dùng:</strong> Bạn giữ quyền sở hữu đối với nội dung mà bạn tải lên hệ thống. 
              Tuy nhiên, bằng việc tải lên, bạn cấp cho chúng tôi quyền sử dụng, hiển thị và phân phối nội dung đó trong phạm vi cung cấp dịch vụ.
            </p>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:alert-circle" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">3. Giới hạn trách nhiệm</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong class="text-gray-900">3.1. Miễn trừ trách nhiệm:</strong> Dịch vụ được cung cấp "nguyên trạng" và "theo khả năng có sẵn". 
              Chúng tôi không đảm bảo rằng dịch vụ sẽ luôn an toàn, không bị gián đoạn hoặc không có lỗi.
            </p>
            <p>
              <strong class="text-gray-900">3.2. Giới hạn trách nhiệm:</strong> Trong mọi trường hợp, chúng tôi sẽ không chịu trách nhiệm 
              đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
            </p>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:cancel" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">4. Chấm dứt dịch vụ</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi có quyền đình chỉ hoặc chấm dứt quyền truy cập của bạn vào dịch vụ ngay lập tức, 
              không cần thông báo trước hoặc chịu trách nhiệm, nếu chúng tôi tin rằng bạn đã vi phạm các điều khoản này.
            </p>
          </div>
        </section>

        <!-- Section 5 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:refresh" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">5. Thay đổi điều khoản</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản này bất cứ lúc nào. 
              Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo ít nhất 30 ngày trước khi các điều khoản mới có hiệu lực. 
              Việc bạn tiếp tục sử dụng dịch vụ sau khi các thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
            </p>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="mb-10 p-6 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:email" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">6. Liên hệ</h2>
          </div>
          <div class="space-y-3 text-gray-700">
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi qua:
            </p>
            <div class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="text-orange-600" />
              <span class="font-semibold">Email:</span>
              <a href="mailto:support@giaidauviet.com" class="text-orange-600 hover:text-orange-700">support@giaidauviet.com</a>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="text-orange-600" />
              <span class="font-semibold">Hotline:</span>
              <a href="tel:0123456789" class="text-orange-600 hover:text-orange-700">012-345-6789</a>
            </div>
          </div>
        </section>

        <!-- Footer Note -->
        <div class="pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">
            Bằng việc sử d���ng dịch vụ của chúng tôi, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với các Điều khoản dịch vụ này.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lastUpdated = new Date().toLocaleDateString('vi-VN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

useHead({
  title: 'Điều khoản dịch vụ - Hệ thống Quản lý Giải đấu',
  meta: [
    { name: 'description', content: 'Điều khoản và điều kiện sử dụng dịch vụ của Hệ thống Quản lý Giải đấu Bóng đá' }
  ]
});
</script>

<style scoped>
strong {
  font-weight: 600;
}

ul {
  color: #374151;
}
</style>