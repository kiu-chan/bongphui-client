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
    <div
      style="
        background: rgba(250, 249, 249, 1);
        padding: 20px;
        border-radius: 27px;
      "
      class="w-full grid grid-cols-3 gap-4"
    >
      <div
        style="
          background: linear-gradient(88.96deg, #db6b6b 3.27%, #c45a9b 98.78%);
          height: 773px;
          border-radius: 27px;
        "
        class="col-span-2 relative w-full"
      >
        <div
          style="
            padding-top: 20px;
            padding-bottom: 20px;
            color: rgba(255, 255, 255, 1);
          "
          class="flex justify-center"
        >
          <h3 class="font-medium text-[25px]">CLB Bóng đá ADS</h3>
        </div>
        <div style="border-radius: 27px" class="squadBuiderHpl w-full">
          <div class="flex flex-cols justify-center">
            <div
              class="squadBuilder col-span-4 mt-[20px] w-[628px] h-[561px]"
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
                  <div>
                    <img
                      style="width: 103px; height: 85px; object-fit: contain"
                      :src="n.playerImage == null ? vector : n.playerImage"
                      @click="handlePositionNumber(n.positionNumber)"
                    />
                    <p
                      style="color: #fff"
                      class="font-medium text-[14px] text-center"
                    >
                      {{ n.playerName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-[40px]">
            <div style="width: 628px" class="flex justify-between items-center">
              <div class="flex gap-2 items-center">
                <div
                  style="width: 56px; height: 56px"
                  class="rounded-full overflow-hidden"
                >
                  <img class="w-full h-full" :src="hlv" alt="" />
                </div>
                <div>
                  <p>HLV</p>
                  <p>Tuấn A</p>
                </div>
              </div>
              <div>
                <P>Đội hình</P>
                <p>4-2-3-1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex flex-col justify-between">
        <div
          style="
            background: linear-gradient(90.2deg, #dd6c67 1.49%, #c158a0 97.72%);
            height: 568px;
            border-radius: 27px;
          "
          class="w-full w-[408px] h-[568px] relative"
        >
          <div
            style="
              padding-top: 20px;
              padding-bottom: 20px;
              color: rgba(255, 255, 255, 1);
            "
            class="flex justify-center"
          >
            <h3 class="font-medium text-[25px]">Cầu thủ dự bị</h3>
          </div>
          <div
            style="
              height: 504px;
              background: rgba(255, 255, 255, 1);
              padding: 10px 10px 10px 10px;
              border-radius: 27px;
              overflow: scroll;
            "
            class="dubi flex justify-between flex-wrap"
          >
            <div
              v-for="(item, index) in listData?.dh?.dhDubi"
              :key="index"
              class="cardGiaidau flex justify-center items-center"
            >
              <div @click="handleSwap(item.playerId)">
                <img
                  style="width: 93px; height: 63px; object-fit: contain"
                  :src="item.playerImage == null ? vector : item.playerImage"
                  alt=""
                />
                <h2
                  style="color: rgba(0, 0, 0, 1)"
                  class="font-medium text-[14px] text-center"
                >
                  {{ item.playerName }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            background: linear-gradient(90.2deg, #dd6c67 1.49%, #c158a0 97.72%);
            height: 178px;
            border-radius: 27px;
          "
          class="w-full relative"
        >
          <div
            style="
              color: rgba(255, 255, 255, 1);
              padding-top: 10px;
              padding-bottom: 10px;
            "
            class="flex justify-center"
          >
            <h3 class="font-medium text-[25px]">Chọn loại sân</h3>
          </div>
          <div
            style="
              height: 119px;
              background: rgba(255, 255, 255, 1);
              padding: 10px 10px 10px 10px;
              border-radius: 27px;
            "
            class="flex justify-between flex-wrap loaisan"
          >
            <div
              class="flex justify-arround items-center"
              v-for="(item, index) in stadium"
              :key="index"
            >
              <div class="" @click="handleStadium(item)">
                {{ item.title }}
              </div>
            </div>
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
        san: [3, 3, 4, 1],
        possition: "position11",
      },
    ]);
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
            message: res,
            position: "topRight",
          });
          fnGetListLineUp();
        })
        .catch((err) => {
          toast.error({
            message: err,
            position: "topRight",
          });
        });
    };
    const handlePositionNumber = (item) => {
      PositionNumber.value = item;
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
    };
  },
});
</script>
<style scoped>
.squadBuiderHpl {
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
}
.dubi {
  position: absolute;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
}
.cardGiaidau {
  border-radius: 20px;
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);

  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 135px;
  width: 108px;
  padding: 2.5px; /* tạo khoảng viền */
  box-sizing: border-box;
}
.loaisan {
  position: absolute;
  top: 59px;
  left: 0;
  right: 0;
  bottom: 0;
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
  margin-bottom: 10px;
}
.position11:nth-child(4) {
  justify-content: center;
}
.position11:nth-child(3) {
  justify-content: space-around;
}
.position11:nth-child(2) {
  justify-content: center;
  gap: 40px;
}
.position11:nth-child(1) {
  justify-content: center;
  gap: 80px;
}
.position7:nth-child(4) {
  justify-content: center;
}
.position7:nth-child(3) {
  justify-content: center;
  gap: 80px;
}
.position7:nth-child(2) {
  justify-content: space-around;
}
.position7:nth-child(1) {
  justify-content: center;
}
.position5:nth-child(3) {
  justify-content: center;
  gap: 80px;
}
.position5:nth-child(2) {
  justify-content: space-around;
}
.position5:nth-child(1) {
  justify-content: center;
}
</style>
