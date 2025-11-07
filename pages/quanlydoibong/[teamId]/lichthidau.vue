<template>
  <headerDoibong :stt="2">
    <div class="flex justify-end mt-[28px] mb-[28px]">
      <div class="search max-w-[409px] h-[50px] rounded-2xl relative">
        <input
          class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]"
          type="text"
          placeholder="Tìm kiếm"
        />
        <Icon
          class="absolute IconSearch"
          name="hugeicons:search-02"
          width="24"
          height="24"
        />
      </div>
    </div>
    <div v-for="(ite, index) in itemMatchTeam" :key="index" class="">
      <div class="mb-[34px] flex gap-4 items-center mt-[30px]">
        <img
          class="w-[36px] h-[41px] object-contain"
          :src="ite.tournamentLogo"
          alt=""
        />
        <h3 class="font-medium text-[20pxs]">{{ ite.tournamentName }}</h3>
      </div>
      <div
        v-for="(item, index) in ite.matches"
        :key="index"
        class="grid grid-cols-10 mb-[23px] lichThidau2 rounded-[10px]"
      >
        <div
          class="col-span-6 h-[100px] lichThidau flex justify-between items-center px-[53px]"
        >
          <!-- Team 1 -->
          <div class="flex items-center gap-3 w-[40%] justify-start">
            <img
              class="w-[62px] h-[62px]"
              src="../assets/img/Chelsea_FC.svg.png"
              alt=""
            />
            <p class="font-semibold text-lg truncate">
              {{ item?.homeTeam.name }}
            </p>
          </div>

          <!-- Score -->
          <div class="text-center font-bold text-xl w-[20%]">
            {{ item?.homeScore }} - {{ item?.awayScore }}
          </div>

          <!-- Team 2 -->
          <div class="flex items-center gap-3 w-[40%] justify-end">
            <p class="font-semibold text-lg truncate">
              {{ item?.awayTeam.name }}
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
          {{ item?.matchDateTime }},{{ item?.stadiumName }}
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-[40px] mb-[40px]">
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
  </headerDoibong>
</template>
<script lang="ts">
import headerDoibong from "../../../component/detaildoibong/index.vue";
import manU from "../assets/img/manU.png";
import manCity from "../assets/img/manCity.png";
import lpl from "../assets/img/lpl.png";
import championleague from "../assets/img/championleague.png";
import { useMatchStore } from "../../../store/matchManger";
interface matchTeam {
  id: number;
  stadiumName: string;
  refereeName: string;
  matchDate: string;
  matchDateTime: string;
  homeScore: number;
  awayScore: number;
  status: string;
  homeTeam: {
    id: string;
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
export default defineComponent({
  components: {
    headerDoibong,
  },
  setup() {
    const MatchStore = useMatchStore();
    const route = useRoute();
    const idParams = route.params.teamId;
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const item = [
      {
        name: "Champions League 2025",
        icon: championleague,
        matches: [
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
          {
            logo1: manU,
            logo2: manCity,
            tiso: "2:1",
            name1: "Manchester United",
            name2: "Manchester City",
            nameTourn: "Trận đấu Cup 2025",
            time: "11/09/2025 , Manchester United Old Trafford",
          },
        ],
      },
      {
        name: "Ngoại hạng Anh",
        icon: lpl,
        matches: [
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
          {
            logo1: manU,
            logo2: manCity,
            tiso: "2:1",
            name1: "Manchester United",
            name2: "Manchester City",
            nameTourn: "Trận đấu Cup 2025",
            time: "11/09/2025 , Manchester United Old Trafford",
          },
        ],
      },
    ];
    onMounted(() => {
      fnGetMatchTeam();
    });
    watch(offset, (_new) => {
      if (_new) {
        fnGetMatchTeam();
      }
    });
    const itemMatchTeam: Ref<matchTeam | undefined> = ref();
    const fnGetMatchTeam = () => {
      const params = [
        idParams && `teamId=${idParams}`,
        limit && `limit=${limit}`,
        offset.value && `offset=${offset.value}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      MatchStore.fnGetMatchNewEst(idParams, url)
        .then((res) => {
          itemMatchTeam.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };
    return {
      item,
      itemMatchTeam,
      offset,
    };
  },
});
</script>
<style scoped>
.bangxephang {
  border: 1px solid var(--textsport);
}
</style>
