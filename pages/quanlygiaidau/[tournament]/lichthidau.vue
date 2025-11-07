<template>
  <TournamentHeader :stt="3">
    <!-- Lặp qua từng vòng -->
    <div
      v-for="(matches, roundName, index) in listDataLeague"
      :key="index"
      class="mb-8"
    >
      <!-- Tên vòng -->
      <div class="text-center font-medium text-3xl my-8">
        {{ roundName.toUpperCase() }}
      </div>

      <!-- Danh sách trận trong vòng -->
      <div
        v-for="(item, idx) in matches"
        :key="idx"
        class="grid grid-cols-10 mb-[23px] lichThidau2 rounded-[10px]"
      >
        <div
          class="col-span-6 h-[100px] lichThidau flex justify-between items-center px-[53px]"
        >
          <!-- Team 1 -->
          <div class="flex items-center gap-3 w-[40%] justify-start">
            <img
              class="w-[62px] h-[62px]"
              :src="item?.homeTeam?.logoUrl"
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
              class="w-[62px] h-[62px]"
              :src="item?.awayTeam?.logoUrl"
              alt=""
            />
          </div>
        </div>

        <div
          class="col-span-4 h-[100px] lichThidau flex items-center pl-[40px]"
        >
          {{ item?.matchDateTime ?? "Chưa cập nhật" }},
          {{ item?.stadiumName ?? "Đang cập nhật" }}
        </div>
      </div>
    </div>
  </TournamentHeader>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
import { useMatchStore } from "../../../store/matchManger";
export default defineComponent({
  name: "LeagueMatchList",
  components: { TournamentHeader },

  setup() {
    const MatchStore = useMatchStore();
    const route = useRoute();
    const idParams = (route.params.tournament ?? "") as string;
    onMounted(() => {
      fnGetListMatchesSchedule();
    });
    const listDataLeague: Ref<any[]> = ref([]);
    const item = [
      {
        logo1: 1,
        logo2: 2,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
      {
        logo1: 1,
        logo2: 2,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
      {
        logo1: 1,
        logo2: 2,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
    ];
    const fnGetListMatchesSchedule = () => {
      MatchStore.fnGetMatchSchedule(idParams)
        .then((res: any) => {
          listDataLeague.value = res;
          console.log("pham tien chinhs", listDataLeague);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      item,
      listDataLeague,
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
</style>
