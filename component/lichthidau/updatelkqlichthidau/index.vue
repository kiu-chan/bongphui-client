<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Cập nhật kết quả trận đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams()"
  >
    <div class="p-5 grid grid-cols-4 gap-8">
      <dateTimePicker
        class="col-span-1"
        :name="'Thời gian thi đấu của 2 đội'"
        v-model="matchDateTime"
      />
      <SelectNebula class="col-span-1" 
        :name="'MVP của trận đấu'"
        v-model="mvpPlayerId"
        :statusMatch="mvpPLayer"/>
      <inputNebula class="col-span-1" :name="'Địa điểm'"  />
      <inputNebula
        class="col-span-1"
        :name="'Trọng tài bắt chính'"
        v-model="refereeName"
      />
    </div>
    <div class="px-20 flex justify-center items-center">
      <div class="grid grid-cols-5 gap-4">
        <inputNebula class="col-span-2" :name="homeName" v-model="homeScore" />
        <span
          class="text-white font-semibold flex justify-center items-center text-xl col-span-1"
          >vs</span
        >
        <inputNebula class="col-span-2" :name="awayName" v-model="awayScore" />
      </div>
    </div>
    <div class="p-5 grid grid-cols-2 gap-8">
      <div class="col-span-2 flex justify-center">DANH SÁCH THI ĐẤU</div>
      <div class="col-span-2 flex justify-around">
        <h2>Đội : {{ homeName }}</h2>
        <h2>Đội : {{ awayName }}</h2>
      </div>
      <div class="col-span-1">
        <table class="min-w-full rounded-xl shadow">
          <thead class="">
            <tr>
              <th class="px-4 py-2 text-center w-[100px]">Số áo</th>
              <th class="px-4 py-2">Họ và tên</th>
              <th class="px-4 py-2 text-center text-center w-[200px]">
                Đá chính/Dự bị
              </th>
              <th class="px-4 py-2 text-center w-[60px]">bàn thắng</th>
              <th class="px-4 py-2 w-[60px]">Thẻ vàng</th>
              <th class="px-4 py-2 text-center w-[60px]">Thẻ đỏ</th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="(item, index) in player1" :key="index">
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.numberOfPlayer"
                  placeholder="số áo"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  v-model="item.name"
                  placeholder=""
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <select name="" id="" class="nebula-dark-select">
                  <option value="">Đá chính</option>
                  <option value="">Dự bị</option>
                </select>
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.goals"
                  placeholder="stt"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.yellowCards"
                  placeholder="stt"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.redCards"
                  placeholder="0"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-span-1">
        <table class="min-w-full rounded-xl shadow">
          <thead class="">
            <tr>
              <th class="px-4 py-2 text-center w-[100px]">Số áo</th>
              <th class="px-4 py-2">Họ và tên</th>
              <th class="px-4 py-2 text-center text-center w-[200px]">
                Đá chính/Dự bị
              </th>
              <th class="px-4 py-2 text-center w-[60px]">bàn thắng</th>
              <th class="px-4 py-2 w-[60px]">Thẻ vàng</th>
              <th class="px-4 py-2 text-center w-[60px]">Thẻ đỏ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in player2" :key="index">
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.numberOfPlayer"
                  placeholder="số áo"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  v-model="item.name"
                  placeholder=""
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <select name="" id="" class="nebula-dark-select">
                  <option value="">Đá chính</option>
                  <option value="">Dự bị</option>
                </select>
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.goals"
                  placeholder="stt"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.yellowCards"
                  placeholder="stt"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="number"
                  v-model.number="item.redCards"
                  placeholder="0"
                  class="w-full border-b focus:outline-none bg-transparent"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div
        class="col-span-2"
        :style="{
          height: 700 + 'px',
        }"
      >
        <inputNebula :name="'Tìm kiếm cầu thủ'" v-model="name" />
        <div
          class="app-container container mx-auto mt-[58px] px-4 sm:px-6 md:mt-16 grid w-full gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 2xl:gap-8"
        >
          <div
            class="box-item relative"
            v-for="(item, index) in filteredTeam"
            :key="index"
          >
            <div
              class="box-item__card z-[100] bg-[hsl(210_9.09%_4.31%)] h-[304px] w-full flex flex-wrap items-center justify-center rounded-2xl p-4 sm:rounded-[15px] overflow-hidden"
            >
              <Icon
                name="hugeicons:pencil-edit-02"
                @click="fnGet(item.player_id)"
                class="icon checkbox absolute top-[20px] right-[10px] w-[18px] h-[18px]"
                width="12"
                height="12"
                style="color: #258e26"
              />

              <div
                class="flex items-center w-full justify-center box-item__card2"
              >
                <img
                  loading="lazy"
                  class="w-[170px] h-[170px] object-contain logoGreen"
                  src="../../../assets/img/Chelsea_FC.svg.png"
                  alt="logo"
                />
              </div>
              <div>
                <p
                  class="text-2xl font-semibold text-secondary w-[full] text-center"
                >
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    
  </popUpFull>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import popUpFull from "../../library/popupFull/index.vue";
import inputNebula from "../../library/input/index.vue";
import dateTimePicker from "../../library/dateTimePicker/index.vue";
import SelectNebula from "../../library/selectNebula/index.vue";
import { usePlayerStore } from "../../../store/player";
import { useMatchStore } from "../../../store/matchManger";


interface mvpPlayer {
  id: number;
  name: string;
}

interface Player {
  playerId: number;
  teamId: number;
  numberOfPlayer: number;
  reservePlayer: number;
  goals?: number | string;
  yellowCards?: number | string;
  redCards?: number | string;
  name?: string;
}

interface Goal {
  id: number;
  playerId: number;
  teamId: number;
  goalTime: string;
  goalAssistPlayerId: number;
  numberOfPlayer: number;
  reservePlayer: number;
}

interface Card {
  id: number;
  playerId: number;
  cardTypeId: number;
  minuteGiven: string;
  numberOfPlayer: number;
  reservePlayer: number;
}

interface PostBody {
  goals: Goal[];
  yellowCard: Card[];
  redCard: Card[];
  mvp: number;
  matchDateTime: string;
  location: string;
  refId: number;
}

export default defineComponent({
  components: {
    popUpFull,
    inputNebula,
    dateTimePicker,
    SelectNebula,
  },
  props: {
    openPopup: Boolean,
    id: Number,
    homeName: String,
    awayName: String,
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, id } = toRefs(props);
    const PlayerStore = usePlayerStore();
    const MatchStore = useMatchStore();
    const toast = useToast();

    const homeScore = ref<number>();
    const awayScore = ref<number>();
    const matchDateTime = ref<string>("");
    const refereeName = ref<string>("");
    const player1 = ref<Player[]>([]);
    const player2 = ref<Player[]>([]);
    const allPlayers = ref<Player[]>([]);
    const mvpPlayerId = ref<number>();
    const mvpPLayer = ref<mvpPlayer[]>([]);
    const location = ref("Sân A vs B");

    const postBody: PostBody = {
      goals: [],
      yellowCard: [],
      redCard: [],
      mvp: 0,
      matchDateTime: new Date().toISOString(),
      location: location.value,
      refId: 1,
    };

    watch(openPopup, (newVal) => {
      if (newVal) fnGetPlayer();
    });

    const fnGetPlayer = () => {
      PlayerStore.fnGetPlayerMatch(22)
        .then((res: any) => {
          player1.value = res.playerTeam1.map((p: any) => ({ ...p, teamId: res.team1Id }));
          player2.value = res.playerTeam2.map((p: any) => ({ ...p, teamId: res.team2Id }));
          allPlayers.value = [...player1.value, ...player2.value];

          homeScore.value = res.homeScore;
          awayScore.value = res.awayScore;
          matchDateTime.value = res.matchDateTime;
          refereeName.value = res.refereeName;

          mvpPLayer.value = allPlayers.value.map((item) => ({
            id: item.playerId,
            name: item.name || ""
          }));
        })
        .catch((err) => console.error(err));
    };

    const fnAddTeams = () => {
      postBody.mvp = mvpPlayerId.value ?? 0;
      postBody.matchDateTime = matchDateTime.value;
      postBody.location = location.value;

      allPlayers.value.forEach((player) => {
        const teamId = player.teamId ?? 0;

        if (player.goals && Number(player.goals) > 0) {
          postBody.goals.push({
            id: 0,
            playerId: player.playerId,
            teamId,
            goalTime: "",
            goalAssistPlayerId: 0,
            numberOfPlayer: player.numberOfPlayer,
            reservePlayer: player.reservePlayer,
          });
        }

        if (player.yellowCards && Number(player.yellowCards) > 0) {
          postBody.yellowCard.push({
            id: 0,
            playerId: player.playerId,
            cardTypeId: 1,
            minuteGiven: "",
            numberOfPlayer: player.numberOfPlayer,
            reservePlayer: player.reservePlayer,
          });
        }

        if (player.redCards && Number(player.redCards) > 0) {
          postBody.redCard.push({
            id: 0,
            playerId: player.playerId,
            cardTypeId: 2,
            minuteGiven: "",
            numberOfPlayer: player.numberOfPlayer,
            reservePlayer: player.reservePlayer,
          });
        }
      });

      MatchStore.fnUpdateMatches(22, postBody)
        .then(() => {
          toast.success("Thêm dữ liệu thành công", { position: "topRight" });
          ctx.emit("toggle");
          ctx.emit("success");
        })
        .catch(() => {
          toast.error("Thêm dữ liệu thất bại", { position: "topRight" });
        });
    };

    return {
      openPlayer: ref(false),
      homeScore,
      awayScore,
      refereeName,
      matchDateTime,
      player1,
      player2,
      location,
      mvpPlayerId,
      mvpPLayer,
      fnAddTeams,
    };
  },
});
</script>
<style scoped>
th,
td {
  padding: 20px 20px;
  text-align: center;
}
table,
th,
td {
  border: 1px solid var(--textsport4);
  border-collapse: collapse;
}
.nebula-dark-select option {
  background-color: #00000f;
  color: white;
}
</style>
