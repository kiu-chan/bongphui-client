<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Xem chi tiết kết quả trận đấu'"
    @toggle="handleTongle()"
  >
    <!-- Header - Responsive -->
    <div class="flex justify-center flex-col items-center px-4">
      <h3 class="text-base md:text-lg font-extrabold text-center">
        GIẢI BÓNG ĐÁ SINH VIÊN VĂN PHÒNG LẦN III NĂM 2025
      </h3>
      <h2 class="text-lg md:text-xl font-black mt-[20px] md:mt-[30px]">KẾT QUẢ TRẬN ĐẤU</h2>
      <p class="text-sm md:text-base font-medium mt-[10px]">{{ formatMatchDateTime(matchDateTime) }}</p>
    </div>

    <!-- Teams & Score - Responsive -->
    <div class="px-4 md:px-18 flex justify-center items-center mt-[20px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[70px] w-full max-w-4xl">
        <!-- Home Team -->
        <div class="flex flex-col items-center gap-3 md:gap-4">
          <img
            class="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-contain rounded-full border-4 border-gray-200"
            loading="lazy"
            :src="getTeamLogo(logoHome, parentHomeTeamLogo)"
            @error="handleImageError($event, 'home')"
            alt="Home Team Logo"
          />
          <h2 class="text-base md:text-lg font-extrabold text-center">{{ homeName }}</h2>
        </div>

        <!-- Score -->
        <div class="flex justify-center items-center text-6xl md:text-8xl font-semibold my-4 md:my-0">
          <p>{{ homeScore ?? '-' }}</p>
          <p class="mx-2 md:mx-4">-</p>
          <p>{{ awayScore ?? '-' }}</p>
        </div>

        <!-- Away Team -->
        <div class="flex flex-col items-center gap-3 md:gap-4">
          <img
            class="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-contain rounded-full border-4 border-gray-200"
            loading="lazy"
            :src="getTeamLogo(logoAway, parentAwayTeamLogo)"
            @error="handleImageError($event, 'away')"
            alt="Away Team Logo"
          />
          <h2 class="text-base md:text-lg font-extrabold text-center">{{ awayName }}</h2>
        </div>
      </div>
    </div>

    <!-- Players Highlights - Responsive -->
    <div class="p-3 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      <!-- Home Team Players -->
      <div class="col-span-1">
        <h3 class="font-bold text-center mb-3 md:hidden">{{ homeName }}</h3>
        <div v-if="player1.length === 0" class="text-center text-gray-500 italic py-4">
          Chưa có thông tin
        </div>
        <div v-else v-for="(item, index) in player1" :key="index" class="mb-2">
          <div class="flex justify-end gap-2 md:gap-3 items-center">
            <div class="text-right">
              <div class="flex items-center gap-1 justify-end">
                <span class="font-medium text-sm md:text-base">{{ item.playerName }}</span>
                <span v-if="item.title === 'Yellow'" class="text-xl">🟨</span>
                <span v-else-if="item.title === 'Red'" class="text-xl">🟥</span>
                <span v-else-if="item.title === 'Goal'" class="text-xl">⚽</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Away Team Players -->
      <div class="col-span-1">
        <h3 class="font-bold text-center mb-3 md:hidden">{{ awayName }}</h3>
        <div v-if="player2.length === 0" class="text-center text-gray-500 italic py-4">
          Chưa có thông tin
        </div>
        <div v-else class="flex justify-start">
          <div class="col-span-1 w-full">
            <div v-for="(item, index) in player2" :key="index" class="mb-2">
              <div class="flex justify-start gap-2 md:gap-4 items-center">
                <div class="text-left">
                  <div class="flex items-center gap-1">
                    <span v-if="item.title === 'Yellow'" class="text-xl">🟨</span>
                    <span v-else-if="item.title === 'Red'" class="text-xl">🟥</span>
                    <span v-else-if="item.title === 'Goal'" class="text-xl">⚽</span>
                    <span class="font-medium text-sm md:text-base">{{ item.playerName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popUpFull>
</template>

<script lang="ts">
import popUpFull from "../../library/popupFull/index.vue";
import { useMatchStore } from "../../../store/matchManger";

interface Player {
  highlightId: number;
  matchId: number;
  minute_given: string;
  playerId: number;
  playerName: string;
  teamName: string;
  title: string;
}

export default defineComponent({
  components: {
    popUpFull,
  },
  props: {
    openPopup: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    // Nhận logo từ parent component (trang lichthidau.vue)
    parentHomeTeamLogo: {
      type: String,
      default: "",
    },
    parentAwayTeamLogo: {
      type: String,
      default: "",
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, id, parentHomeTeamLogo, parentAwayTeamLogo } = toRefs(props);
    const MatchStore = useMatchStore();
    const homeScore: Ref<number | undefined> = ref();
    const awayScore: Ref<number | undefined> = ref();
    const logoHome: Ref<string> = ref("");
    const logoAway: Ref<string> = ref("");
    const matchDateTime: Ref<string> = ref("");
    const player1: Ref<Array<Player>> = ref([]);
    const player2: Ref<Array<Player>> = ref([]);
    const awayName: Ref<string> = ref("");
    const homeName: Ref<string> = ref("");
    const defaultLogo = "/img/imglg.png";

    watch(openPopup, (_new) => {
      if (_new) {
        fnGetPlayer();
      }
    });

    const handleTongle = () => {
      player1.value = [];
      player2.value = [];
      ctx.emit("toggle");
    };

    const fnGetPlayer = () => {
      MatchStore.fnMatchDetail(id.value)
        .then((res: any) => {
          awayScore.value = res.awayScore;
          homeScore.value = res.homeScore;
          matchDateTime.value = res.matchDateTime;
          homeName.value = res.homeTeam.name;
          awayName.value = res.awayTeam.name;
          // Sử dụng logo từ API detail
          logoHome.value = res.homeTeam.logoUrl || "";
          logoAway.value = res.awayTeam.logoUrl || "";
          
          res.highlights.forEach((h: Player) => {
            if (h.teamName === homeName.value) {
              player1.value.push(h);
            } else if (h.teamName === awayName.value) {
              player2.value.push(h);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Logic ưu tiên: API detail -> Parent logo -> Default
    const getTeamLogo = (apiLogo: string, parentLogo: string) => {
      // 1. Ưu tiên logo từ API detail
      if (apiLogo && apiLogo.trim() !== "") {
        return apiLogo;
      }
      // 2. Nếu không có, dùng logo từ parent (trang lichthidau)
      if (parentLogo && parentLogo.trim() !== "") {
        return parentLogo;
      }
      // 3. Cuối cùng dùng logo mặc định
      return defaultLogo;
    };

    // Xử lý khi ảnh bị lỗi
    const handleImageError = (event: Event, team: 'home' | 'away') => {
      const img = event.target as HTMLImageElement;
      const currentSrc = img.src;
      
      // Nếu đang hiển thị logo từ API và bị lỗi
      if (team === 'home' && currentSrc === logoHome.value) {
        // Thử logo từ parent
        if (parentHomeTeamLogo.value && parentHomeTeamLogo.value.trim() !== "") {
          img.src = parentHomeTeamLogo.value;
          return;
        }
      } else if (team === 'away' && currentSrc === logoAway.value) {
        // Thử logo từ parent
        if (parentAwayTeamLogo.value && parentAwayTeamLogo.value.trim() !== "") {
          img.src = parentAwayTeamLogo.value;
          return;
        }
      }
      
      // Cuối cùng dùng logo mặc định
      img.src = defaultLogo;
    };

    const formatMatchDateTime = (dateTime?: string) => {
      if (!dateTime) return "-";
      try {
        return new Date(dateTime).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return dateTime;
      }
    };

    return {
      logoHome,
      logoAway,
      homeScore,
      awayScore,
      matchDateTime,
      homeName,
      awayName,
      player1,
      player2,
      parentHomeTeamLogo,
      parentAwayTeamLogo,
      handleTongle,
      formatMatchDateTime,
      getTeamLogo,
      handleImageError,
    };
  },
});
</script>

<style scoped>
/* Mobile adjustments */
@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
}
</style>