<template>
  <div class="background-taodoibong min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
    <div class="container mx-auto px-4 py-6 max-w-6xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <NuxtLink to="/doibong">
          <button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
            <Icon name="mdi:arrow-left" class="text-[20px] text-gray-700" />
            <span class="font-medium text-gray-700 hidden sm:inline">Quay lại</span>
          </button>
        </NuxtLink>
        
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 flex-1 text-center">
          Tạo đội bóng mới
        </h1>

        <button class="w-10 h-10 rounded-lg bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center">
          <Icon name="mdi:cog" class="text-[20px] text-gray-700" />
        </button>
      </div>

      <!-- Hero Banner -->
      <div class="hero-banner relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
        <img class="h-full w-full object-cover" :src="hereWego" alt="Team banner" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div class="logo-section absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <InputImage 
            :width="windowWidth < 640 ? 100 : 140" 
            :height="windowWidth < 640 ? 100 : 140" 
            @image="handleImage" 
            class="flex-shrink-0"
          />
          <h2 class="text-white font-bold text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">
            {{ displayName }}
          </h2>
        </div>
      </div>

      <!-- Form -->
      <div class="form-container bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Icon name="mdi:information" class="text-orange-500" />
          Thông tin đội bóng
        </h3>

        <div class="space-y-4">
          <!-- Tên đội -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:shield-star" class="inline text-orange-500" /> Tên đội bóng <span class="text-red-500">*</span>
            </label>
            <InputForm
              v-model="name"
              :name="''"
              :placeHolder="'Nhập tên đội bóng'"
            />
          </div>

          <!-- Năm thành lập - DROPDOWN với border rõ ràng -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:calendar" class="inline text-orange-500" /> Năm thành lập
            </label>
            <div class="relative">
              <select 
                v-model="date" 
                class="dropdown-select w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all appearance-none cursor-pointer"
                :class="date ? 'border-orange-300 text-gray-900' : 'border-gray-300 text-gray-500'"
              >
                <option :value="undefined" disabled>Chọn năm thành lập</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
              <Icon name="mdi:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:at" class="inline text-orange-500" /> Username
            </label>
            <InputForm
              v-model="username"
              :name="''"
              :placeHolder="'@username'"
            />
          </div>

          <!-- Giới thiệu -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:text" class="inline text-orange-500" /> Giới thiệu
            </label>
            <inputArea v-model="description" :name="''" />
          </div>
        </div>

        <!-- Thông tin HLV -->
        <h3 class="text-xl font-bold text-gray-800 mt-8 mb-6 flex items-center gap-2">
          <Icon name="mdi:whistle" class="text-orange-500" />
          Thông tin huấn luyện viên
        </h3>

        <div class="space-y-4">
          <!-- Tên HLV -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:account" class="inline text-orange-500" /> Tên HLV
            </label>
            <InputForm
              v-model="nameCoach"
              :name="''"
              :placeHolder="'Nhập tên huấn luyện viên'"
            />
          </div>

          <!-- Quốc tịch - DROPDOWN với border rõ ràng -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:flag" class="inline text-orange-500" /> Quốc tịch
            </label>
            <div class="relative">
              <select 
                v-model="nationality" 
                class="dropdown-select w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all appearance-none cursor-pointer"
                :class="nationality ? 'border-orange-300 text-gray-900' : 'border-gray-300 text-gray-500'"
              >
                <option value="" disabled>Chọn quốc tịch</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
              <Icon name="mdi:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <!-- Grid 2 columns on desktop, 1 on mobile -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Ngày sinh -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <Icon name="mdi:cake-variant" class="inline text-orange-500" /> Ngày sinh
              </label>
              <DatePicker v-model="birthdate" :name="''" />
            </div>

            <!-- CCCD -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <Icon name="mdi:card-account-details" class="inline text-orange-500" /> CCCD
              </label>
              <InputForm
                v-model="cccd"
                :name="''"
                :placeHolder="'Nhập số CCCD'"
              />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button
            @click="handelTeamadd"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon v-if="isSubmitting" name="mdi:loading" class="animate-spin inline" />
            {{ isSubmitting ? 'Đang xử lý...' : 'Tạo đội bóng' }}
          </button>

          <button
            @click="fnReset"
            type="button"
            class="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-50 transition-all"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import hereWego from "../../assets/img/hereWeGo.png";
import InputForm from "../../component/library/input/index.vue";
import DatePicker from "../../component/library/DatePicker/index.vue";
import inputArea from "../../component/library/inputArea/index.vue";
import InputImage from "../../component/library/InputImage/index.vue";
import { useTeamStore } from "../../store/team";
import { useImportStore } from "../../store/import";

export default defineComponent({
  components: {
    InputForm,
    DatePicker,
    inputArea,
    InputImage,
  },
  setup() {
    const TeamStore = useTeamStore();
    const toast = useToast();
    const ImportStore = useImportStore();
    const formData = new FormData();
    
    const logoId: Ref<number> = ref(0);
    const name: Ref<string> = ref("");
    const username: Ref<string> = ref("");
    const date: Ref<number | undefined> = ref();
    const nameCoach: Ref<string> = ref("");
    const nationality: Ref<string> = ref("");
    const cccd: Ref<string> = ref("");
    const birthdate: Ref<string> = ref("");
    const description: Ref<string> = ref("");
    const isSubmitting = ref(false);
    const windowWidth = ref(0);

    // Computed property để hiển thị tên đội real-time
    const displayName = computed(() => {
      return name.value.trim() || 'Tên đội bóng';
    });

    // Generate years from current year back to 1900
    const currentYear = new Date().getFullYear();
    const years = computed(() => {
      const yearList = [];
      for (let year = currentYear; year >= 1900; year--) {
        yearList.push(year);
      }
      return yearList;
    });

    // List of countries
    const countries = [
      'Việt Nam',
      'Thái Lan',
      'Indonesia',
      'Malaysia',
      'Singapore',
      'Philippines',
      'Myanmar',
      'Campuchia',
      'Lào',
      'Brunei',
      'Hàn Quốc',
      'Nhật Bản',
      'Trung Quốc',
      'Đài Loan',
      'Úc',
      'New Zealand',
      'Ấn Độ',
      'Pakistan',
      'Bangladesh',
      'Sri Lanka',
      'Anh',
      'Đức',
      'Pháp',
      'Tây Ban Nha',
      'Ý',
      'Hà Lan',
      'Bồ Đào Nha',
      'Bỉ',
      'Thụy Sĩ',
      'Áo',
      'Ba Lan',
      'Séc',
      'Hungary',
      'Romania',
      'Nga',
      'Mỹ',
      'Canada',
      'Mexico',
      'Brazil',
      'Argentina',
      'Uruguay',
      'Chile',
      'Colombia',
      'Peru',
      'Venezuela',
      'Nam Phi',
      'Nigeria',
      'Ai Cập',
      'Morocco',
      'Ghana',
      'Khác',
    ];

    onMounted(() => {
      windowWidth.value = window.innerWidth;
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
      });
    });

    const handleImage = (file: File) => {
      formData.append("file", file);
    };

    const fnAddImg = () => {
      const params = new URLSearchParams({
        imageType: "4",
      });
      if (logoId.value) {
        params.append("imageId", logoId.value.toString());
      }
      const url = `?${params.toString()}`;
      ImportStore.fnAddImportLogoTeam(url, formData);
    };

    const handelTeamadd = () => {
      // Validation
      if (!name.value.trim()) {
        toast.error({
          message: "Vui lòng nhập tên đội bóng",
          position: "topRight",
        });
        return;
      }

      isSubmitting.value = true;

      const payload = {
        name: name.value,
        logoUrl: "mandan/img",
        username: username.value,
        foundedYear: date.value,
        homeStadium: "Hoàng mai",
        description: description.value,
        coach: {
          cccd: cccd.value,
          birthdate: birthdate.value,
          nationality: nationality.value,
          name: nameCoach.value,
        },
        tournaments: [],
        players: [],
      };

      TeamStore.fnAddTeam(payload)
        .then((res: any) => {
          if (res.teamId) {
            logoId.value = res.teamId;
            fnAddImg();
            fnReset();
            toast.success({
              message: "Tạo đội bóng thành công!",
              position: "topRight",
            });
          }
        })
        .catch((err) => {
          console.error('Add team error:', err);
          toast.error({
            message: err?.message || "Tạo đội bóng thất bại. Vui lòng thử lại!",
            position: "topRight",
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    };

    const fnReset = () => {
      name.value = "";
      username.value = "";
      date.value = undefined;
      description.value = "";
      nameCoach.value = "";
      cccd.value = "";
      birthdate.value = "";
      nationality.value = "";
    };

    return {
      hereWego,
      name,
      username,
      date,
      description,
      cccd,
      birthdate,
      nationality,
      nameCoach,
      handleImage,
      handelTeamadd,
      fnReset,
      isSubmitting,
      years,
      countries,
      windowWidth,
      displayName,
    };
  },
});
</script>

<style scoped>
.hero-banner {
  position: relative;
}

.logo-section {
  z-index: 10;
}

.form-container {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced dropdown styling */
.dropdown-select {
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dropdown-select:hover {
  border-color: #fb923c;
  box-shadow: 0 2px 6px rgba(251, 146, 60, 0.15);
}

.dropdown-select:focus {
  box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
}

/* Custom scrollbar for dropdowns */
.dropdown-select {
  scrollbar-width: thin;
  scrollbar-color: #f97316 #f1f1f1;
}

.dropdown-select::-webkit-scrollbar {
  width: 10px;
}

.dropdown-select::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.dropdown-select::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 10px;
  border: 2px solid #f1f1f1;
}

.dropdown-select::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}

/* Option styling */
.dropdown-select option {
  padding: 12px;
  font-weight: 500;
}

.dropdown-select option:checked {
  background: linear-gradient(90deg, #f97316 0%, #ec4899 100%);
  color: white;
}
</style>