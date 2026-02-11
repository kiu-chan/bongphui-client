<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <NuxtLink to="/register" class="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors mb-4">
          <Icon name="mdi:arrow-left" class="text-[20px]" />
          Quay lại đăng ký
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Chính sách bảo mật</h1>
        <p class="text-gray-600 mt-2">Cập nhật lần cuối: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <!-- Introduction -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:shield-lock" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Giới thiệu</h2>
          </div>
          <p class="text-gray-700 leading-relaxed">
            Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của bạn. 
            Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn 
            khi bạn sử dụng <strong class="text-orange-600">Hệ thống Quản lý Giải đấu Bóng đá</strong>.
          </p>
        </section>

        <!-- Section 1 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:database" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">1. Thông tin chúng tôi thu thập</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong class="text-gray-900">1.1. Thông tin bạn cung cấp:</strong>
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Thông tin đăng ký:</strong> Họ tên, địa chỉ email, mật khẩu</li>
              <li><strong>Thông tin hồ sơ:</strong> Ảnh đại diện, thông tin liên hệ, sở thích</li>
              <li><strong>Thông tin giải đấu:</strong> Thông tin về đội bóng, cầu thủ, trận đấu mà bạn tạo hoặc quản lý</li>
            </ul>
            <p>
              <strong class="text-gray-900">1.2. Thông tin tự động thu thập:</strong>
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành, thiết bị</li>
              <li><strong>Dữ liệu sử dụng:</strong> Trang bạn truy cập, thời gian sử dụng, hành động trong hệ thống</li>
              <li><strong>Cookies:</strong> Dữ liệu được lưu trữ để cải thiện trải nghiệm người dùng</li>
            </ul>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:cog" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">2. Cách chúng tôi sử dụng thông tin</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>Chúng tôi sử dụng thông tin của bạn để:</p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Cung cấp dịch vụ:</strong> Tạo và quản lý tài khoản, xử lý yêu cầu của bạn</li>
              <li><strong>Cải thiện dịch vụ:</strong> Phân tích hành vi người dùng để nâng cao chất lượng</li>
              <li><strong>Giao tiếp:</strong> Gửi thông báo, cập nhật, phản hồi yêu cầu hỗ trợ</li>
              <li><strong>Bảo mật:</strong> Phát hiện và ngăn chặn gian lận, lạm dụng</li>
              <li><strong>Tuân thủ pháp luật:</strong> Đáp ứng các yêu cầu pháp lý và bảo vệ quyền lợi của chúng tôi</li>
            </ul>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:share-variant" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">3. Chia sẻ thông tin</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi <strong>không bán, cho thuê hoặc trao đổi</strong> thông tin cá nhân của bạn với bên thứ ba. 
              Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Với sự đồng ý của bạn:</strong> Khi bạn cho phép chúng tôi chia sẻ thông tin</li>
              <li><strong>Nhà cung cấp dịch vụ:</strong> Các đối tác hỗ trợ vận hành hệ thống (hosting, email, analytics) với hợp đồng bảo mật</li>
              <li><strong>Yêu cầu pháp lý:</strong> Khi pháp luật yêu cầu hoặc để bảo vệ quyền lợi hợp pháp</li>
              <li><strong>Chuyển nhượng kinh doanh:</strong> Trong trường hợp sáp nhập, mua lại công ty</li>
            </ul>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:shield-check" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">4. Bảo mật thông tin</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn:
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Mã hóa:</strong> Dữ liệu được mã hóa trong quá trình truyền tải (SSL/TLS)</li>
              <li><strong>Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền mới có thể truy cập thông tin</li>
              <li><strong>Giám sát:</strong> Hệ thống giám sát liên tục để phát hiện vi phạm bảo mật</li>
              <li><strong>Sao lưu:</strong> Dữ liệu được sao lưu định kỳ để phòng tránh mất mát</li>
            </ul>
            <p class="text-orange-600 font-semibold">
              <Icon name="mdi:information" class="inline" /> 
              Lưu ý: Không có phương pháp truyền tải hoặc lưu trữ điện tử nào an toàn 100%. 
              Chúng tôi nỗ lực tối đa nhưng không thể đảm bảo tuyệt đối.
            </p>
          </div>
        </section>

        <!-- Section 5 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:account-key" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">5. Quyền của bạn</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li><strong>Quyền truy cập:</strong> Yêu cầu xem thông tin chúng tôi có về bạn</li>
              <li><strong>Quyền sửa đổi:</strong> Cập nhật hoặc chỉnh sửa thông tin không chính xác</li>
              <li><strong>Quyền xóa:</strong> Yêu cầu xóa thông tin của bạn (với một số ngoại lệ pháp lý)</li>
              <li><strong>Quyền hạn chế:</strong> Yêu cầu hạn chế xử lý thông tin trong một số trường hợp</li>
              <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý thông tin của bạn</li>
              <li><strong>Quyền chuyển dữ liệu:</strong> Nhận bản sao dữ liệu của bạn ở định dạng có cấu trúc</li>
            </ul>
            <p>
              Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email: 
              <a href="mailto:privacy@giaidauviet.com" class="text-orange-600 hover:text-orange-700 font-semibold">privacy@giaidauviet.com</a>
            </p>
          </div>
        </section>

        <!-- Section 6 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:cookie" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">6. Cookies và công nghệ theo dõi</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi sử dụng cookies và các công nghệ tương tự để:
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li>Ghi nhớ thông tin đăng nhập và tùy chọn của bạn</li>
              <li>Phân tích lưu lượng truy cập và cách sử dụng dịch vụ</li>
              <li>Cá nhân hóa nội dung và trải nghiệm</li>
            </ul>
            <p>
              Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt của mình. 
              Tuy nhiên, việc vô hiệu hóa cookies có thể ảnh hưởng đến một số tính năng của dịch vụ.
            </p>
          </div>
        </section>

        <!-- Section 7 -->
        <section class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:clock-time-four" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">7. Lưu trữ dữ liệu</h2>
          </div>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chúng tôi lưu trữ thông tin cá nhân của bạn chỉ trong thời gian cần thiết để:
            </p>
            <ul class="list-disc list-inside pl-4 space-y-2">
              <li>Cung cấp dịch vụ cho bạn</li>
              <li>Tuân thủ nghĩa vụ pháp lý</li>
              <li>Giải quyết tranh chấp</li>
              <li>Thực thi thỏa thuận của chúng tôi</li>
            </ul>
            <p>
              Khi bạn xóa tài khoản, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin cá nhân của bạn, 
              trừ khi chúng tôi cần giữ lại để tuân thủ pháp luật.
            </p>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="mb-10 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:email" class="text-white text-[24px]" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">8. Liên hệ</h2>
          </div>
          <div class="space-y-3 text-gray-700">
            <p>
              Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về Chính sách bảo mật này, vui lòng liên hệ:
            </p>
            <div class="flex items-center gap-2">
              <Icon name="mdi:email-outline" class="text-blue-600" />
              <span class="font-semibold">Email:</span>
              <a href="mailto:privacy@giaidauviet.com" class="text-blue-600 hover:text-blue-700">privacy@giaidauviet.com</a>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:phone-outline" class="text-blue-600" />
              <span class="font-semibold">Hotline:</span>
              <a href="tel:0123456789" class="text-blue-600 hover:text-blue-700">012-345-6789</a>
            </div>
            <div class="flex items-start gap-2">
              <Icon name="mdi:map-marker-outline" class="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <span class="font-semibold">Địa chỉ:</span>
                <span class="ml-1">123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer Note -->
        <div class="pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">
            Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian. 
            Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này. 
            Chúng tôi khuyến khích bạn xem lại chính sách này định kỳ.
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
  title: 'Chính sách bảo mật - Hệ thống Quản lý Giải đấu',
  meta: [
    { name: 'description', content: 'Chính sách bảo mật và xử lý dữ liệu cá nhân của Hệ thống Quản lý Giải đấu Bóng đá' }
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