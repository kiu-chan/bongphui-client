<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto">
            <div class="flex justify-between items-center pt-[50px] mb-[46px]">
              <div class="">
                <h1 class="font-medium text-[45px]">Đội bóng</h1>
              </div>
              <div class="flex justify-between gap-4">
                <NuxtLink to="/taodoibong">
                  <div
                    class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd cursor-pointer"
                  >
                    Tạo đội bóng mới
                  </div>
                </NuxtLink>
                <NuxtLink to="../quanlydoibong/1/danhsach">
                  <div
                    style="
                      background: linear-gradient(
                        90deg,
                        #e97552 0%,
                        #a949cf 100%
                      );
                      color: rgba(255, 255, 255, 1);
                    "
                    class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl cursor-pointer"
                  >
                    Đội bóng của tôi
                  </div>
                </NuxtLink>
                <div class="search max-w-[397px] h-[60px] rounded-2xl relative">
                  <input
                    class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]"
                    type="text"
                    placeholder="Tìm kiếm"
                    v-model="keyword"
                  />
                  <Icon
                    class="absolute IconSearch"
                    name="hugeicons:search-02"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-8">
              <div
                v-for="(item, index) in listDataTeam"
                :key="index"
                class="cardGiaidau"
                :class="[
                  activeIndex === index
                    ? 'cardGiaidau-click'
                    : 'cardGiaidau-noclick',
                ]"
                @click="handelClick(index)"
              >
                <div
                  :class="[
                    activeIndex === index
                      ? 'cardAbsolute-click'
                      : 'cardAbsolute-noclick',
                  ]"
                  class="cardAbsolute flex flex-col justify-between items-center pl-[51px] pr-[51px] pt-[22px] pb-[22px]"
                >
                  <div class="max-w-[88px] max-h-[118px]">
                    <img class="w-full h-full" :src="item?.logoUrl" alt="" />
                  </div>
                  <div
                    :style="[
                      activeIndex === index
                        ? 'color :rgba(244, 134, 55, 1)'
                        : 'color :rgba(0, 0, 0, 1)',
                    ]"
                  >
                    <h2 class="font-medium text-[25px] text-center">
                      {{ item.name }}
                    </h2>
                    <h3 class="font-normal text-[18px] text-center">
                      {{ item.time }}
                    </h3>
                  </div>
                  <NuxtLink :to="`quanlydoibong/${item.teamId}/danhsach`">
                    <div
                      :style="[
                        activeIndex === index
                          ? 'background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)'
                          : 'background :rgba(177, 174, 172, 1)',
                      ]"
                      style="color: rgba(255, 255, 255, 1)"
                      class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
                    >
                      Xem chi tiết
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-[40px]">
              <div class="flex justify-between gap-4 items-center">
                <div
                  class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                  style="
                    border: 1.5px solid rgba(247, 163, 39, 1);
                    color: rgba(247, 163, 39, 1);
                  "
                  @click="offset > 1 ? offset-- : offset"
                >
                  <Icon
                    class="text-[20px]"
                    name="ci:chevron-left"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="flex gap-2">
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                </div>
                <div
                  class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                  style="
                    background-color: rgba(247, 163, 39, 1);
                    color: rgba(255, 255, 255, 1);
                  "
                  @click="offset++"
                >
                  <Icon
                    class="text-[20px]"
                    name="ci:chevron-right"
                    width="40"
                    height="40"
                  />
                </div>
              </div>
            </div>
            <div class="mt-[150px]">
              <div class="flex justify-between items-center">
                <div>
                  <h1
                    style="color: rgba(0, 0, 0, 1)"
                    class="font-medium text-[45px]"
                  >
                    Lịch thi đấu mới nhất
                  </h1>
                  <p
                    style="color: rgba(102, 102, 103, 1)"
                    class="font-medium text-[20px]"
                  >
                    Xem tất cả các trận đấu
                  </p>
                </div>
                <div class="flex justify-between gap-4 items-center">
                  <div
                    class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                    style="
                      border: 1.5px solid rgba(247, 163, 39, 1);
                      color: rgba(247, 163, 39, 1);
                    "
                  >
                    <Icon
                      class="text-[20px]"
                      name="ci:chevron-left"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div
                    class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                    style="
                      background-color: rgba(247, 163, 39, 1);
                      color: rgba(255, 255, 255, 1);
                    "
                  >
                    <Icon
                      class="text-[20px]"
                      name="ci:chevron-right"
                      width="40"
                      height="40"
                    />
                  </div>
                </div>
              </div>
              <div
                v-for="(item, index) in matchesTeam"
                :key="index"
                class="mt-[20px]"
              >
                <div v-for="(ite, index) in item.matches" :key="index">
                  <div
                    class="grid grid-cols-10 lichThidau2 rounded-[10px] mt-[23px]"
                  >
                    <div
                      class="col-span-6 h-[100px] lichThidau flex justify-between items-center px-[53px]"
                    >
                      <!-- Team 1 -->
                      <div
                        class="flex items-center gap-3 w-[40%] justify-start"
                      >
                        <img
                          class="w-[62px] h-[62px]"
                          src="../assets/img/Chelsea_FC.svg.png"
                          alt=""
                        />
                        <p class="font-semibold text-lg truncate">
                          {{ ite?.homeTeam.name }}
                        </p>
                      </div>

                      <!-- Score -->
                      <div class="text-center font-bold text-xl w-[20%]">
                        {{ ite?.homeScore }} - {{ ite?.awayScore }}
                      </div>

                      <!-- Team 2 -->
                      <div class="flex items-center gap-3 w-[40%] justify-end">
                        <p class="font-semibold text-lg truncate">
                          {{ ite?.awayTeam.name }}
                        </p>
                        <img
                          class="w-[62px] h-[62px]"
                          src="../assets/img/Chelsea_FC.svg.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      class="col-span-4 h-[100px] lichThidau flex items-center pl-[40px]"
                    >
                      {{ ite?.matchDate }},{{ ite?.stadiumName }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import manU from "../assets/img/manU.png";
import manCity from "../assets/img/manCity.png";
import SliderBanner from "../component/library/sliderBanner/index.vue";
import { useTeamStore } from "../store/team";
import { useMatchStore } from "../store/matchManger";
interface Team {
  teamId: number;
  name: string;
  logoUrl: string;
  foundedYear: number;
  description: string;
  home_stadium: string;
  coach: {
    coachId: number;
    name: string;
    nationality: string;
    birthdate: string;
    cccd: string;
  };
  tournaments: [
    {
      id: number;
      name: string;
      location: string;
      description: string;
      startDate: string;
      endDate: string;
      numberOfTeams: number;
      format: string;
      numberOfLeagues: number;
      fund: number;
      sponsor: string;
      broadcast: string;
      media: string;
      imageUrl: string;
      deleted: true;
    }
  ];
  images: [string];
}
interface Matches {
  tournamentId: number;
  tournamentName: string;
  tournamentLogo: string;
  matches: [
    {
      id: number;
      stadiumName: string;
      refereeName: string;
      matchDate: string;
      matchDateTime: string;
      homeScore: number;
      awayScore: number;
      status: string;
      homeTeam: {
        id: number;
        name: string;
        logoUrl: string;
      };
      awayTeam: {
        id: number;
        name: string;
        logoUrl: string;
      };
      mvpName: string;
      leagueId: number;
      tournamentId: number;
      highlights: [
        {
          highlightId: number;
          title: string;
          matchId: number;
          playerId: number;
          playerName: string;
          teamName: string;
          minute_given: string;
        }
      ];
    }
  ];
}
export default defineComponent({
  components: {
    SliderBanner,
  },
  setup() {
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const keyword: Ref<string> = ref("");
    const TeamStore = useTeamStore();
    const MatchStore = useMatchStore();
    const activeIndex = ref<number | null>(null);
    const listDataTeam: Ref<Team | undefined> = ref();
    const matchesTeam: Ref<Matches | undefined> = ref();
    onMounted(() => {
      fnGetListData();
      fnGetListNewEst();
    });
    watch([offset, keyword], (_new) => {
      if (_new) {
        fnGetListData();
      }
    });
    const item = [
      {
        logo1: manU,
        logo2: manCity,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
      {
        logo1: manU,
        logo2: manCity,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
    ];
    const fnGetListData = () => {
      const params = [
        keyword.value.toString() && `keyword=${keyword.value}`,
        limit && `limit=${limit}`,
        offset.value && `offset=${offset.value}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      TeamStore.fnGetTeam(url)
        .then((res) => {
          listDataTeam.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };
    const fnGetListNewEst = () => {
      MatchStore.fnGetMatchNewEst(1)
        .then((res) => {
          matchesTeam.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };
    const handelClick = (index) => {
      activeIndex.value = index;
    };

    return {
      handelClick,
      item,
      activeIndex,
      listDataTeam,
      offset,
      keyword,
      matchesTeam,
    };
  },
});
</script>
<style scoped>
.buttonAdd {
  border: 1px solid rgba(4, 184, 10, 1);
  color: rgba(4, 184, 10, 1);
}
.search {
  border: 1px solid rgba(177, 174, 172, 1);

  background: rgba(255, 255, 255, 1);
}
.IconSearch {
  top: 30%;
  left: 14px;
  width: 23px;
  height: 23px;
  border-width: 2px;
}

.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 341px;
  max-width: 285px;
  padding: 2.5px; /* tạo khoảng viền */
  box-sizing: border-box;
}

.cardGiaidau-click {
  background: linear-gradient(
    180deg,
    #f17a3c 0%,
    #131b77 100%
  ); /* border gradient */
}
.cardGiaidau-noclick {
  background: linear-gradient(
    180deg,
    #b0aeac 0%,
    #b1aeac 100%
  ); /* border gradient */
}
.cardAbsolute {
  width: 100%;
  height: 100%;
  border-radius: 16px; /* nhỏ hơn border-radius ngoài 1 chút */
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
}
.cardAbsolute-click {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}
.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}
.dotCirCle {
  width: 15px;
  height: 15px;
  background-color: rgba(255, 229, 190, 1);
}
</style>
