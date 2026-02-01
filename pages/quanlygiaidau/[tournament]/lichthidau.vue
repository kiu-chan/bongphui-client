<template>
  <TournamentHeader :stt="3">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <div v-else>
      <!-- Lặp qua từng vòng -->
      <div v-for="(round, index) in listDataLeague" :key="index" class="mb-8">
        <!-- Tên vòng -->
        <div class="text-center font-medium text-3xl my-8">
          {{ round.roundName.toUpperCase() }}
        </div>

        <!-- Danh sách trận trong vòng -->
        <div
          v-for="(item, idx) in round.matches"
          :key="idx"
          class="grid grid-cols-10 mb-[23px] lichThidau2 rounded-[10px]"
        >
          <div
            class="col-span-6 h-[100px] lichThidau flex justify-between items-center px-[53px] relative"
          >
            <!-- Team 1 -->
            <div class="flex items-center gap-3 w-[40%] justify-start">
              <img
                class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain rounded-full team-logo"
                :src="item?.homeTeam?.logoUrl"
                alt=""
              />

              <p class="font-semibold text-lg truncate">
                {{ item?.homeTeam?.name }}
              </p>
            </div>

            <!-- Score -->
            <div
              @click="handleUpdate(item)"
              class="text-center font-bold text-xl w-[20%]"
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
                :src="item?.homeTeam?.logoUrl"
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
            class="col-span-4 h-[100px] lichThidau flex items-center justify-between pl-[40px] relative"
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
            <div>
              <Icon
                @click="handleDetail(item.id)"
                name="hugeicons:eye"
                width="24"
                height="24"
                style="color: #eb0428"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <DetailLichThidau
      :openPopup="OpenPopup"
      :id="idMatch"
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
    
    watch(OpenPopup, (val) => {
      document.body.style.overflow = val ? "hidden" : "auto";
    });
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
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
      {
        logo1: 1,
        logo2: 2,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
      {
        logo1: 1,
        logo2: 2,
        tiso: "2:1",
        name1: "Manchester United",
        name2: "Manchester City",
        nameTourn: "Trận đấu Cup 2025",
        time: "11/09/2025 , Manchester United Old Trafford",
      },
    ];
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
      idMatch.value = item;
    };
    return {
      StatusMatch,
      OpenUpdate,
      item,
      idMatch,
      OpenPopup,
      handleUpdate,
      handleDetail,
      listDataLeague,
      fnGetListMatchesSchedule,
      isLoading,
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
</style>