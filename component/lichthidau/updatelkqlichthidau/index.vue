<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Cập nhật kết quả trận đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams()"
  >
    <!-- Scores Input - Responsive -->
    <div class="p-3 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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

    <!-- MVP Selection -->
    <div class="w-full flex justify-end px-3 md:px-5 pb-3 md:pb-5">
      <SelectNebula
        class="w-full md:w-auto"
        :name="'MVP của trận đấu'"
        v-model="mvpPlayerId"
        :statusMatch="mvpPLayer"
      />
    </div>

    <!-- Players List - Responsive -->
    <div class="p-3 md:p-5">
      <div class="flex justify-center mb-4 font-bold text-base md:text-lg">DANH SÁCH THI ĐẤU</div>
      
      <!-- Mobile View -->
      <div class="block md:hidden space-y-6">
        <!-- Team 1 -->
        <div>
          <h3 class="font-bold text-center mb-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white py-2 rounded">
            Đội: {{ awayName }}
          </h3>
          <div class="space-y-3">
            <div v-for="(item, index) in player1" :key="index" class="bg-gray-50 p-3 rounded-lg">
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <label class="text-gray-600 text-xs">Số áo:</label>
                  <input
                    type="number"
                    v-model.number="item.numberOfPlayer"
                    placeholder="Số áo"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">Họ tên:</label>
                  <input
                    v-model="item.name"
                    placeholder="Họ tên"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">⚽ Bàn thắng:</label>
                  <input
                    type="number"
                    v-model.number="item.totalGoals"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">🟨 Thẻ vàng:</label>
                  <input
                    type="number"
                    v-model.number="item.yellowCards"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div class="col-span-2">
                  <label class="text-gray-600 text-xs">🟥 Thẻ đỏ:</label>
                  <input
                    type="number"
                    v-model.number="item.redCards"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Team 2 -->
        <div>
          <h3 class="font-bold text-center mb-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white py-2 rounded">
            Đội: {{ homeName }}
          </h3>
          <div class="space-y-3">
            <div v-for="(item, index) in player2" :key="index" class="bg-gray-50 p-3 rounded-lg">
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <label class="text-gray-600 text-xs">Số áo:</label>
                  <input
                    type="number"
                    v-model.number="item.numberOfPlayer"
                    placeholder="Số áo"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">Họ tên:</label>
                  <input
                    v-model="item.name"
                    placeholder="Họ tên"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">⚽ Bàn thắng:</label>
                  <input
                    type="number"
                    v-model.number="item.totalGoals"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div>
                  <label class="text-gray-600 text-xs">🟨 Thẻ vàng:</label>
                  <input
                    type="number"
                    v-model.number="item.yellowCards"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
                <div class="col-span-2">
                  <label class="text-gray-600 text-xs">🟥 Thẻ đỏ:</label>
                  <input
                    type="number"
                    v-model.number="item.redCards"
                    placeholder="0"
                    class="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View - Keep original table layout -->
      <div class="hidden md:block">
        <div class="grid grid-cols-2 gap-8">
          <div class="flex justify-center font-semibold mb-2">Đội: {{ awayName }}</div>
          <div class="flex justify-center font-semibold mb-2">Đội: {{ homeName }}</div>
        </div>
        
        <div class="grid grid-cols-2 gap-8">
          <!-- Team 1 Table -->
          <div class="col-span-1">
            <table class="min-w-full rounded-xl shadow overflow-hidden">
              <thead
                style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
                class="text-white"
              >
                <tr>
                  <th class="px-4 py-2 text-center w-[100px]">Số áo</th>
                  <th class="px-4 py-2">Họ và tên</th>
                  <th class="px-4 py-2 text-center w-[60px]">Bàn thắng</th>
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
                    <input
                      type="number"
                      v-model.number="item.totalGoals"
                      placeholder="0"
                      class="w-full border-b focus:outline-none bg-transparent"
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      v-model.number="item.yellowCards"
                      placeholder="0"
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

          <!-- Team 2 Table -->
          <div class="col-span-1">
            <table class="min-w-full rounded-xl shadow overflow-hidden">
              <thead
                style="background: linear-gradient(90deg, #e97552 0%, #a949cf 100%)"
                class="text-white"
              >
                <tr>
                  <th class="px-4 py-2 text-center w-[100px]">Số áo</th>
                  <th class="px-4 py-2">Họ và tên</th>
                  <th class="px-4 py-2 text-center w-[60px]">Bàn thắng</th>
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
                    <input
                      type="number"
                      v-model.number="item.totalGoals"
                      placeholder="0"
                      class="w-full border-b focus:outline-none bg-transparent"
                    />
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      v-model.number="item.yellowCards"
                      placeholder="0"
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
        </div>
      </div>
    </div>
  </popUpFull>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, type Ref, type PropType } from "vue";
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
  player_id?: number;
  teamId: number;
  numberOfPlayer: number;
  reservePlayer: number;
  totalGoals?: number | string;
  yellowCards?: number | string;
  redCards?: number | string;
  name?: string;
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
      type: Object as PropType<{ id: number; homeTeam: string; awayTeam: string }>,
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
    const homeId: Ref<number> = ref(0);
    const awayId: Ref<number> = ref(0);
    const player1 = ref<Player[]>([]);
    const player2 = ref<Player[]>([]);
    const allPlayers = ref<Player[]>([]);
    const mvpPlayerId = ref<number>();
    const mvpPLayer = ref<mvpPlayer[]>([]);

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
            res[teamNames[0]].map((item: any) => {
              return {
                ...item,
                teamId: awayId.value,
              };
            }) || [];
          player2.value =
            res[teamNames[1]].map((item: any) => {
              return {
                ...item,
                teamId: homeId.value,
              };
            }) || [];
        })
        .catch((err) => {
          console.error("Error in fnGetPlayer:", err);
        });
    };

const fnAddTeams = () => {
  const postBody: any = {};
  
  if (homeScore.value !== undefined && homeScore.value !== null && homeScore.value !== "") {
    postBody.homeScore = Number(homeScore.value);
  }
  
  if (awayScore.value !== undefined && awayScore.value !== null && awayScore.value !== "") {
    postBody.awayScore = Number(awayScore.value);
  }
  
  if (postBody.homeScore !== undefined && postBody.awayScore !== undefined) {
    if (postBody.homeScore > postBody.awayScore) {
      postBody.teamWinner = homeId.value;
    } else if (postBody.awayScore > postBody.homeScore) {
      postBody.teamWinner = awayId.value;
    }
  }
  
  allPlayers.value = [...player1.value, ...player2.value];
  const goals: any[] = [];
  const cards: any[] = [];
  
  allPlayers.value.forEach((player) => {
    const teamId = player.teamId ?? 0;
    const playerId = player?.player_id ?? player?.playerId ?? 0;

    if (player.totalGoals && Number(player.totalGoals) > 0) {
      for (let i = 0; i < Number(player.totalGoals); i++) {
        goals.push({
          playerId: playerId,
          playerName: player.name ?? "",
          teamId,
          goalTime: "",
          numberOfPlayer: player.numberOfPlayer ?? 0,
          reservePlayer: player.reservePlayer ?? 0,
        });
      }
    }

    if (player.yellowCards && Number(player.yellowCards) > 0) {
      for (let i = 0; i < Number(player.yellowCards); i++) {
        cards.push({
          playerId: playerId,
          playerName: player.name ?? "",
          cardTypeId: 1,
          minuteGiven: "",
          numberOfPlayer: player.numberOfPlayer ?? 0,
          reservePlayer: player.reservePlayer ?? 0,
        });
      }
    }

    if (player.redCards && Number(player.redCards) > 0) {
      for (let i = 0; i < Number(player.redCards); i++) {
        cards.push({
          playerId: playerId,
          playerName: player.name ?? "",
          cardTypeId: 2,
          minuteGiven: "",
          numberOfPlayer: player.numberOfPlayer ?? 0,
          reservePlayer: player.reservePlayer ?? 0,
        });
      }
    }
  });

  if (goals.length > 0) {
    postBody.goals = goals;
  }
  
  if (cards.length > 0) {
    postBody.cards = cards;
  }
  
  if (mvpPlayerId.value && mvpPlayerId.value > 0) {
    postBody.mvpPlayerId = mvpPlayerId.value;
  }

  MatchStore.fnUpdateMatchesTeam(StatusMatch.value.id, postBody)
    .then((res) => {
      return MatchStore.fnUpdateMatchStatus(
        StatusMatch.value.id,
        "?status=COMPLETED"
      );
    })
    .then((res) => {
      if (postBody.teamWinner) {
        return MatchStore.fnCompleteMatch(
          StatusMatch.value.id,
          postBody.teamWinner
        );
      }
    })
    .then((res) => {
      toast.success({
        message: "Cập nhật kết quả thành công",
        position: "topRight",
      });
      ctx.emit("toggle");
      ctx.emit("success");
    })
    .catch((err) => {
      toast.error({
        message: "Cập nhật thất bại: " + (err?.response?.data?.message || err?.message || err),
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
          console.error("Error in fnMatchDetail:", err);
        });
    };
    
    return {
      homeScore,
      homeName,
      awayName,
      awayScore,
      player1,
      player2,
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