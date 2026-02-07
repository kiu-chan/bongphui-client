<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto px-4 md:px-6 pt-[30px] md:pt-[50px] pb-12">
            <!-- Header -->
            <div class="text-center mb-8 md:mb-12">
              <h1 class="font-bold text-[32px] md:text-[45px] text-gray-800 mb-3">
                Liên hệ với chúng tôi
              </h1>
              <p class="text-[16px] md:text-[20px] text-gray-600">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <!-- Thông tin liên hệ -->
              <div class="space-y-6">
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-800 mb-6">
                    Thông tin liên hệ
                  </h2>
                  
                  <!-- Địa chỉ -->
                  <div class="flex items-start gap-4 mb-6">
                    <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-3 rounded-lg flex-shrink-0">
                      <Icon name="mdi:map-marker" class="text-white text-[24px]" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-[18px] text-gray-800 mb-1">Địa chỉ</h3>
                      <p class="text-gray-600 text-[15px] leading-relaxed">
                        Tầng 6, Tòa nhà Web3 Tower<br />
                        Phố Duy Tân, Cầu Giấy, Hà Nội
                      </p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex items-start gap-4 mb-6">
                    <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-3 rounded-lg flex-shrink-0">
                      <Icon name="mdi:email" class="text-white text-[24px]" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-[18px] text-gray-800 mb-1">Email</h3>
                      <a href="mailto:contact@giaidauviet.vn" class="text-orange-500 hover:text-orange-600 text-[15px] transition-colors">
                        contact@giaidauviet.vn
                      </a>
                    </div>
                  </div>

                  <!-- Điện thoại -->
                  <div class="flex items-start gap-4 mb-6">
                    <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-3 rounded-lg flex-shrink-0">
                      <Icon name="mdi:phone" class="text-white text-[24px]" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-[18px] text-gray-800 mb-1">Điện thoại</h3>
                      <a href="tel:0352999999" class="text-orange-500 hover:text-orange-600 text-[15px] transition-colors">
                        0352.999.999
                      </a>
                    </div>
                  </div>

                  <!-- Giờ làm việc -->
                  <div class="flex items-start gap-4">
                    <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-3 rounded-lg flex-shrink-0">
                      <Icon name="mdi:clock-outline" class="text-white text-[24px]" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-[18px] text-gray-800 mb-1">Giờ làm việc</h3>
                      <p class="text-gray-600 text-[15px] leading-relaxed">
                        Thứ 2 - Thứ 6: 8:00 - 17:00<br />
                        Thứ 7: 8:00 - 12:00<br />
                        Chủ nhật: Nghỉ
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Mạng xã hội -->
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-800 mb-6">
                    Theo dõi chúng tôi
                  </h2>
                  <div class="flex gap-4 flex-wrap">
                    <a href="#" class="social-icon">
                      <Icon name="hugeicons:facebook-02" class="text-[24px]" />
                    </a>
                    <a href="#" class="social-icon">
                      <Icon name="hugeicons:twitter" class="text-[24px]" />
                    </a>
                    <a href="#" class="social-icon">
                      <Icon name="hugeicons:youtube" class="text-[24px]" />
                    </a>
                    <a href="#" class="social-icon">
                      <Icon name="hugeicons:messenger" class="text-[24px]" />
                    </a>
                  </div>
                </div>
              </div>

              <!-- Form liên hệ -->
              <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 class="text-[24px] md:text-[28px] font-semibold text-gray-800 mb-6">
                  Gửi tin nhắn
                </h2>

                <form @submit.prevent="handleSubmit" class="space-y-5">
                  <!-- Họ tên -->
                  <div>
                    <label class="block text-gray-700 font-medium mb-2 text-[15px]">
                      Họ và tên <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="formData.name"
                      type="text"
                      required
                      placeholder="Nhập họ và tên của bạn"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-gray-700 font-medium mb-2 text-[15px]">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="formData.email"
                      type="email"
                      required
                      placeholder="email@example.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <!-- Số điện thoại -->
                  <div>
                    <label class="block text-gray-700 font-medium mb-2 text-[15px]">
                      Số điện thoại
                    </label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      placeholder="0123456789"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <!-- Chủ đề -->
                  <div>
                    <label class="block text-gray-700 font-medium mb-2 text-[15px]">
                      Chủ đề <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="formData.subject"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="support">Hỗ trợ kỹ thuật</option>
                      <option value="tournament">Tổ chức giải đấu</option>
                      <option value="partnership">Hợp tác kinh doanh</option>
                      <option value="feedback">Góp ý, phản hồi</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <!-- Nội dung -->
                  <div>
                    <label class="block text-gray-700 font-medium mb-2 text-[15px]">
                      Nội dung <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      v-model="formData.message"
                      required
                      rows="5"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  <!-- Nút gửi -->
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white font-semibold py-4 rounded-lg hover:from-orange-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <span v-if="!isSubmitting">Gửi tin nhắn</span>
                    <span v-else class="flex items-center justify-center gap-2">
                      <Icon name="mdi:loading" class="animate-spin text-[20px]" />
                      Đang gửi...
                    </span>
                  </button>
                </form>

                <!-- Thông báo thành công -->
                <Transition
                  enter-active-class="transition-all duration-300"
                  enter-from-class="opacity-0 translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-300"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-2"
                >
                  <div v-if="showSuccess" class="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <div class="flex items-center gap-2">
                      <Icon name="mdi:check-circle" class="text-[20px]" />
                      <span class="font-medium">Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.</span>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Bản đồ -->
            <div class="mt-12">
              <h2 class="text-[28px] md:text-[36px] font-semibold text-gray-800 mb-6 text-center">
                Vị trí của chúng tôi
              </h2>
              <div class="bg-white rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949144571!2d105.78252631533395!3d21.028510193114805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd0c66f05%3A0xea31563511af2e54!2zRHV5IFTDom4sIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                  width="100%"
                  height="400"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  class="w-full h-[300px] md:h-[400px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import SliderBanner from "../../component/library/sliderBanner/index.vue";

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Giả lập gửi form (thay bằng API thực tế)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  isSubmitting.value = false;
  showSuccess.value = true;
  
  // Ẩn thông báo sau 5 giây
  setTimeout(() => {
    showSuccess.value = false;
  }, 5000);
};
</script>

<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 1);
}

.bg2 {
  background: linear-gradient(
    180deg,
    rgba(232, 243, 248, 1) 0%,
    rgba(255, 255, 255, 1) 99.98%
  );
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(180deg, #f48637 0%, #ee3449 100%);
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 16px rgba(244, 134, 55, 0.3);
}

@media (max-width: 768px) {
  .bg {
    border-radius: 20px;
  }
  
  .bg2 {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>