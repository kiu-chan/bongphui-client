<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Xem chi tiết kết quả trận đấu'"
    @toggle="$emit('toggle')"
   
  >
    <div class="flex justify-center flex-col items-center">
        <h3 class="text-lg font-extrabold">
            GIẢI BÓNG ĐÁ SINH VIÊN VĂN PHÒNG LẦN III NĂM 2025
        </h3>
        <h2 class="text-xl font-black mt-[30px]">
            KẾT QUẢ TRẬN ĐẤU
        </h2>
        <p class="text-base font-medium mt-[10px]">12:00 07-06-2025</p>
    </div>
    <div class="px-18 flex justify-center items-center mt-[20px]">
      <div class="grid grid-cols-3 gap-4">
        <div class="flex justify-center flex-col items-center gap-4">
            <img 
            class="w-[200px] h-[200px] object-contain "
            loading="lazy"
            src="../../../assets/img/Chelsea_FC.svg.png" alt="">
            <h2 class="text-lg font-extrabold">
                FC ĐOÀN KẾT
            </h2>
        </div>
        <div class="flex justify-center items-center text-8xl font-semibold">
            {{ homeScore }}-{{ awayScore }}
        </div>
        <div class="flex justify-center flex-col items-center gap-4">
            <img 
             class="w-[200px] h-[200px] object-contain "
            loading="lazy"
            src="../../../assets/img/Chelsea_FC.svg.png" alt="">
            <h2 class="text-lg font-extrabold">
                FC THUỶ CHUYÊN SỈ
            </h2>
        </div>
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
                {{item.numberOfPlayer !=null ? item.numberOfPlayer : 0  }}
                
              </td>
              <td class="px-4 py-2">
                {{ item.name }}
              </td>
              <td class="px-4 py-2">
                <!-- {{ item.reservePlayer }} -->Đá chính
              </td>
              <td class="px-4 py-2">
                {{ item.goals }}
              </td>
              <td class="px-4 py-2">
                {{ item.yellowCards }}
              </td>
              <td class="px-4 py-2">
                {{ item.redCards }}
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
                {{item.numberOfPlayer !=null ? item.numberOfPlayer : 0  }}
                
              </td>
              <td class="px-4 py-2">
                {{ item.name }}
              </td>
              <td class="px-4 py-2">
                <!-- {{ item.reservePlayer }} --> Dự bị
              </td>
              <td class="px-4 py-2">
                {{ item.goals }}
              </td>
              <td class="px-4 py-2">
                {{ item.yellowCards }}
              </td>
              <td class="px-4 py-2">
                {{ item.redCards }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </popUpFull>
</template>

<script lang="ts">
import popUpFull from "../../library/popupFull/index.vue";
import inputNebula from "../../library/input/index.vue";
import dateTimePicker from "../../library/dateTimePicker/index.vue";

import { usePlayerStore } from "../../../store/player";
import { useMatchStore } from "../../../store/matchManger";

interface Player {
  numberOfPlayer: number;
  name: string;
  goals: number;
  yellowCards: number;
  redCards: number;
}
export default defineComponent({
  components: {
    popUpFull,
    inputNebula,
    dateTimePicker,
  },
  props: {
    openPopup: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
   
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, id } = toRefs(props);
    const PlayerStore = usePlayerStore();
    const openPlayer: Ref<boolean> = ref(false);
    const homeScore: Ref<number | undefined> = ref();
    const awayScore: Ref<number | undefined> = ref();
    const matchDateTime: Ref<string> = ref("");
    const refereeName: Ref<string> = ref("");
    const player1: Ref<Array<Player>> = ref([]);
    const player2: Ref<Array<Player>> = ref([]);
    const dataPlayer: Ref<Array<any>> = ref([]);
    const awayName:Ref<string> = ref("");
    const homeName:Ref<string> = ref("");
    const toast = useToast();

    watch(openPopup, (_new) => {
      if (_new) {
        fnGetPlayer();
      }
    });
    const fnGetPlayer = () => {
      PlayerStore.fnGetPlayerMatch(22)
        .then((res: any) => {
          player1.value = res.playerTeam1;
          player2.value = res.playerTeam2;
          awayScore.value = res.awayScore;
          homeScore.value = res.homeScore;
          matchDateTime.value = res.matchDateTime;
          refereeName.value = res.refereeName;
          homeName.value =res.teamHomeName;
          awayName.value =res.teamAwayName;

        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      openPlayer,
      homeScore,
      awayScore,
      dataPlayer,
      refereeName,
      matchDateTime,
      homeName,
      awayName,
      player1,
      player2,
      location,
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
