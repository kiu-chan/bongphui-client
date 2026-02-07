<template>
  <div class="app-container container mx-auto mb-16">
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-12 mb-12 space-y-6 lg:space-y-0">
      <div>
        <h1 class="font-medium text-2xl md:text-3xl lg:text-[45px] text-gray-800">Lịch thi đấu mới nhất</h1>
        <h4 class="font-medium text-base md:text-lg lg:text-xl text-gray-500 mt-2">
          Xem tất cả các trận đấu
        </h4>
      </div>
      <div class="flex justify-center lg:justify-end"></div>
    </div>

    <!-- Tournament Data -->
    <div v-if="tournamentData && tournamentData.length > 0" class="space-y-8">
      <div
        v-for="(tournamentItem, tournamentIndex) in tournamentData"
        :key="tournamentIndex"
        class="tournament-section rounded-2xl overflow-visible"
      >
        <!-- Tournament Header -->
        <div
          @click="toggleTournament(tournamentIndex)"
          class="tournament-header cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 p-4 md:p-6"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <img
                v-if="tournamentItem.tournament.logoUrl"
                :src="tournamentItem.tournament.logoUrl"
                alt=""
                class="w-12 h-12 md:w-14 md:h-14 object-contain rounded-lg border-2 border-white shadow-sm flex-shrink-0"
              />
              <div class="min-w-0 flex-1">
                <h2 class="font-bold text-lg md:text-xl lg:text-2xl text-gray-800 mb-1">
                  {{ tournamentItem.tournament.name }}
                </h2>
                <p class="text-xs md:text-sm text-gray-600 flex flex-wrap gap-1 md:gap-2">
                  <span class="flex items-center gap-1">
                    📍 <span class="truncate">{{ tournamentItem.tournament.location }}</span>
                  </span>
                  <span class="hidden sm:inline">•</span>
                  <span class="flex items-center gap-1">
                    📅 {{ formatDate(tournamentItem.tournament.startDate) }} - {{ formatDate(tournamentItem.tournament.endDate) }}
                  </span>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-xs md:text-sm text-gray-500 text-right">
                {{ tournamentItem.matches?.length || 0 }} trận
              </div>
              <svg
                :class="expandedTournaments.includes(tournamentIndex) ? 'rotate-180' : 'rotate-0'"
                class="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-200 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Tournament Matches - Collapsible -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[2000px] opacity-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="max-h-[2000px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-show="expandedTournaments.includes(tournamentIndex)" class="overflow-visible">
            <div v-if="tournamentItem.matches && tournamentItem.matches.length > 0" class="p-4 md:p-6 pt-0">
              <!-- MOBILE: giữ nguyên hiển thị 1 cột như trước -->
              <div class="lg:hidden space-y-4">
                <div v-for="(match, index) in tournamentItem.matches" :key="`mobile-${match.id ?? index}`">
                  <div class="match-card-mobile rounded-xl relative overflow-visible">
                    <!-- ribbon top center -->
                    <div class="imgLichthidau-mobile" aria-hidden="true">
                      <img class="ribbon-img-mobile" :src="lichImage" alt="lich" />
                      <div class="lichTime-mobile">{{ formatTime(match?.matchDateTime) }}</div>
                      <div class="pseudoLichthidau-mobile" aria-hidden="true"></div>
                    </div>

                    <!-- content: logos left/right with names, score centered -->
                    <div class="mobile-content px-4 pt-10 pb-6">
                      <div class="flex items-center justify-between">
                        <!-- left team -->
                        <div class="flex flex-col items-center w-1/3 min-w-0">
                          <img class="team-logo-mobile" :src="getTeamLogo(match?.homeTeam?.logoUrl)" :alt="match?.homeTeam?.name" @error="$event.target.src = defaultLogo" />
                          <p class="team-name-mobile mt-2 text-center truncate">{{ match?.homeTeam?.name }}</p>
                        </div>

                        <!-- score -->
                        <div class="flex flex-col items-center w-1/3">
                          <div class="score-mobile" :style="{ color: getScoreColor(match) }">{{ displayScore(match) }}</div>
                          <div class="status-badge-mobile mt-3" :class="{'status-done': isMatchDone(match)}">
                            <span>{{ getStatusText(match) }}</span>
                          </div>
                        </div>

                        <!-- right team -->
                        <div class="flex flex-col items-center w-1/3 min-w-0">
                          <img class="team-logo-mobile" :src="getTeamLogo(match?.awayTeam?.logoUrl)" :alt="match?.awayTeam?.name" @error="$event.target.src = defaultLogo" />
                          <p class="team-name-mobile mt-2 text-center truncate">{{ match?.awayTeam?.name }}</p>
                        </div>
                      </div>

                      <!-- meta row -->
                      <div class="match-meta-mobile mt-4 flex items-center justify-center gap-2 text-center">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12A9 9 0 113 12a9 9 0 0118 0z"></path></svg>
                        <div class="text-meta-mobile">{{ formatMatchDateTime(match?.matchDateTime) }}, {{ match?.stadiumName ?? "Đang cập nhật" }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DESKTOP: hai cột, mỗi cột lấy danh sách đã split -->
              <div class="hidden lg:grid lg:grid-cols-2 gap-6">
                <!-- Left column -->
                <div class="space-y-4">
                  <div
                    v-for="(match, idx) in splitMatchesToColumns(tournamentItem.matches).left"
                    :key="`left-${match.id ?? idx}`"
                    class="mb-0"
                  >
                    <div class="match-card rounded-xl transition-all duration-200 overflow-visible relative">
                      <div class="grid grid-cols-10 mb-[0px] lichThidau2 rounded-[10px]">
                        <!-- LEFT TEAM + SCORE + RIGHT TEAM -->
                        <div class="col-span-6 h-[100px] lichThidau flex items-center justify-between px-[40px] relative overflow-visible">
                          <!-- Left team: logo above name, centered -->
                          <div class="flex flex-col items-center gap-1 w-[40%] min-w-0">
                            <img
                              class="team-logo round-logo"
                              :src="getTeamLogo(match?.homeTeam?.logoUrl)"
                              :alt="match?.homeTeam?.name"
                              @error="$event.target.src = defaultLogo"
                            />
                            <p class="team-name full-name text-center truncate">{{ match?.homeTeam?.name }}</p>
                          </div>

                          <!-- Score (center) -->
                          <div class="text-center score-wrap">
                            <span class="score-text" :style="{ color: getScoreColor(match) }">
                              {{ displayScore(match) }}
                            </span>
                          </div>

                          <!-- Right team: logo above name, centered -->
                          <div class="flex flex-col items-center gap-1 w-[40%] min-w-0">
                            <img
                              class="team-logo round-logo"
                              :src="getTeamLogo(match?.awayTeam?.logoUrl)"
                              :alt="match?.awayTeam?.name"
                              @error="$event.target.src = defaultLogo"
                            />
                            <p class="team-name full-name text-center truncate">{{ match?.awayTeam?.name }}</p>
                          </div>

                          <!-- ribbon -->
                          <div class="imgLichthidau" aria-hidden="true">
                            <img class="ribbon-img" :src="lichImage" alt="lich" />
                            <div class="lichTime">{{ formatTime(match?.matchDateTime) }}</div>
                          </div>
                          <div class="pseudoLichthidau" aria-hidden="true"></div>
                        </div>

                        <div class="col-span-4 h-[100px] lichThidau flex items-center justify-between pl-[40px] relative">
                          <div>
                            <div class="match-meta">{{ formatMatchDateTime(match?.matchDateTime) }}, {{ match?.stadiumName ?? "Đang cập nhật" }}</div>
                            <div
                              class="startLichthidau flex justify-center items-center"
                              :class="{'startLichthidau-done': isMatchDone(match)}"
                            >
                              <p class="start-text">{{ getStatusText(match) }}</p>
                            </div>
                          </div>
                          <div><!-- empty --></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right column -->
                <div class="space-y-4">
                  <div
                    v-for="(match, idx) in splitMatchesToColumns(tournamentItem.matches).right"
                    :key="`right-${match.id ?? idx}`"
                    class="mb-0"
                  >
                    <div class="match-card rounded-xl transition-all duration-200 overflow-visible relative">
                      <div class="grid grid-cols-10 mb-[0px] lichThidau2 rounded-[10px]">
                        <div class="col-span-6 h-[100px] lichThidau flex items-center justify-between px-[40px] relative overflow-visible">
                          <div class="flex flex-col items-center gap-1 w-[40%] min-w-0">
                            <img
                              class="team-logo round-logo"
                              :src="getTeamLogo(match?.homeTeam?.logoUrl)"
                              :alt="match?.homeTeam?.name"
                              @error="$event.target.src = defaultLogo"
                            />
                            <p class="team-name full-name text-center truncate">{{ match?.homeTeam?.name }}</p>
                          </div>

                          <div class="text-center score-wrap">
                            <span class="score-text" :style="{ color: getScoreColor(match) }">
                              {{ displayScore(match) }}
                            </span>
                          </div>

                          <div class="flex flex-col items-center gap-1 w-[40%] min-w-0">
                            <img
                              class="team-logo round-logo"
                              :src="getTeamLogo(match?.awayTeam?.logoUrl)"
                              :alt="match?.awayTeam?.name"
                              @error="$event.target.src = defaultLogo"
                            />
                            <p class="team-name full-name text-center truncate">{{ match?.awayTeam?.name }}</p>
                          </div>

                          <div class="imgLichthidau" aria-hidden="true">
                            <img class="ribbon-img" :src="lichImage" alt="lich" />
                            <div class="lichTime">{{ formatTime(match?.matchDateTime) }}</div>
                          </div>
                          <div class="pseudoLichthidau" aria-hidden="true"></div>
                        </div>

                        <div class="col-span-4 h-[100px] lichThidau flex items-center justify-between pl-[40px] relative">
                          <div>
                            <div class="match-meta">{{ formatMatchDateTime(match?.matchDateTime) }}, {{ match?.stadiumName ?? "Đang cập nhật" }}</div>
                            <div
                              class="startLichthidau flex justify-center items-center"
                              :class="{'startLichthidau-done': isMatchDone(match)}"
                            >
                              <p class="start-text">{{ getStatusText(match) }}</p>
                            </div>
                          </div>
                          <div><!-- empty --></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- centered xem thêm under the list -->
              <div class="flex justify-center mt-4">
                <button
                  @click="goToTournamentSchedule(tournamentItem.tournament.id)"
                  class="text-sm md:text-sm bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-colors duration-150"
                  :aria-label="`Xem thêm lịch thi đấu ${tournamentItem.tournament.name}`"
                >
                  Xem thêm
                </button>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <p class="text-sm md:text-base">Chưa có trận đấu nào trong giải đấu này</p>

              <div class="flex justify-center mt-4">
                <button
                  @click="goToTournamentSchedule(tournamentItem.tournament.id)"
                  class="text-sm md:text-sm bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-colors duration-150"
                  :aria-label="`Xem thêm lịch thi đấu ${tournamentItem.tournament.name}`"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500 text-base md:text-lg">
        <div class="animate-spin w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import defaultLogo from "../../assets/img/Chelsea_FC.svg.png";
import lichImageSrc from "../../assets/img/lichthidau.png";
import { useMatchStore } from "../../store/matchManger";

interface Team { id: number; name: string; logoUrl?: string | null; }
interface Match {
  id: number;
  stadiumName?: string | null;
  refereeName?: string | null;
  matchDate?: string | null;
  matchDateTime: string;
  homeScore?: number | null;
  awayScore?: number | null;
  status?: string | null;
  homeTeam: Team;
  awayTeam: Team;
  mvpName?: string | null;
  leagueId?: number;
  tournamentId?: number;
  highlights?: any[] | null;
}
interface Tournament { id: number; name: string; logoUrl?: string | null; description?: string | null; startDate: string; endDate: string; location?: string; format?: string | null; numberOfTeams?: number | null; fund?: string | null; sponsor?: string | null; broadcast?: string | null; media?: string | null; }
interface TournamentWithMatches { tournament: Tournament; matches: Match[]; }

export default defineComponent({
  name: "LatestSchedule",
  setup() {
    const MatchStore = useMatchStore();
    const lichImage = ref<string>(lichImageSrc);
    const router = useRouter();
    const expandedTournaments = ref<number[]>([]);
    const tournamentData: Ref<TournamentWithMatches[]> = ref([]);

    onMounted(() => {
      fnGetMacthNew();
    });

    const fnGetMacthNew = async () => {
      try {
        const res: TournamentWithMatches[] = await MatchStore.fnGetMatchNew();
        const arr = Array.isArray(res) ? res : [];
        const sortedTournaments = arr.slice().sort((a, b) => {
          return new Date(b.tournament.startDate).getTime() - new Date(a.tournament.startDate).getTime();
        });

        sortedTournaments.forEach((t) => {
          t.matches = Array.isArray(t.matches) ? t.matches.slice().sort((a, b) => {
            return new Date(b.matchDateTime).getTime() - new Date(a.matchDateTime).getTime();
          }) : [];
        });

        tournamentData.value = sortedTournaments;

        if (sortedTournaments.length > 0) expandedTournaments.value = [0];
      } catch {
        tournamentData.value = [];
      }
    };

    const toggleTournament = (index: number) => {
      const i = expandedTournaments.value.indexOf(index);
      if (i > -1) expandedTournaments.value.splice(i, 1);
      else expandedTournaments.value.push(index);
    };

    const goToTournamentSchedule = (tournamentId: number | string | undefined) => {
      if (!tournamentId) return;
      router.push(`/quanlygiaidau/${tournamentId}/lichthidau`).catch(() => {});
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

    const formatDate = (dateString?: string) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const getTeamLogo = (logoUrl?: string | null) => {
      if (logoUrl) return logoUrl;
      return defaultLogo;
    };

    const displayScore = (match: Match) => {
      const hs = typeof match.homeScore === "number" ? match.homeScore : null;
      const as = typeof match.awayScore === "number" ? match.awayScore : null;
      if (hs === null && as === null) return "- : -";
      return `${hs ?? "-"} : ${as ?? "-"}`;
    };

    const getScoreColor = (match: Match) => {
      const hs = typeof match.homeScore === "number" ? match.homeScore : null;
      const as = typeof match.awayScore === "number" ? match.awayScore : null;
      if (hs === null || as === null) return "#F48637";
      if (hs === 0 && as === 0) return "#F48637";
      return "#EE3449";
    };

    const isMatchDone = (match: Match) => {
      if (!match) return false;
      if (typeof match.status === "string" && match.status.toUpperCase() === "COMPLETED") return true;
      return (typeof match.homeScore === "number" && typeof match.awayScore === "number");
    };

    const getStatusText = (match: Match) => {
      if (isMatchDone(match)) return "Đã diễn ra";
      return "Sắp diễn ra";
    };

    const splitMatchesToColumns = (matches?: Match[]) => {
      const left: Match[] = [];
      const right: Match[] = [];
      if (!Array.isArray(matches) || matches.length === 0) return { left, right };
      matches.forEach((m, i) => {
        if (i % 2 === 0) left.push(m);
        else right.push(m);
      });
      return { left, right };
    };

    return {
      tournamentData,
      expandedTournaments,
      toggleTournament,
      formatMatchDateTime,
      formatDate,
      getTeamLogo,
      defaultLogo,
      goToTournamentSchedule,
      lichImage,
      formatTime,
      displayScore,
      getScoreColor,
      isMatchDone,
      getStatusText,
      splitMatchesToColumns,
    };
  },
});
</script>

<style scoped>
.app-container,
.tournament-section,
.tournament-header,
.match-card,
.lichThidau,
.lichThidau2 {
  font-family: "FS Magistral", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.match-card {
  background: #F8F2F1;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  padding: 12px 8px 8px;
  margin-bottom: 8px;
  overflow: visible;
  position: relative;
}

.round-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid white;
}

.team-name {
  font-size: 17px;
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.15;
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

.score-wrap { display: flex; align-items: center; justify-content: center; width: 100%; }
.score-text { font-weight: 700; line-height: 1; font-size: 24px; }

.imgLichthidau {
  width: 160px;
  height: 44px;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgLichthidau .ribbon-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  display: block;
}
.lichTime { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 16px; letter-spacing: 1px; pointer-events: none; text-shadow: 0 1px 0 rgba(0,0,0,0.15); z-index: 2; }

.pseudoLichthidau {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 170px;
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
  width: 90px;
  height: 28px;
  opacity: 1;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(4, 184, 10, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.startLichthidau-done { background: #6b7280; }
.start-text { color: #ffffff; font-style: italic; font-weight: 500; font-size: 12px; }

.match-meta { color: #848484; font-style: italic; font-weight: 400; font-size: 13px; }

.lichThidau { padding-top: 6px; }

.lichThidau2:hover .match-card,
.lichThidau2:hover { box-shadow: 0px 4px 15px rgba(241, 206, 206, 0.7); }

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
.ribbon-img-mobile { width: 100%; height: 100%; object-fit: contain; display: block; }
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
.status-badge-mobile.status-done { background: #6b7280; }

.match-meta-mobile { color: #848484; font-style: italic; font-weight: 400; font-size: 13px; }

.tournament-section, .tournament-section > * { overflow: visible; }

@media (min-width: 1024px) {
  .team-name {
    font-size: 15px;
  }
  .match-meta {
    font-size: 12px;
  }
  .lichTime {
    font-size: 16px;
  }

  .match-card { padding-top: 24px; }
  .lichThidau { padding-top: 8px; }

  .imgLichthidau {
    width: 180px;
    height: 48px;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
  .pseudoLichthidau {
    left: 50%;
    transform: translateX(-50%);
    top: -35px;
    width: 190px;
  }

  .score-wrap { position: relative; z-index: 3; }
  .lichTime { z-index: 4; }
}

@media (max-width: 420px) {
  .imgLichthidau-mobile { width: 190px; height: 48px; top: -10px; }
  .lichTime-mobile { font-size: 18px; }
  .team-logo-mobile { width: 56px; height: 56px; }
  .score-mobile { font-size: 26px; }
  .status-badge-mobile { padding: 6px 12px; border-radius: 10px; font-size: 11px; }
}
</style>