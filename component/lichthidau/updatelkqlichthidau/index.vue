<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Cập nhật kết quả trận đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams()"
  >
    <div class="p-5 grid grid-cols-2 gap-8">
      <InputForm
        class="col-span-1"
        :name="awayName"
        :placeHolder="'Tỉ số đội ' + awayName"
        v-model="awayScore"
      />

      <InputForm
        class="col-span-1"
        :name="homeName"
        :placeHolder="'Tỉ số đội ' + homeName"
        v-model="homeScore"
      />
    </div>
    <div class="w-full flex justify-end p-5">
      <SelectNebula
        class="col-span-1"
        :name="'MVP của trận đấu'"
        v-model="mvpPlayerId"
        :statusMatch="mvpPLayer"
      />
    </div>
    <div class="p-5 grid grid-cols-2 gap-8">
      <div class="col-span-2 flex justify-center">DANH SÁCH THI ĐẤU</div>
      <div class="col-span-2 flex justify-around">
        <h2>Đội : {{ awayName }}</h2>
        <h2>Đội : {{ homeName }}</h2>
      </div>
      <div class="col-span-1">
        <table class="min-w-full rounded-xl shadow overflow-hidden">
          <thead
            style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
            class="text-white"
          >
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
                  v-model.number="item.totalGoals"
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
        <table class="min-w-full rounded-xl shadow overflow-hidden">
          <thead
            style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
            class="text-white"
          >
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
        <InputForm :name="'Tìm kiếm cầu thủ'" v-model="name" />
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
import InputForm from "../../library/input/index.vue";
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
  playerName: string;
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
  cards: Card[];
  mvpPlayerId: number;
  teamWinner: number | null;
  homeScore: number;
  awayScore: number;
}

export default defineComponent({
  components: {
    popUpFull,
    InputForm,
    SelectNebula,
  },
  props: {
    openPopup: Boolean,
    StatusMatch: {
      type: Array as PropType<
        Array<{ id: number; homeTeam: string; awayTeam: string }>
      >,
      required: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, StatusMatch } = toRefs(props);
    const PlayerStore = usePlayerStore();
    const MatchStore = useMatchStore();
    const toast = useToast();
    const homeScore = ref<number | undefined>();
    const homeName: Ref<string> = ref("");
    const awayName: Ref<string> = ref("");
    const awayScore = ref<number | undefined>();
    const homeId: Ref<number> = ref();
    const awayId: Ref<number> = ref();
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
      cards: [],
      mvpPlayerId: 0,
      teamWinner: null,
      homeScore: 0,
      awayScore: 0,
    };

    watch(openPopup, (newVal) => {
      if (newVal) {
        fnGetPlayer();
        fnMatchDetail();
      }
    });
    const fnGetPlayer = () => {
      MatchStore.fnGetPlayerManger(StatusMatch.value.id)
        .then((res) => {
          const teamNames = Object.keys(res);

          player1.value =
            res[teamNames[0]].map((item) => {
              return {
                ...item,
                teamId: awayId.value,
              };
            }) || [];
          player2.value =
            res[teamNames[1]].map((item) => {
              return {
                ...item,
                teamId: homeId.value,
              };
            }) || [];
          console.log(player1.value, "chinh1");
          console.log(player2.value, "chinh2");

          // console.log(res, "chính");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fnAddTeams = () => {
      postBody.mvpPlayerId = mvpPlayerId.value ?? 2;
      postBody.homeScore = Number(homeScore.value);
      postBody.awayScore = Number(awayScore.value);
      allPlayers.value = [...player1.value, ...player2.value];
      console.log(postBody, "chínhdzzzz");
      allPlayers.value.forEach((player) => {
        const teamId = player.teamId ?? 0;

        if (player.totalGoals && Number(player.totalGoals) > 0) {
          postBody.goals.push({
            id: 0,
            playerName: player.name,
            playerId: player?.player_id,
            teamId,
            goalTime: "",
            goalAssistPlayerId: 0,
            numberOfPlayer: player.numberOfPlayer ?? 0,
            reservePlayer: player.reservePlayer ?? 0,
          });
        }

        // if (player.redCards && Number(player.redCards) > 0) {
        //   postBody.redCard.push({
        //     id: 0,
        //     playerId: player.playerId,
        //     cardTypeId: 2,
        //     minuteGiven: "",
        //     numberOfPlayer: player.numberOfPlayer,
        //     reservePlayer: player.reservePlayer,
        //   });
        // }
      });

      MatchStore.fnUpdateMatchesTeam(StatusMatch.value.id, postBody)
        .then((res) => {
          toast.success({
            message: res,
            position: "topRight",
          });
          ctx.emit("toggle");
          ctx.emit("success");
        })
        .catch((err) => {
          toast.success({
            message: err,
            position: "topRight",
          });
        });
    };
    const fnMatchDetail = () => {
      MatchStore.fnMatchDetail(StatusMatch.value.id)
        .then((res) => {
          homeScore.value = res.homeScore;
          awayScore.value = res.awayScore;
          awayName.value = res.awayTeam.name;
          homeName.value = res.homeTeam.name;
          awayId.value = res.awayTeam.id;
          homeId.value = res.homeTeam.id;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };
    return {
      openPlayer: ref(false),
      homeScore,
      homeName,
      awayName,
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
</style>
