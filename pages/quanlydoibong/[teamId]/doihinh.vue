<template>
  <headerDoibong :stt="3">
    <!-- Container responsive -->
    <div class="w-full px-2 md:px-4 py-4">
      <!-- Desktop: Grid 3 columns -->
      <!-- Mobile: Stack vertically -->
      <div
        style="background: rgba(250, 249, 249, 1); border-radius: 27px;"
        class="w-full p-3 md:p-5 grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <!-- Main Squad Builder - Full width on mobile, 2/3 on desktop -->
        <div
          style="
            background: linear-gradient(88.96deg, #db6b6b 3.27%, #c45a9b 98.78%);
            border-radius: 27px;
          "
          class="lg:col-span-2 relative w-full min-h-[500px] md:min-h-[773px]"
        >
          <div
            style="padding-top: 20px; padding-bottom: 20px; color: rgba(255, 255, 255, 1);"
            class="flex justify-center"
          >
            <h3 class="font-medium text-lg md:text-2xl">CLB Bóng đá ADS</h3>
          </div>
          
          <div style="border-radius: 27px" class="squadBuiderHpl w-full">
            <div class="flex flex-col justify-center items-center px-2">
              <!-- Squad Builder Field -->
              <div
                class="squadBuilder mt-4 md:mt-5 w-full max-w-[90vw] md:max-w-[628px]"
                :class="getSquadHeight"
                :style="{ backgroundImage: `url(${squadBuider})` }"
                ref="squadRef"
              >
                <div
                  v-for="(row, i) in listData?.dh?.dhRows"
                  :key="i"
                  :class="[row.class]"
                  class="row-position"
                >
                  <div
                    class="cardSquad cardSquadnth flex justify-center items-center"
                    v-for="(n, j) in row.cols"
                    :key="j"
                  >
                    <div class="flex flex-col items-center">
                      <img
                        class="w-16 h-14 md:w-[103px] md:h-[85px] object-contain cursor-pointer hover:scale-110 transition-transform"
                        :src="n.playerImage == null ? vector : n.playerImage"
                        @click="handlePositionNumber(n.positionNumber)"
                      />
                      <p
                        style="color: #fff"
                        class="font-medium text-xs md:text-sm text-center mt-1"
                      >
                        {{ n.playerName }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Coach & Formation Info -->
              <div class="w-full max-w-[90vw] md:max-w-[628px] mt-6 md:mt-10 mb-4">
                <div class="flex justify-between items-center px-2">
                  <div class="flex gap-2 items-center">
                    <div class="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden">
                      <img class="w-full h-full object-cover" :src="hlv" alt="" />
                    </div>
                    <div>
                      <p class="text-xs md:text-sm text-gray-600">HLV</p>
                      <p class="font-semibold text-sm md:text-base">Tuấn A</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs md:text-sm text-gray-600">Đội hình</p>
                    <p class="font-bold text-lg md:text-xl text-orange-600">{{ formationDisplay }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Full width on mobile, 1/3 on desktop -->
        <div class="lg:col-span-1 flex flex-col gap-4">
          <!-- Stadium Type Selector - Show first on mobile -->
          <div
            style="
              background: linear-gradient(90.2deg, #dd6c67 1.49%, #c158a0 97.72%);
              border-radius: 27px;
            "
            class="w-full relative order-1 lg:order-2"
          >
            <div
              style="color: rgba(255, 255, 255, 1); padding-top: 15px; padding-bottom: 15px;"
              class="flex justify-center"
            >
              <h3 class="font-medium text-lg md:text-xl">Chọn loại sân</h3>
            </div>
            <div
              style="background: rgba(255, 255, 255, 1); border-radius: 27px;"
              class="mx-3 mb-3 p-4 flex justify-around items-center gap-2"
            >
              <button
                v-for="(item, index) in stadium"
                :key="index"
                @click="handleStadium(item)"
                :class="[
                  'px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all',
                  sizeOfLineup === item.sizeOfLineup
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ item.title }}
              </button>
            </div>
          </div>

          <!-- Substitute Players -->
          <div
            style="
              background: linear-gradient(90.2deg, #dd6c67 1.49%, #c158a0 97.72%);
              border-radius: 27px;
            "
            class="w-full relative order-2 lg:order-1 min-h-[400px] md:min-h-[568px]"
          >
            <div
              style="padding-top: 15px; padding-bottom: 15px; color: rgba(255, 255, 255, 1);"
              class="flex justify-center"
            >
              <h3 class="font-medium text-lg md:text-xl">Cầu thủ dự bị</h3>
            </div>
            <div
              style="background: rgba(255, 255, 255, 1); border-radius: 27px;"
              class="mx-3 mb-3 p-3 overflow-y-auto max-h-[350px] md:max-h-[504px] dubi-mobile"
            >
              <div class="flex flex-wrap justify-center md:justify-between gap-2">
                <div
                  v-for="(item, index) in listData?.dh?.dhDubi"
                  :key="index"
                  class="cardGiaidau flex justify-center items-center cursor-pointer hover:scale-105 transition-transform"
                  @click="handleSwap(item.playerId)"
                >
                  <div class="flex flex-col items-center">
                    <img
                      class="w-16 h-12 md:w-[93px] md:h-[63px] object-contain"
                      :src="item.playerImage == null ? vector : item.playerImage"
                      alt=""
                    />
                    <h2
                      style="color: rgba(0, 0, 0, 1)"
                      class="font-medium text-xs md:text-sm text-center mt-1"
                    >
                      {{ item.playerName }}
                    </h2>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="!listData?.dh?.dhDubi || listData.dh.dhDubi.length === 0" class="text-center py-10">
                <Icon name="mdi:account-multiple-outline" class="text-gray-300 text-[48px] mb-2" />
                <p class="text-gray-500 text-sm">Chưa có cầu thủ dự bị</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions - Mobile only -->
      <div class="lg:hidden mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div class="flex items-start gap-2">
          <Icon name="mdi:information" class="text-blue-500 text-[24px] flex-shrink-0" />
          <div>
            <p class="font-semibold text-blue-900 text-sm mb-1">Hướng dẫn</p>
            <p class="text-blue-700 text-xs">
              • Chọn vị trí trên sân (click vào cầu thủ)<br>
              • Sau đó chọn cầu thủ dự bị để thay thế
            </p>
          </div>
        </div>
      </div>
    </div>
  </headerDoibong>
</template>

<script lang="ts">
import headerDoibong from "../../../component/detaildoibong/index.vue";
import squadBuider from "../../../assets/img/squadBuilder.png";
import hlv from "../../../assets/img/hlv.png";
import vector from "../../../assets/img/Vector 2971.png";
import placeholderImg from "../../../assets/img/placeholder-card-normal.webp";
import { useSquad } from "@/compasable/useFeildLayout";
import { useDH } from "@/compasable/useSquadDh";

import { useTeamStore } from "~/store/team";
interface LineUpPlayer {
  positionNumber: number | null;
  src: string | null;
  name: string;
}
interface LineUpRow {
  justify: string;
  cols: LineUpPlayer[];
}
interface LineUpData extends LineUp {
  ct: string;
  dh: LineUpRow[];
}
export default defineComponent({
  components: {
    headerDoibong,
  },
  setup() {
    const teamStore = useTeamStore();
    const listData: Ref<LineUpData | null> = ref(null);
    const itemPlayers = ref<any[]>([]);
    const DATA = ref();
    const toast = useToast();
    const PositionNumber: Ref<number | undefined> = ref();
    const sizeOfLineup: Ref<number> = ref(11);
    const stadium = ref([
      {
        id: 1,
        sizeOfLineup: 5,
        title: "Sân 5",
        ct: [2, 2, 1],
        possition: "position5",
      },
      {
        id: 2,
        sizeOfLineup: 7,
        title: "Sân 7",
        ct: [1, 3, 2, 1],
        possition: "position7",
      },
      {
        id: 3,
        sizeOfLineup: 11,
        title: "Sân 11",
        ct: [3, 3, 4, 1],
        possition: "position11",
      },
    ]);

    const formationDisplay = computed(() => {
      const current = stadium.value.find(s => s.sizeOfLineup === sizeOfLineup.value);
      return current?.ct.join('-') || '4-2-3-1';
    });

    const getSquadHeight = computed(() => {
      if (sizeOfLineup.value === 5) return 'h-[350px] md:h-[450px]';
      if (sizeOfLineup.value === 7) return 'h-[400px] md:h-[500px]';
      return 'h-[450px] md:h-[561px]';
    });

    onMounted(() => {
      fnGetListLineUp();
    });

    const fnGetListLineUp = () => {
      teamStore.fnGetTeamlineUp(2).then((res) => {
        DATA.value = res.players;
        listData.value = {
          dh: useDH(DATA.value, [3, 3, 4, 1], "position11"),
        };
      });
    };

    const handleStadium = (item) => {
      sizeOfLineup.value = item.sizeOfLineup;
      listData.value = {
        dh: useDH(DATA.value, item.ct, item.possition),
      };
    };

    const handleSwap = (id) => {
      if (!PositionNumber.value) {
        toast.error({
          message: "Vui lòng chọn vị trí trên sân trước",
          position: "topRight",
        });
        return;
      }

      const params = [
        id && `playerId1=${id}`,
        PositionNumber.value && `postitionNumber=${PositionNumber.value}`,
        sizeOfLineup.value && `sizeOfLineup=${sizeOfLineup.value}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      teamStore
        .fnSwaplineUp(url)
        .then((res) => {
          toast.success({
            message: res || "Thay cầu thủ thành công!",
            position: "topRight",
          });
          PositionNumber.value = undefined;
          fnGetListLineUp();
        })
        .catch((err) => {
          toast.error({
            message: err || "Có lỗi xảy ra, vui lòng thử lại",
            position: "topRight",
          });
        });
    };

    const handlePositionNumber = (item) => {
      PositionNumber.value = item;
      toast.success({
        message: `Đã chọn vị trí ${item}. Hãy chọn cầu thủ dự bị để thay thế`,
        position: "topRight",
      });
    };

    const squadRef = ref(null);

    return {
      squadBuider,
      hlv,
      itemPlayers,
      squadRef,
      stadium,
      handlePositionNumber,
      PositionNumber,
      placeholderImg,
      listData,
      handleStadium,
      vector,
      handleSwap,
      sizeOfLineup,
      formationDisplay,
      getSquadHeight,
    };
  },
});
</script>

<style scoped>
.squadBuiderHpl {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  overflow-y: auto;
}

.dubi-mobile {
  scrollbar-width: thin;
  scrollbar-color: #f97316 #f1f1f1;
}

.dubi-mobile::-webkit-scrollbar {
  width: 6px;
}

.dubi-mobile::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.dubi-mobile::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 10px;
}

.cardGiaidau {
  border-radius: 15px;
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  padding: 8px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .cardGiaidau {
    width: 90px;
    height: 110px;
  }
}

@media (min-width: 769px) {
  .cardGiaidau {
    width: 108px;
    height: 135px;
  }
}

.squadBuilder {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.row-position {
  display: flex;
  margin-bottom: 5px;
}

@media (min-width: 768px) {
  .row-position {
    margin-bottom: 10px;
  }
}

/* Position 11 */
.position11:nth-child(4) {
  justify-content: center;
}
.position11:nth-child(3) {
  justify-content: space-around;
}
.position11:nth-child(2) {
  justify-content: center;
  gap: 20px;
}
@media (min-width: 768px) {
  .position11:nth-child(2) {
    gap: 40px;
  }
}
.position11:nth-child(1) {
  justify-content: center;
  gap: 40px;
}
@media (min-width: 768px) {
  .position11:nth-child(1) {
    gap: 80px;
  }
}

/* Position 7 */
.position7:nth-child(4) {
  justify-content: center;
}
.position7:nth-child(3) {
  justify-content: center;
  gap: 40px;
}
@media (min-width: 768px) {
  .position7:nth-child(3) {
    gap: 80px;
  }
}
.position7:nth-child(2) {
  justify-content: space-around;
}
.position7:nth-child(1) {
  justify-content: center;
}

/* Position 5 */
.position5:nth-child(3) {
  justify-content: center;
  gap: 40px;
}
@media (min-width: 768px) {
  .position5:nth-child(3) {
    gap: 80px;
  }
}
.position5:nth-child(2) {
  justify-content: space-around;
}
.position5:nth-child(1) {
  justify-content: center;
}
</style>