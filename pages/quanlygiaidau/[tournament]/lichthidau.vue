<template>
  <TournamentHeader :stt="3">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <div v-else>
      <!-- Empty state when no matches -->
      <div v-if="!listDataLeague || listDataLeague.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="mb-4">
          <Icon name="mdi:calendar-clock" class="text-gray-300" width="80" height="80" />
        </div>
        <h3 class="text-xl font-medium text-gray-600 mb-2">Chưa có lịch thi đấu</h3>
        <p class="text-gray-500">Lịch thi đấu sẽ được cập nhật sau khi chia bảng đấu</p>
      </div>

      <!-- Lặp qua từng vòng -->
      <div v-else v-for="(round, index) in listDataLeague" :key="index" class="mb-8">
        <!-- Tên vòng -->
        <div class="text-center font-medium text-2xl md:text-3xl my-6 md:my-8">
          {{ round.roundName.toUpperCase() }}
        </div>

        <!-- Danh sách trận trong vòng -->
        <div
          v-for="(item, idx) in round.matches"
          :key="idx"
        >
          <!-- Desktop view - Giữ nguyên cách hiển thị cũ -->
          <div class="hidden md:block">
            <div class="grid grid-cols-10 mb-[23px] lichThidau2 rounded-[10px]">
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
                <div
                  @click="handleUpdate(item)"
                  class="text-center font-bold text-xl w-[20%] cursor-pointer"
                >
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
                  <div>
                    {{ item?.matchDateTime ?? "Chưa cập nhật" }},
                    {{ item?.stadiumName ?? "Đang cập nhật" }}
                  </div>
                  <div class="startLichthidau flex justify-center items-center">
                    <p
                      style="color: rgba(255, 255, 255, 1)"
                      class="font-normal italic text-[14px]"
                    >
                      Sắp diễn ra
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <Icon
                    @click="handleUpdate(item)"
                    name="hugeicons:pencil-edit-02"
                    width="24"
                    height="24"
                    style="color: #eb0428; cursor: pointer;"
                    class="hover:scale-110 transition-transform"
                  />
                  <Icon
                    @click="handleDetail(item)"
                    name="hugeicons:eye"
                    width="24"
                    height="24"
                    style="color: #eb0428; cursor: pointer;"
                    class="hover:scale-110 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile view - Giống LatestMatches.vue -->
          <div class="md:hidden match-card-mobile rounded-xl relative overflow-visible mb-4">
            <!-- ribbon top center -->
            <div class="imgLichthidau-mobile" aria-hidden="true">
              <img class="ribbon-img-mobile" src="../../../assets/img/lichthidau.png" alt="lich" />
              <div class="lichTime-mobile">{{ formatTime(item?.matchDateTime) }}</div>
              <div class="pseudoLichthidau-mobile" aria-hidden="true"></div>
            </div>

            <!-- content: logos left/right with names, score centered -->
            <div class="mobile-content px-4 pt-10 pb-6">
              <div class="flex items-center justify-between">
                <!-- left team -->
                <div class="flex flex-col items-center w-1/3 min-w-0">
                  <img 
                    class="team-logo-mobile" 
                    :src="item?.homeTeam?.logoUrl || '/img/imglg.png'" 
                    :alt="item?.homeTeam?.name" 
                    @error="$event.target.src = '/img/imglg.png'" 
                  />
                  <p class="team-name-mobile mt-2 text-center truncate">{{ item?.homeTeam?.name }}</p>
                </div>

                <!-- score -->
                <div class="flex flex-col items-center w-1/3">
                  <div class="score-mobile" :style="{ color: getScoreColor(item) }">
                    {{ displayScore(item) }}
                  </div>
                  <div 
                    class="status-badge-mobile mt-3" 
                    :class="{'status-done': isMatchDone(item)}"
                  >
                    <span>{{ getStatusText(item) }}</span>
                  </div>
                </div>

                <!-- right team -->
                <div class="flex flex-col items-center w-1/3 min-w-0">
                  <img 
                    class="team-logo-mobile" 
                    :src="item?.awayTeam?.logoUrl || '/img/imglg.png'" 
                    :alt="item?.awayTeam?.name" 
                    @error="$event.target.src = '/img/imglg.png'" 
                  />
                  <p class="team-name-mobile mt-2 text-center truncate">{{ item?.awayTeam?.name }}</p>
                </div>
              </div>

              <!-- meta row -->
              <div class="match-meta-mobile mt-4 flex items-center justify-center gap-2 text-center">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12A9 9 0 113 12a9 9 0 0118 0z"></path>
                </svg>
                <div class="text-meta-mobile">
                  {{ formatMatchDateTime(item?.matchDateTime) }}, {{ item?.stadiumName ?? "Đang cập nhật" }}
                </div>
              </div>

              <!-- Action buttons for mobile -->
              <div class="flex gap-3 justify-center mt-4">
                <Icon
                  @click="handleUpdate(item)"
                  name="hugeicons:pencil-edit-02"
                  width="24"
                  height="24"
                  style="color: #eb0428; cursor: pointer;"
                  class="hover:scale-110 transition-transform"
                />
                <Icon
                  @click="handleDetail(item)"
                  name="hugeicons:eye"
                  width="24"
                  height="24"
                  style="color: #eb0428; cursor: pointer;"
                  class="hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <DetailLichThidau
      :openPopup="OpenPopup"
      :id="idMatch"
      :parentHomeTeamLogo="currentMatchHomeTeamLogo"
      :parentAwayTeamLogo="currentMatchAwayTeamLogo"
      @toggle="OpenPopup = false"
    />
    <UpdateLichThidau
      :openPopup="OpenUpdate"
      :StatusMatch="StatusMatch"
      @toggle="OpenUpdate = false"
      @success="fnGetListMatchesSchedule()"
    />
  </TournamentHeader>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
import DetailLichThidau from "../../../component/lichthidau/viewKqlichthidau/index.vue";
import UpdateLichThidau from "../../../component/lichthidau/updatelkqlichthidau/index.vue";
import { useMatchStore } from "../../../store/matchManger";

interface statusMatch {
  id: number;
  awayTeam: string;
  homeTeam: string;
}

export default defineComponent({
  name: "LeagueMatchList",
  components: { TournamentHeader, DetailLichThidau, UpdateLichThidau },

  setup() {
    const MatchStore = useMatchStore();
    const OpenPopup: Ref<boolean> = ref(false);
    const OpenUpdate: Ref<boolean> = ref(false);
    const StatusMatch: Ref<statusMatch | undefined> = ref();
    const idMatch: Ref<number | undefined> = ref();
    const route = useRoute();
    const isLoading = ref(true);
    
    // Thêm refs để lưu logo của trận đang xem
    const currentMatchHomeTeamLogo = ref<string>("");
    const currentMatchAwayTeamLogo = ref<string>("");
    
    watch(OpenPopup, (val) => {
      document.body.style.overflow = val ? "hidden" : "auto";
    });
    
    const idParams = (route.params.tournament ?? "") as string;
    
    onMounted(() => {
      fnGetListMatchesSchedule();
    });
    
    const listDataLeague: Ref<any[]> = ref([]);
    
    const fnGetListMatchesSchedule = async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const [res] = await Promise.all([
          MatchStore.fnGetMatchSchedule(idParams),
          delay
        ]);
        
        const sortedListDataLeague = Object.keys(res)
          .map((roundName) => ({
            roundName,
            matches: res[roundName],
          }))
          .sort((a, b) => {
            const numA = parseInt(a.roundName.replace(/\D/g, ""));
            const numB = parseInt(b.roundName.replace(/\D/g, ""));
            return numA - numB;
          });

        listDataLeague.value = sortedListDataLeague;
      } catch (err) {
        console.log(err);
      } finally {
        isLoading.value = false;
      }
    };
    
    const handleUpdate = (item: any) => {
      OpenUpdate.value = true;
      StatusMatch.value = {
        id: item.id,
        awayTeam: item.awayTeam?.name ?? "",
        homeTeam: item.homeTeam?.name ?? "",
      };
    };
    
    const handleDetail = (item: any) => {
      OpenPopup.value = true;
      idMatch.value = item.id;
      
      // Lưu logo từ danh sách trận đấu
      currentMatchHomeTeamLogo.value = item?.homeTeam?.logoUrl || "";
      currentMatchAwayTeamLogo.value = item?.awayTeam?.logoUrl || "";
    };

    // Helper functions for mobile view
    const formatTime = (matchDateTime?: string) => {
      if (!matchDateTime) return "--:--";
      try {
        const d = new Date(matchDateTime);
        const hh = d.getHours().toString().padStart(2, "0");
        const mm = d.getMinutes().toString().padStart(2, "0");
        return `${hh}:${mm}`;
      } catch {
        return "--:--";
      }
    };

    const formatMatchDateTime = (matchDateTime?: string) => {
      if (!matchDateTime) return "-";
      return new Date(matchDateTime).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const displayScore = (match: any) => {
      const hs = typeof match.homeScore === "number" ? match.homeScore : null;
      const as = typeof match.awayScore === "number" ? match.awayScore : null;
      if (hs === null && as === null) return "- : -";
      return `${hs ?? "-"} : ${as ?? "-"}`;
    };

    const getScoreColor = (match: any) => {
      const hs = typeof match.homeScore === "number" ? match.homeScore : null;
      const as = typeof match.awayScore === "number" ? match.awayScore : null;
      if (hs === null || as === null) return "#F48637";
      if (hs === 0 && as === 0) return "#F48637";
      return "#EE3449";
    };

    const isMatchDone = (match: any) => {
      if (!match) return false;
      if (typeof match.status === "string" && match.status.toUpperCase() === "COMPLETED") return true;
      return (typeof match.homeScore === "number" && typeof match.awayScore === "number");
    };

    const getStatusText = (match: any) => {
      if (isMatchDone(match)) return "Đã diễn ra";
      return "Sắp diễn ra";
    };
    
    return {
      StatusMatch,
      OpenUpdate,
      idMatch,
      OpenPopup,
      handleUpdate,
      handleDetail,
      listDataLeague,
      fnGetListMatchesSchedule,
      isLoading,
      formatTime,
      formatMatchDateTime,
      displayScore,
      getScoreColor,
      isMatchDone,
      getStatusText,
      currentMatchHomeTeamLogo,
      currentMatchAwayTeamLogo,
    };
  },
});
</script>

<style scoped>
/* Desktop styles - Giữ nguyên */
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
  background: rgba(4, 184, 10, 1);
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

/* Mobile styles - Giống LatestMatches.vue */
.match-card-mobile {
  background: #F8F2F1;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 8px 0 12px 0;
  margin-bottom: 16px;
  overflow: visible;
  position: relative;
  min-height: 176px;
}

.imgLichthidau-mobile {
  width: 220px;
  height: 56px;
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ribbon-img-mobile { 
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  display: block; 
}

.lichTime-mobile {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 1px;
  pointer-events: none;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}

.pseudoLichthidau-mobile {
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 10px;
  opacity: 1;
  border-top-left-radius: 8.5px;
  border-top-right-radius: 8.5px;
  background: linear-gradient(90deg, #ad4847 0%, #ae2093 100%);
  z-index: 5;
}

.team-logo-mobile {
  width: 62px;
  height: 62px;
  object-fit: contain;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #fff;
}

.team-name-mobile {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin-top: 6px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.score-mobile {
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
  margin-top: 6px;
}

.status-badge-mobile {
  margin-top: 8px;
  background: #16a34a;
  color: #fff;
  padding: 6px 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
}

.status-badge-mobile.status-done { 
  background: #6b7280; 
}

.match-meta-mobile { 
  color: #848484; 
  font-style: italic; 
  font-weight: 400; 
  font-size: 13px; 
}

.text-meta-mobile {
  color: #848484;
  font-style: italic;
  font-weight: 400;
  font-size: 13px;
}

@media (max-width: 420px) {
  .imgLichthidau-mobile { 
    width: 190px; 
    height: 48px; 
    top: -10px; 
  }
  .lichTime-mobile { 
    font-size: 18px; 
  }
  .team-logo-mobile { 
    width: 56px; 
    height: 56px; 
  }
  .score-mobile { 
    font-size: 26px; 
  }
  .status-badge-mobile { 
    padding: 6px 12px; 
    border-radius: 10px; 
    font-size: 11px; 
  }
}
</style>