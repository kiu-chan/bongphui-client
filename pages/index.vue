<template>
  <main>
    <div>
      <SliderBanner />

      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto mb-16">
            <!-- Header Section -->
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-12 mb-12 space-y-6 lg:space-y-0">
              <div>
                <h1 class="font-medium text-2xl md:text-3xl lg:text-[45px] text-gray-800">Lịch thi đấu mới nhất</h1>
                <h4 class="font-medium text-base md:text-lg lg:text-xl text-gray-500 mt-2">
                  Xem tất cả các trận đấu
                </h4>
              </div>
              <div class="flex justify-center lg:justify-end">
              </div>
            </div>

            <!-- Tournament Data -->
            <div v-if="tournamentData && tournamentData.length > 0" class="space-y-8">
              <div 
                v-for="(tournamentItem, tournamentIndex) in tournamentData" 
                :key="tournamentIndex" 
                class="tournament-section bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <!-- Tournament Header - Clickable -->
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
                        <h2 class="font-bold text-lg md:text-xl lg:text-2xl text-gray-800 mb-1 truncate">
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
                    <!-- Dropdown Icon + View More Button -->
                    <div class="flex items-center gap-3">
                      <!-- View More button: stop propagation so it doesn't toggle the collapse -->
                      <button
                        @click.stop="goToTournamentSchedule(tournamentItem.tournament.id)"
                        class="text-sm md:text-sm bg-orange-400 text-white px-3 py-1 rounded-md hover:bg-orange-500 transition-colors duration-150"
                        :aria-label="`Xem thêm lịch thi đấu ${tournamentItem.tournament.name}`"
                      >
                        Xem thêm
                      </button>

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
                  <div v-show="expandedTournaments.includes(tournamentIndex)" class="overflow-hidden">
                    <div v-if="tournamentItem.matches && tournamentItem.matches.length > 0" class="p-4 md:p-6 pt-0">
                      <div v-for="(match, index) in tournamentItem.matches" :key="match.id" class="mb-4 last:mb-0">
                        <div class="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                          <!-- Desktop Layout -->
                          <div class="hidden lg:grid lg:grid-cols-10 min-h-[100px]">
                            <div class="col-span-6 flex justify-between items-center px-8 py-4">
                              <!-- Team 1 -->
                              <div class="flex items-center gap-3 w-[40%] justify-start">
                                <img
                                  class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full team-logo"
                                  :src="getTeamLogo(match?.homeTeam.logoUrl)"
                                  :alt="match?.homeTeam.name"
                                  @error="$event.target.src = defaultLogo"
                                />
                                <p class="font-semibold text-sm md:text-base lg:text-lg truncate">
                                  {{ match?.homeTeam.name }}
                                </p>
                              </div>

                              <!-- Score -->
                              <div class="text-center font-bold text-lg lg:text-xl w-[20%]">
                                <span class="bg-gray-100 px-3 py-2 rounded-lg text-sm lg:text-base">
                                  {{ match?.homeScore ?? '-' }} - {{ match?.awayScore ?? '-' }}
                                </span>
                              </div>

                              <!-- Team 2 -->
                              <div class="flex items-center gap-3 w-[40%] justify-end">
                                <p class="font-semibold text-sm md:text-base lg:text-lg truncate">
                                  {{ match?.awayTeam.name }}
                                </p>
                                <img
                                  class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full team-logo"
                                  :src="getTeamLogo(match?.awayTeam.logoUrl)"
                                  :alt="match?.awayTeam.name"
                                  @error="$event.target.src = defaultLogo"
                                />
                              </div>
                            </div>
                            <div class="col-span-4 flex items-center px-6 py-4 bg-gray-50 text-gray-600">
                              <div>
                                <div class="font-medium text-sm lg:text-base">🕐 {{ formatMatchDateTime(match?.matchDateTime) }}</div>
                                <div v-if="match?.stadiumName" class="text-xs lg:text-sm text-gray-500 mt-1">🏟️ {{ match?.stadiumName }}</div>
                              </div>
                            </div>
                          </div>

                          <!-- Mobile/Tablet Layout -->
                          <div class="lg:hidden p-4">
                            <!-- Teams and Score -->
                            <div class="flex items-center justify-between mb-3">
                              <!-- Team 1 -->
                              <div class="flex items-center gap-2 flex-1 min-w-0">
                                <img
                                  class="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full team-logo flex-shrink-0"
                                  :src="getTeamLogo(match?.homeTeam.logoUrl)"
                                  :alt="match?.homeTeam.name"
                                  @error="$event.target.src = defaultLogo"
                                />
                                <p class="font-semibold text-sm md:text-base truncate">
                                  {{ match?.homeTeam.name }}
                                </p>
                              </div>

                              <!-- Score -->
                              <div class="text-center font-bold text-base md:text-lg mx-4">
                                <span class="bg-gray-100 px-2 md:px-3 py-1 rounded-lg text-sm md:text-base">
                                  {{ match?.homeScore ?? '-' }} - {{ match?.awayScore ?? '-' }}
                                </span>
                              </div>

                              <!-- Team 2 -->
                              <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
                                <p class="font-semibold text-sm md:text-base truncate">
                                  {{ match?.awayTeam.name }}
                                </p>
                                <img
                                  class="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full team-logo flex-shrink-0"
                                  :src="getTeamLogo(match?.awayTeam.logoUrl)"
                                  :alt="match?.awayTeam.name"
                                  @error="$event.target.src = defaultLogo"
                                />
                              </div>
                            </div>

                            <!-- Match Info -->
                            <div class="bg-gray-50 p-3 rounded-lg">
                              <div class="font-medium text-xs md:text-sm text-gray-700">🕐 {{ formatMatchDateTime(match?.matchDateTime) }}</div>
                              <div v-if="match?.stadiumName" class="text-xs md:text-sm text-gray-500 mt-1">🏟️ {{ match?.stadiumName }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                      <p class="text-sm md:text-base">Chưa có trận đấu nào trong giải đấu này</p>
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

          <!-- News Slider -->
          <SwiperSlider
            :listImg="listNew"
            :imgHPL="imgDefaultNew"
            :title="'Tin tức mới nhất'"
            :text="'Xem tất cả các trận đấu'"
          />

          <!-- Partners Section - Logo Only -->
          <div class="container mx-auto mt-16 md:mt-20 lg:mt-24 mb-16 md:mb-20 lg:mb-24 px-4">
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 md:mb-16 lg:mb-24 space-y-6 lg:space-y-0">
              <div>
                <h1 class="font-medium text-2xl md:text-3xl lg:text-[45px] text-gray-800">Đối tác</h1>
                <h3 class="font-medium text-base md:text-lg lg:text-xl text-gray-500 mt-2">
                  Các đối tác chiến lược của chúng tôi
                </h3>
              </div>
              <div class="flex justify-center lg:justify-end gap-2">
                <button
                  class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors duration-200"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-200"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Partners Logos Grid - Logo Only -->
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              <div
                v-for="(partner, index) in partnersData"
                :key="index"
                class="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group flex items-center justify-center aspect-square"
              >
                <img 
                  class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-200 filter grayscale hover:grayscale-0" 
                  :src="partner.logoUrl" 
                  :alt="partner.name || 'Partner logo'"
                  @error="$event.target.src = defaultPartnerLogo"
                />
              </div>
            </div>
          </div>

          <!-- Highlights Slider -->
          <SwiperSlider
            :listImg="listHightLight"
            :imgHPL="imgDefaultNew2"
            :title="'Highlight Giải đấu'"
            :text="'Highlight Giải đấu'"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import SwiperSlider from "../component/library/swiperSlider/index.vue";
import { ref, defineComponent, type Ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import imgHPL from "../assets/img/hpl.png";
import SonMuller from "../assets/img/sonMuler.png";
import defaultLogo from "../assets/img/Chelsea_FC.svg.png";
import defaultPartnerLogo from "../assets/img/doitac1.png";
import SliderBanner from "../component/library/sliderBanner/index.vue";
import { useNewStore } from "../store/new";
import { useMatchStore } from "../store/matchManger";
import { useTournamentStore } from "../store/tournament";

interface New {
  id: number;
  title: string;
  imageUrl: string;
}

interface Team {
  id: number;
  name: string;
  logoUrl: string | null;
}

interface Match {
  id: number;
  stadiumName: string | null;
  refereeName: string | null;
  matchDate: string | null;
  matchDateTime: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string | null;
  homeTeam: Team;
  awayTeam: Team;
  mvpName: string | null;
  leagueId: number;
  tournamentId: number;
  highlights: any[] | null;
}

interface Tournament {
  id: number;
  name: string;
  logoUrl: string | null;
  description: string | null;
  startDate: string;
  endDate: string;
  location: string;
  format: string | null;
  numberOfTeams: number | null;
  fund: string | null;
  sponsor: string | null;
  broadcast: string | null;
  media: string | null;
}

interface TournamentWithMatches {
  tournament: Tournament;
  matches: Match[];
}

interface Partner {
  id: number;
  name?: string;
  logoUrl: string;
}

export default defineComponent({
  components: {
    SwiperSlider,
    SliderBanner,
  },
  setup() {
    const NewStore = useNewStore();
    const MatchStore = useMatchStore();
    const TournamentStore = useTournamentStore();
    const imgDefaultNew = ref(imgHPL);
    const imgDefaultNew2 = ref(SonMuller);
    
    // Router
    const router = useRouter();

    // Expanded tournaments state
    const expandedTournaments = ref<number[]>([]);

    onMounted(() => {
      fnGetMacthNew();
      fngetListNew();
      fngetHightLight();
      fnGetPartnersData();
    });

    const listNew: Ref<New | undefined> = ref();
    const listHightLight: Ref<New | undefined> = ref();
    const listNewMactch: Ref<Match[]> = ref([]);
    const tournamentData: Ref<TournamentWithMatches[]> = ref([]);
    const partnersData: Ref<Partner[]> = ref([]);

    const fngetListNew = () => {
      NewStore.fnGetNew()
        .then((res: any) => {
          listNew.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };

    const fngetHightLight = () => {
      NewStore.fnGetNewHightlight()
        .then((res: any) => {
          listHightLight.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };

    const fnGetMacthNew = () => {
      MatchStore.fnGetMatchNew()
        .then((res: TournamentWithMatches[]) => {
          // Sort tournaments by start date (newest first)
          const sortedTournaments = res.sort((a, b) => {
            return new Date(b.tournament.startDate).getTime() - new Date(a.tournament.startDate).getTime();
          });

          // Sort matches within each tournament by date/time (newest first)
          sortedTournaments.forEach(tournamentData => {
            tournamentData.matches.sort((a, b) => {
              return new Date(b.matchDateTime).getTime() - new Date(a.matchDateTime).getTime();
            });
          });

          // Also maintain the flattened array for other uses
          const allMatches: Match[] = [];
          sortedTournaments.forEach(tournamentData => {
            allMatches.push(...tournamentData.matches);
          });
          
          listNewMactch.value = allMatches;
          tournamentData.value = sortedTournaments;
          
          // Expand first tournament by default
          if (sortedTournaments.length > 0) {
            expandedTournaments.value = [0];
          }
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };

    // Load partners data - only logos
    const fnGetPartnersData = () => {
      // Create sample partner data with only logos
      partnersData.value = [
        {
          id: 1,
          logoUrl: defaultPartnerLogo
        },
        {
          id: 2,
          logoUrl: defaultPartnerLogo
        },
        {
          id: 3,
          logoUrl: defaultPartnerLogo
        },
        {
          id: 4,
          logoUrl: defaultPartnerLogo
        },
        {
          id: 5,
          logoUrl: defaultPartnerLogo
        },
        {
          id: 6,
          logoUrl: defaultPartnerLogo
        }
      ];
    };

    // Toggle tournament expansion
    const toggleTournament = (index: number) => {
      const currentIndex = expandedTournaments.value.indexOf(index);
      if (currentIndex > -1) {
        expandedTournaments.value.splice(currentIndex, 1);
      } else {
        expandedTournaments.value.push(index);
      }
    };

    // Navigate to tournament schedule page
    const goToTournamentSchedule = (tournamentId: number | string | undefined) => {
      if (tournamentId === undefined || tournamentId === null) return;
      router.push(`/quanlygiaidau/${tournamentId}/lichthidau`).catch(() => {
        // ignore navigation duplicate or handle if needed
      });
    };

    // Computed property to format match display
    const formatMatchDateTime = (matchDateTime: string) => {
      return new Date(matchDateTime).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    const getTeamLogo = (logoUrl: string | null) => {
      if (logoUrl) {
        return logoUrl;
      }
      return defaultLogo;
    };

    return {
      imgDefaultNew,
      imgDefaultNew2,
      listNew,
      listHightLight,
      listNewMactch,
      tournamentData,
      partnersData,
      expandedTournaments,
      toggleTournament,
      formatMatchDateTime,
      formatDate,
      getTeamLogo,
      defaultLogo,
      defaultPartnerLogo,
      goToTournamentSchedule,
    };
  },
});
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  background: linear-gradient(89.01deg, #f17f4b 1.67%, #9339f6 100%);
  margin-top: -240px;
}

.bg::after {
  content: "";
  position: absolute;
  inset: 8px 0 0 0;
  background: rgba(250, 249, 249, 1);
  border-radius: 29px 29px 0 0;
  z-index: 0;
}

.bg2 {
  position: relative;
  z-index: 1;
}

.team-logo {
  border: 2px solid #e5e7eb;
  transition: border-color 0.2s ease;
}

.team-logo:hover {
  border-color: #9ca3af;
}

/* Animation utilities */
.max-h-0 {
  max-height: 0;
}

.max-h-[2000px] {
  max-height: 2000px;
}
</style>