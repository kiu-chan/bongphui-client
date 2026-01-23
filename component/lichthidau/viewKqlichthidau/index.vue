<template>
  <popUpFull
    :open="openPopup"
    :width="700"
    :title="'Xem chi tiết kết quả trận đấu'"
    @toggle="handleTongle()"
  >
    <div class="flex justify-center flex-col items-center">
      <h3 class="text-lg font-extrabold">
        GIẢI BÓNG ĐÁ SINH VIÊN VĂN PHÒNG LẦN III NĂM 2025
      </h3>
      <h2 class="text-xl font-black mt-[30px]">KẾT QUẢ TRẬN ĐẤU</h2>
      <p class="text-base font-medium mt-[10px]">12:00 07-06-2025</p>
    </div>
    <div class="px-18 flex justify-center items-center mt-[20px]">
      <div class="grid grid-cols-3 gap-[70px]">
        <div class="flex justify-center flex-col items-center gap-4">
          <img
            class="w-[200px] h-[200px] object-contain"
            loading="lazy"
            :src="
              logoHome != null
                ? logoHome
                : '../../../assets/img/Chelsea_FC.svg.png'
            "
            alt=""
          />
          <h2 class="text-lg font-extrabold">FC {{ homeName }}</h2>
        </div>
        <div class="flex justify-center items-center text-8xl font-semibold">
          <p>{{ homeScore }}</p>
          <p>-</p>
          <p>{{ awayScore }}</p>
        </div>
        <div class="flex justify-center flex-col items-center gap-4">
          <img
            class="w-[200px] h-[200px] object-contain"
            loading="lazy"
            :src="
              logoAway != null
                ? logoAway
                : '../../../assets/img/Chelsea_FC.svg.png'
            "
            alt=""
          />
          <h2 class="text-lg font-extrabold">FC {{ awayName }}</h2>
        </div>
      </div>
    </div>
    <div class="p-5 grid grid-cols-2 gap-12">
      <div class="col-span-1">
        <div v-for="(item, index) in player1" :key="index">
          <div class="flex justify-end gap-3">
            <div clas="mt-[20px]">
              <div v-if="item.title === 'Yellow'">🟨</div>
              <div v-else-if="item.title === 'Red'">🟥</div>
              <div v-else-if="item.title === 'Goal'">⚽</div>
              <div>{{ item.playerName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="flex justify-start">
          <div class="col-span-1">
            <div v-for="(item, index) in player2" :key="index">
              <div class="flex justify-end gap-4">
                <div class="mt-[20px]">
                  <div v-if="item.title === 'Yellow'">
                    🟨 {{ item.playerName }}
                  </div>
                  <div v-else-if="item.title === 'Red'">
                    🟥 {{ item.playerName }}
                  </div>
                  <div v-else-if="item.title === 'Goal'">
                    ⚽ {{ item.playerName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popUpFull>
</template>

<script lang="ts">
import popUpFull from "../../library/popupFull/index.vue";

// import { usePlayerStore } from "../../../store/player";
import { useMatchStore } from "../../../store/matchManger";

interface Player {
  highlightId: number;
  matchId: number;
  minute_given: string;
  playerId: number;
  playerName: string;
  teamName: string;
  title: string;
}
export default defineComponent({
  components: {
    popUpFull,
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
    const MatchStore = useMatchStore();
    const openPlayer: Ref<boolean> = ref(false);
    const homeScore: Ref<number | undefined> = ref();
    const awayScore: Ref<number | undefined> = ref();
    const logoHome: Ref<string> = ref("");
    const logoAway: Ref<string> = ref("");
    const matchDateTime: Ref<string> = ref("");
    const refereeName: Ref<string> = ref("");
    const player1: Ref<Array<Player>> = ref([]);
    const player2: Ref<Array<Player>> = ref([]);
    const dataPlayer: Ref<Array<any>> = ref([]);
    const awayName: Ref<string> = ref("");
    const homeName: Ref<string> = ref("");
    const toast = useToast();

    watch(openPopup, (_new) => {
      if (_new) {
        fnGetPlayer();
      }
    });
    const handleTongle = () => {
      player1.value = [];
      player2.value = [];
      ctx.emit("toggle");
    };
    const fnGetPlayer = () => {
      MatchStore.fnMatchDetail(id.value)
        .then((res: any) => {
          console.log(res, "Tiên Chính");
          // player1.value = res.playerTeam1;
          // player2.value = res.playerTeam2;
          awayScore.value = res.awayScore;
          homeScore.value = res.homeScore;
          matchDateTime.value = res.matchDateTime;
          refereeName.value = res.refereeName;
          homeName.value = res.homeTeam.name;
          awayName.value = res.awayTeam.name;
          logoHome.value = res.homeTeam.logoUrl;
          logoAway.value = res.awayTeam.logoUrl;
          res.highlights.forEach((h) => {
            if (h.teamName === homeName.value) {
              player1.value.push(h);
            } else if (h.teamName === awayName.value) {
              player2.value.push(h);
            }
          });
          console.log(player1.value, "tien chinh");
          console.log(player2.value, "tien chinh2");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      logoHome,
      logoAway,
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
      handleTongle,
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
