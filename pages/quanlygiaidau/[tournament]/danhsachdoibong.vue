<template>
  <TournamentHeader :stt="3">
    <div class="flex justify-end mt-[28px] mb-[28px] gap-4">
      <div
        style="
          width: 213px;
          height: 50px;
          border: 1px solid rgba(4, 184, 10, 1);
          color: rgba(4, 184, 10, 1);
          border-radius: 10px;
        "
        class="flex justify-center items-center font-medium text-[20px] cursor-pointer"
        @click="openTeamTournament = true"
      >
        Chia bảng đấu
      </div>
      <div
        style="
          width: 213px;
          height: 50px;
          border: 1px solid rgba(4, 184, 10, 1);
          color: rgba(4, 184, 10, 1);
          border-radius: 10px;
        "
        class="flex justify-center items-center font-medium text-[20px] cursor-pointer"
        @click="openTeambatchTournament = true"
      >
        Thêm nhiều đội bóng
      </div>
    </div>
    <div style="margin-top: 50px" class="grid grid-cols-4 gap-8">
      <div
        v-for="(item, index) in listTeam"
        :key="index"
        class="cardGiaidau"
        :class="[
          activeIndex === index ? 'cardGiaidau-click' : 'cardGiaidau-noclick',
        ]"
        @click="handelClick(index)"
      >
        <div
          :class="[
            activeIndex === index
              ? 'cardAbsolute-click'
              : 'cardAbsolute-noclick',
          ]"
          class="cardAbsolute relative flex flex-col justify-between items-center pl-[51px] pr-[51px] pt-[22px] pb-[22px]"
        >
          <div class="absolute top-[20px] left-[14px]">
            <Icon
              class="w-[24px] h-[24px]"
              name="hugeicons:delete-02"
              style="color: #eb0428"
              @click="handleDellete(item)"
            />
          </div>
          <div class="max-w-[88px] max-h-[118px]">
            <img class="w-full h-full" :src="item.logoUrl" alt="" />
          </div>
          <div
            :style="[
              activeIndex === index
                ? 'color :rgba(244, 134, 55, 1)'
                : 'color :rgba(0, 0, 0, 1)',
            ]"
          >
            <h2 class="font-medium text-[25px] text-center">
              {{ item.name }}
            </h2>
            <h3 class="font-normal text-[18px] text-center">
              {{ item.home_stadium }}
            </h3>
          </div>
          <div
            :style="[
              activeIndex === index
                ? 'background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)'
                : 'background :rgba(177, 174, 172, 1)',
            ]"
            style="color: rgba(255, 255, 255, 1)"
            class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
          >
            Xem chi tiết
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-[40px] mb-[40px]">
      <div class="flex justify-between gap-4 items-center">
        <div
          class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
          style="
            border: 1.5px solid rgba(247, 163, 39, 1);
            color: rgba(247, 163, 39, 1);
          "
        >
          <Icon
            class="text-[20px]"
            name="ci:chevron-left"
            width="40"
            height="40"
          />
        </div>
        <div class="flex gap-2">
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
        </div>
        <div
          class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
          style="
            background-color: rgba(247, 163, 39, 1);
            color: rgba(255, 255, 255, 1);
          "
        >
          <Icon
            class="text-[20px]"
            name="ci:chevron-right"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>

    <CreatTeamBatch
      :openPopup="openTeambatchTournament"
      :id="id"
      @toggle="openTeambatchTournament = false"
      @success="fnGetListTournamentTeam()"
    />
    <AlertMessage
      :open="openAlert"
      :title="'Xóa đội bóng ra khỏi giải đấu'"
      :alertmsgname="teamInfo.name"
      :alertmsg="'Bạn có chắc chắn muốn xóa đội bóng'"
      @toggle="openAlert = false"
      @success="fnGetDelTeamTournament()"
    />
    <Chiabang
      :openPopup="openTeamTournament"
      :data="listData"
      :id="id"
      @toggle="openTeamTournament = false"
      @success="fnGetListTournamentTeam()"
    />
  </TournamentHeader>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
import { useTournamentStore } from "../../../store/tournament";
import CreatTeamBatch from "../../../component/giaidau/creatTeambatchTournament/index.vue";
import AlertMessage from "../../../component/library/alertMessage/index.vue";
import Chiabang from "../../../component/giaidau/chiabang/index.vue";
interface team {
  id: number;
  name: string;
}
export default defineComponent({
  name: "LeagueMatchList",
  components: {
    TournamentHeader,
    CreatTeamBatch,
    AlertMessage,
    Chiabang,
  },

  setup() {
    const router = useRoute();

    onMounted(() => {
      fnGetListTournamentTeam();
    });
    const openTeamTournament: Ref<boolean> = ref(false);
    const openTeambatchTournament: Ref<boolean> = ref(false);
    const openAlert: Ref<boolean> = ref(false);
    const toast = useToast();
    const listTeam: Ref<undefined> = ref();
    const listData: Ref<team> = ref();
    const teamInfo: Ref<team> = ref({
      id: 0,
      name: "",
    });
    const id = router.params.tournament;
    const TournamentStore = useTournamentStore();
    const activeIndex = ref<number | null>(null);
    const handelClick = (index) => {
      activeIndex.value = index;
    };
    const fnGetListTournamentTeam = () => {
      TournamentStore.fnGetTeamsTournament(id)
        .then((res) => {
          listTeam.value = res;
          listData.value = res.map((item) => {
            return {
              id: item.teamId,
              name: item.name,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleDellete = (item) => {
      openAlert.value = true;
      teamInfo.value = {
        id: item.teamId,
        name: item.name,
      };
    };
    const fnGetDelTeamTournament = () => {
      TournamentStore.fnDelTeamTournament(teamInfo.value.id, id)
        .then((res) => {
          toast.success({
            message: "Xóa đội bóng thành công",
            position: "topRight",
          });
          openAlert.value = false;
          fnGetListTournamentTeam();
        })
        .catch((err) => {
          toast.error({
            message: "Xóa đội bóng không thành công",
            position: "topRight",
          });
        });
    };
    return {
      id,
      listTeam,
      listData,
      activeIndex,
      openTeamTournament,
      openTeambatchTournament,
      openAlert,
      teamInfo,
      handleDellete,
      fnGetDelTeamTournament,
      handelClick,
      fnGetListTournamentTeam,
    };
  },
});
</script>

<style scoped>
.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 341px;
  width: 285px;
  padding: 2.5px; /* tạo khoảng viền */
  box-sizing: border-box;
}

.cardGiaidau-click {
  background: linear-gradient(
    180deg,
    #f17a3c 0%,
    #131b77 100%
  ); /* border gradient */
}
.cardGiaidau-noclick {
  background: linear-gradient(
    180deg,
    #b0aeac 0%,
    #b1aeac 100%
  ); /* border gradient */
}
.cardAbsolute {
  width: 100%;
  height: 100%;
  border-radius: 16px; /* nhỏ hơn border-radius ngoài 1 chút */
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
}
.cardAbsolute-click {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}
.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}
.bangxephang {
  border: 1px solid var(--textsport);
}
.rowHover:hover {
  color: var(--textsport);
}
</style>
