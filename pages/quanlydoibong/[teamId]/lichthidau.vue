<template>
  <HeaderDoibong :stt="2">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <div v-else>
      <!-- Lặp qua từng giải đấu -->
      <div v-for="(tournament, index) in itemMatchTeam" :key="index" class="mb-12">
        <!-- Tên giải đấu -->
        <div class="mb-6 flex gap-3 md:gap-4 items-center mt-6 md:mt-8">
          <img
            class="w-10 h-10 md:w-14 md:h-14 object-contain"
            :src="tournament.tournamentLogo || '/img/imglg.png'"
            @error="$event.target.src='/img/imglg.png'"
            alt=""
          />
          <h3 class="font-bold text-xl md:text-2xl lg:text-3xl">{{ tournament.tournamentName }}</h3>
        </div>

        <!-- Desktop: Grid Layout -->
        <div
          v-for="(item, idx) in tournament.matches"
          :key="idx"
          class="hidden md:grid grid-cols-10 mb-[23px] lichThidau2 rounded-[10px]"
        >
          <div
            class="col-span-6 h-[100px] lichThidau flex justify-between items-center px-[53px] relative"
          >
            <!-- Team 1 -->
            <div class="flex items-center gap-3 w-[40%] justify-start">
              <img
                class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full team-logo"
                :src="item?.homeTeam?.logoUrl || '/img/imglg.png'"
                @error="$event.target.src='/img/imglg.png'"
                alt=""
              />

              <p class="font-semibold text-lg truncate">
                {{ item?.homeTeam?.name }}
              </p>
            </div>

            <!-- Score -->
            <div class="text-center font-bold text-xl w-[20%]">
              {{ item?.homeScore ?? "-" }} - {{ item?.awayScore ?? "-" }}
            </div>

            <!-- Team 2 -->
            <div class="flex items-center gap-3 w-[40%] justify-end">
              <p class="font-semibold text-lg truncate">
                {{ item?.awayTeam?.name }}
              </p>

              <img
                class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full team-logo"
                :src="item?.awayTeam?.logoUrl || '/img/imglg.png'"
                @error="$event.target.src='/img/imglg.png'"
                alt=""
              />
            </div>
            <div class="imgLichthidau">
              <img
                class="w-full h-full"
                src="../../../assets/img/lichthidau.png"
                alt=""
              />
            </div>
            <div class="pseudoLichthidau"></div>
          </div>

          <div
            class="col-span-4 h-[100px] lichThidau flex items-center justify-between pl-[40px] pr-[40px] relative"
          >
            <div>
              <div class="text-gray-700 font-medium">
                {{ item?.matchDateTime ?? "Chưa cập nhật" }}
              </div>
              <div class="text-gray-600 text-sm mt-1">
                {{ item?.stadiumName ?? "Đang cập nhật" }}
              </div>
              <div 
                class="startLichthidau flex justify-center items-center"
                :class="getStatusClass(item?.status)"
              >
                <p
                  style="color: rgba(255, 255, 255, 1)"
                  class="font-normal italic text-[14px]"
                >
                  {{ getStatusText(item?.status) }}
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <button
                @click="handleDetail(item.id)"
                class="hover:scale-110 transition-transform p-2 rounded-lg hover:bg-red-50"
                title="Xem chi tiết"
              >
                <Icon
                  name="hugeicons:eye"
                  width="24"
                  height="24"
                  style="color: #eb0428;"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile: Card Layout -->
        <div
          v-for="(item, idx) in tournament.matches"
          :key="`mobile-${idx}`"
          class="md:hidden mb-4 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
          <!-- Match Header -->
          <div class="relative bg-gradient-to-r from-orange-50 to-pink-50 p-4">
            <div 
              class="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
              :class="getStatusClass(item?.status)"
            >
              <span class="w-2 h-2 bg-white rounded-full" v-if="item?.status === 'LIVE'"></span>
              {{ getStatusText(item?.status) }}
            </div>
            
            <div class="flex items-center justify-between mt-6">
              <!-- Home Team -->
              <div class="flex flex-col items-center flex-1">
                <img
                  class="w-16 h-16 object-contain rounded-full border-2 border-white shadow-md mb-2"
                  :src="item?.homeTeam?.logoUrl || '/img/imglg.png'"
                  @error="$event.target.src='/img/imglg.png'"
                  alt=""
                />
                <p class="font-semibold text-sm text-center text-gray-900">
                  {{ item?.homeTeam?.name }}
                </p>
              </div>

              <!-- Score -->
              <div class="flex flex-col items-center px-4">
                <div class="text-3xl font-bold text-gray-900 mb-1">
                  {{ item?.homeScore ?? "-" }} <span class="text-gray-400">:</span> {{ item?.awayScore ?? "-" }}
                </div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">
                  Tỷ số
                </div>
              </div>

              <!-- Away Team -->
              <div class="flex flex-col items-center flex-1">
                <img
                  class="w-16 h-16 object-contain rounded-full border-2 border-white shadow-md mb-2"
                  :src="item?.awayTeam?.logoUrl || '/img/imglg.png'"
                  @error="$event.target.src='/img/imglg.png'"
                  alt=""
                />
                <p class="font-semibold text-sm text-center text-gray-900">
                  {{ item?.awayTeam?.name }}
                </p>
              </div>
            </div>
          </div>

          <!-- Match Info -->
          <div class="p-4 space-y-3">
            <div class="flex items-start gap-2">
              <Icon name="mdi:clock-outline" class="text-orange-500 text-[20px] flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-semibold text-gray-900">
                  {{ item?.matchDateTime ?? "Chưa cập nhật" }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-2">
              <Icon name="mdi:stadium" class="text-orange-500 text-[20px] flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-sm text-gray-600">
                  {{ item?.stadiumName ?? "Đang cập nhật" }}
                </p>
              </div>
            </div>

            <!-- Action Button -->
            <button
              @click="handleDetail(item.id)"
              class="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Icon name="mdi:eye" class="text-[20px]" />
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!itemMatchTeam || itemMatchTeam.length === 0" class="text-center py-20">
        <div class="inline-block w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="mdi:calendar-blank" class="text-gray-400 text-[48px]" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Chưa có lịch thi đấu</h3>
        <p class="text-gray-500 px-4">Đội bóng chưa tham gia giải đấu nào hoặc chưa có trận đấu được lên lịch</p>
      </div>

      <!-- Pagination -->
      <div v-if="itemMatchTeam && itemMatchTeam.length > 0" class="flex justify-center mt-12 mb-8">
        <div class="flex items-center gap-2 md:gap-3">
          <button
            @click="offset > 1 ? offset-- : null"
            :disabled="offset === 1"
            class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all"
            :class="offset === 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-orange-500 text-orange-500 hover:bg-orange-50'"
          >
            <Icon name="ci:chevron-left" width="20" height="20" class="md:w-6 md:h-6" />
          </button>

          <div class="flex gap-1 md:gap-2">
            <div
              v-for="page in displayPages"
              :key="page"
              @click="offset = page"
              class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-semibold cursor-pointer transition-all"
              :class="offset === page 
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300'"
            >
              {{ page }}
            </div>
          </div>

          <button
            @click="offset++"
            :disabled="!hasMorePages"
            class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all"
            :class="!hasMorePages 
              ? 'border-2 border-gray-300 text-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg'"
          >
            <Icon name="ci:chevron-right" width="20" height="20" class="md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      <!-- Page Info -->
      <div v-if="itemMatchTeam && itemMatchTeam.length > 0" class="text-center text-gray-600 text-sm mb-8">
        Trang {{ offset }} • Hiển thị {{ itemMatchTeam.length }} giải đấu
      </div>
    </div>
    
    <DetailLichThidau
      :openPopup="OpenPopup"
      :id="idMatch"
      @toggle="OpenPopup = false"
    />
  </HeaderDoibong>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, type Ref } from "vue";
import HeaderDoibong from "../../../component/detaildoibong/index.vue";
import DetailLichThidau from "../../../component/lichthidau/viewKqlichthidau/index.vue";
import { useMatchStore } from "../../../store/matchManger";

interface MatchTeam {
  tournamentName: string;
  tournamentLogo: string;
  matches: any[];
}

export default defineComponent({
  name: "TeamMatchList",
  components: { HeaderDoibong, DetailLichThidau },

  setup() {
    const MatchStore = useMatchStore();
    const OpenPopup: Ref<boolean> = ref(false);
    const idMatch: Ref<number | undefined> = ref();
    const route = useRoute();
    const isLoading = ref(true);
    const idParams = route.params.teamId;
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const hasMorePages = ref(true);
    
    watch(OpenPopup, (val) => {
      document.body.style.overflow = val ? "hidden" : "auto";
    });

    const itemMatchTeam: Ref<MatchTeam[]> = ref([]);

    // Computed for pagination display
    const displayPages = computed(() => {
      const pages = [];
      const maxDisplay = window.innerWidth < 768 ? 3 : 5; // 3 pages on mobile, 5 on desktop
      const start = Math.max(1, offset.value - Math.floor(maxDisplay / 2));
      const end = start + maxDisplay - 1;
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    onMounted(() => {
      fnGetMatchTeam();
    });

    watch(offset, (_new) => {
      if (_new) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fnGetMatchTeam();
      }
    });

    const fnGetMatchTeam = async () => {
      isLoading.value = true;
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const params = [
          idParams && `teamId=${idParams}`,
          limit && `limit=${limit}`,
          offset.value && `offset=${offset.value}`,
        ].filter(Boolean);
        const url = params.length > 0 ? `?${params.join("&")}` : "";
        
        const [res] = await Promise.all([
          MatchStore.fnGetMatchNewEst(idParams, url),
          delay
        ]);
        
        const dataArray = Array.isArray(res) ? res : (res ? [res] : []);
        itemMatchTeam.value = dataArray;
        
        // Check if there are more pages (if we got less than limit, no more pages)
        hasMorePages.value = dataArray.length >= limit;
      } catch (err) {
        console.error('Error loading matches:', err);
        itemMatchTeam.value = [];
        hasMorePages.value = false;
      } finally {
        isLoading.value = false;
      }
    };

    const handleDetail = (itemId: any) => {
      OpenPopup.value = true;
      idMatch.value = itemId;
    };

    const getStatusText = (status: string) => {
      const statusMap: Record<string, string> = {
        'SCHEDULED': 'Sắp diễn ra',
        'LIVE': 'Đang diễn ra',
        'COMPLETED': 'Đã kết thúc',
        'POSTPONED': 'Hoãn lại',
        'CANCELLED': 'Hủy bỏ',
      };
      return statusMap[status] || 'Sắp diễn ra';
    };

    const getStatusClass = (status: string) => {
      const classMap: Record<string, string> = {
        'SCHEDULED': 'bg-blue-500',
        'LIVE': 'bg-red-500 animate-pulse',
        'COMPLETED': 'bg-green-500',
        'POSTPONED': 'bg-yellow-500',
        'CANCELLED': 'bg-gray-500',
      };
      return classMap[status] || 'bg-green-500';
    };

    return {
      idMatch,
      OpenPopup,
      handleDetail,
      itemMatchTeam,
      fnGetMatchTeam,
      isLoading,
      offset,
      getStatusText,
      getStatusClass,
      displayPages,
      hasMorePages,
    };
  },
});
</script>

<style scoped>
.bangxephang {
  border: 1px solid var(--textsport);
}
.rowHover:hover {
  color: var(--textsport);
}
.imgLichthidau {
  width: 151px;
  height: 38px;
  position: absolute;
  top: -10px;
  left: 40%;
  z-index: 2;
}
.pseudoLichthidau {
  position: absolute;
  top: -10px;
  left: 39%;
  width: 165px;
  height: 10px;
  opacity: 1;
  border-top-left-radius: 8.5px;
  border-top-right-radius: 8.5px;
  background: linear-gradient(90deg, #ad4847 0%, #ae2093 100%);
  z-index: 1;
}
.startLichthidau {
  position: absolute;
  top: 0;
  right: 0;
  width: 97px;
  height: 30px;
  opacity: 1;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.bg-blue-500 {
  background: rgba(59, 130, 246, 1);
}
.bg-red-500 {
  background: rgba(239, 68, 68, 1);
}
.bg-green-500 {
  background: rgba(4, 184, 10, 1);
}
.bg-yellow-500 {
  background: rgba(234, 179, 8, 1);
}
.bg-gray-500 {
  background: rgba(107, 114, 128, 1);
}
.team-logo {
  border: 2px solid white;
  transition: border-color 0.2s ease;
}

.team-logo:hover {
  border-color: rgb(241, 206, 206);
}
.lichThidau2:hover {
  box-shadow: 0px 4px 15px rgb(241, 206, 206);
}
</style>