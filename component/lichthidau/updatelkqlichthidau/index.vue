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
  playerName: string;
  cardTypeId: number;
  minuteGiven: string;
  numberOfPlayer: number;
  reservePlayer: number;
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
    const matchDateTime = ref<string>("");
    const refereeName = ref<string>("");
    const player1 = ref<Player[]>([]);
    const player2 = ref<Player[]>([]);
    const allPlayers = ref<Player[]>([]);
    const mvpPlayerId = ref<number>();
    const mvpPLayer = ref<mvpPlayer[]>([]);
    const location = ref("Sân A vs B");

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
          
          console.log("========== PLAYER DATA ==========");
          console.log("Player 1 (Away Team):", player1.value);
          console.log("Player 2 (Home Team):", player2.value);
          console.log("=================================");
        })
        .catch((err) => {
          console.error("Error in fnGetPlayer:", err);
        });
    };

const fnAddTeams = () => {
  // Khởi tạo postBody rỗng
  const postBody: any = {};
  
  // Chỉ thêm homeScore nếu có giá trị
  if (homeScore.value !== undefined && homeScore.value !== null && homeScore.value !== "") {
    postBody.homeScore = Number(homeScore.value);
  }
  
  // Chỉ thêm awayScore nếu có giá trị
  if (awayScore.value !== undefined && awayScore.value !== null && awayScore.value !== "") {
    postBody.awayScore = Number(awayScore.value);
  }
  
  // Xác định đội thắng (chỉ khi có cả 2 tỉ số)
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

    // Thêm bàn thắng
    if (player.totalGoals && Number(player.totalGoals) > 0) {
      for (let i = 0; i < Number(player.totalGoals); i++) {
        const goal: any = {
          playerId: playerId,
          playerName: player.name ?? "",
          teamId,
          goalTime: "",
          numberOfPlayer: player.numberOfPlayer ?? 0,
          reservePlayer: player.reservePlayer ?? 0,
        };
        
        // Chỉ thêm goalAssistPlayerId nếu có giá trị thực
        // Không gửi nếu = 0 hoặc không có
        // Backend sẽ tự xử lý trường này
        
        goals.push(goal);
      }
    }

    // Thêm thẻ vàng
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

    // Thêm thẻ đỏ
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

  // Chỉ thêm goals nếu có dữ liệu
  if (goals.length > 0) {
    postBody.goals = goals;
  }
  
  // Chỉ thêm cards nếu có dữ liệu
  if (cards.length > 0) {
    postBody.cards = cards;
  }
  
  // Chỉ thêm mvpPlayerId nếu có giá trị
  if (mvpPlayerId.value && mvpPlayerId.value > 0) {
    postBody.mvpPlayerId = mvpPlayerId.value;
  }

  console.log("========== REQUEST DATA ==========");
  console.log("Match ID:", StatusMatch.value.id);
  console.log("Home Team ID:", homeId.value);
  console.log("Away Team ID:", awayId.value);
  console.log("Winner Team ID:", postBody.teamWinner);
  console.log("POST BODY:", JSON.stringify(postBody, null, 2));
  console.log("Fields sent:", Object.keys(postBody));
  console.log("==================================");

  // 1. Cập nhật kết quả trận đấu
  MatchStore.fnUpdateMatchesTeam(StatusMatch.value.id, postBody)
    .then((res) => {
      console.log("========== STEP 1: Update Match Result ==========");
      console.log("Response:", res);
      console.log("=================================================");
      
      // 2. Cập nhật status thành COMPLETED
      return MatchStore.fnUpdateMatchStatus(
        StatusMatch.value.id,
        "?status=COMPLETED"
      );
    })
    .then((res) => {
      console.log("========== STEP 2: Update Status ==========");
      console.log("Response:", res);
      console.log("===========================================");
      
      // 3. Kết thúc trận đấu
      if (postBody.teamWinner) {
        console.log("========== STEP 3: Complete Match ==========");
        console.log("Winner ID:", postBody.teamWinner);
        console.log("============================================");
        return MatchStore.fnCompleteMatch(
          StatusMatch.value.id,
          postBody.teamWinner
        );
      }
    })
    .then((res) => {
      console.log("========== FINAL RESULT ==========");
      console.log("Response:", res);
      console.log("==================================");
      
      toast.success({
        message: "Cập nhật kết quả thành công",
        position: "topRight",
      });
      ctx.emit("toggle");
      ctx.emit("success");
    })
    .catch((err) => {
      console.log("========== ERROR ==========");
      console.error("Error details:", err);
      console.error("Error response:", err?.response);
      console.error("Error data:", err?.response?.data);
      console.error("Error status:", err?.response?.status);
      console.error("Error message:", err?.message);
      console.log("===========================");
      
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
          
          console.log("========== MATCH DETAIL ==========");
          console.log("Match ID:", StatusMatch.value.id);
          console.log("Home Team:", res.homeTeam);
          console.log("Away Team:", res.awayTeam);
          console.log("Current Score:", res.homeScore, "-", res.awayScore);
          console.log("==================================");
        })
        .catch((err) => {
          console.error("Error in fnMatchDetail:", err);
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