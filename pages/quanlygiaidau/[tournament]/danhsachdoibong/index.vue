<template>
  <TournamentHeader :stt="3">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <div v-else>
      <!-- Buttons section - Responsive -->
      <div class="flex flex-col md:flex-row md:justify-end mt-[28px] mb-[28px] gap-3 md:gap-4">
        <div
          class="w-full md:w-[213px] h-[50px] border border-[rgba(4,184,10,1)] text-[rgba(4,184,10,1)] rounded-[10px] flex justify-center items-center font-medium text-[16px] md:text-[20px] cursor-pointer hover:bg-[rgba(4,184,10,0.05)] transition-colors"
          @click="openManualMatch = true"
        >
          Tạo trận thủ công
        </div>
        <div
          class="w-full md:w-[213px] h-[50px] border border-[rgba(4,184,10,1)] text-[rgba(4,184,10,1)] rounded-[10px] flex justify-center items-center font-medium text-[16px] md:text-[20px] cursor-pointer hover:bg-[rgba(4,184,10,0.05)] transition-colors"
          @click="openTeamTournament = true"
        >
          Chia bảng đấu
        </div>
        <div
          class="w-full md:w-[213px] h-[50px] border border-[rgba(4,184,10,1)] text-[rgba(4,184,10,1)] rounded-[10px] flex justify-center items-center font-medium text-[16px] md:text-[20px] cursor-pointer hover:bg-[rgba(4,184,10,0.05)] transition-colors"
          @click="openTeambatchTournament = true"
        >
          Thêm nhiều đội bóng
        </div>
      </div>
      
      <!-- Empty state when no teams -->
      <div v-if="!listTeam || listTeam.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="mb-4">
          <Icon name="mdi:football" class="text-gray-300" width="80" height="80" />
        </div>
        <h3 class="text-xl font-medium text-gray-600 mb-2">Chưa có đội bóng nào</h3>
        <p class="text-gray-500 mb-6">Hãy thêm đội bóng để bắt đầu giải đấu</p>
        <button
          @click="openTeambatchTournament = true"
          class="px-6 py-3 bg-[rgba(4,184,10,1)] text-white rounded-lg hover:bg-[rgba(4,184,10,0.9)] transition-colors font-medium"
        >
          Thêm đội bóng ngay
        </button>
      </div>
      
      <!-- Grid responsive giống trang đội bóng -->
      <div v-else style="margin-top: 50px" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
        <div
          v-for="(item, index) in listTeam"
          :key="index"
          class="cardGiaidau w-full"
        >
          <div class="cardAbsolute relative flex flex-col justify-between items-center p-[16px]">
            <div class="absolute top-[20px] left-[14px]">
              <Icon
                class="w-[24px] h-[24px] cursor-pointer hover:scale-110 transition-transform"
                name="hugeicons:delete-02"
                style="color: #eb0428"
                @click="handleDellete(item)"
              />
            </div>
            <div class="max-w-[110px] h-[130px]">
              <img 
                class="w-full h-full object-contain" 
                :src="item.logoUrl || '/img/imglg.png'" 
                alt="" 
                @error="$event.target.src = '/img/imglg.png'"
              />
            </div>
            <div
              :style="[
                activeIndex === index
                  ? 'color :rgba(244, 134, 55, 1)'
                  : 'color :rgba(0, 0, 0, 1)',
              ]"
              class="text-center"
            >
              <h2 style="width: 160px" class="font-medium text-[18px] mx-auto">
                {{ item.name }}
              </h2>
            </div>
            <div
              style="
                color: rgba(255, 255, 255, 1);
                background: linear-gradient(90deg, #ec7748 0%, #a545d6 100%);
              "
              class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px] cursor-pointer hover:opacity-90 transition-opacity"
              @click="handleViewDetail(item.teamId)"
            >
              Xem chi tiết
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination - Only show if there are teams -->
      <div v-if="listTeam && listTeam.length > 0" class="flex justify-center mt-[40px] mb-[40px]">
        <div class="flex justify-between gap-4 items-center">
          <div
            class="flex items-center justify-center w-[50px] h-[50px] rounded-full cursor-pointer"
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
            class="flex items-center justify-center w-[50px] h-[50px] rounded-full cursor-pointer"
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
    </div>

    <CreateManualMatch
      :openPopup="openManualMatch"
      :tournamentId="id"
      :teams="listData"
      @toggle="openManualMatch = false"
      @success="handleManualMatchSuccess()"
    />
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
      @toggle="openAlert.value = false"
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
import TournamentHeader from "../../../../component/taogiaidau/tournamentHeader.vue";
import { useTournamentStore } from "../../../../store/tournament";
import CreatTeamBatch from "../../../../component/giaidau/creatTeambatchTournament/index.vue";
import AlertMessage from "../../../../component/library/alertMessage/index.vue";
import Chiabang from "../../../../component/giaidau/chiabang/index.vue";
import CreateManualMatch from "../../../../component/lichthidau/createManualMatch/index.vue";

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
    CreateManualMatch,
  },

  setup() {
    const router = useRoute();
    const navigateRouter = useRouter();

    onMounted(() => {
      fnGetListTournamentTeam();
    });
    
    const openTeamTournament: Ref<boolean> = ref(false);
    const openTeambatchTournament: Ref<boolean> = ref(false);
    const openManualMatch: Ref<boolean> = ref(false);
    const openAlert: Ref<boolean> = ref(false);
    const isLoading = ref(true);
    const toast = useToast();
    const listTeam: Ref<undefined> = ref();
    const listData: Ref<team[]> = ref([]);
    const teamInfo: Ref<team> = ref({
      id: 0,
      name: "",
    });
    const id = router.params.tournament;
    const TournamentStore = useTournamentStore();
    const activeIndex = ref<number | null>(null);
    
    const handelClick = (index: number) => {
      activeIndex.value = index;
    };
    
    const fnGetListTournamentTeam = async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const [res] = await Promise.all([
          TournamentStore.fnGetTeamsTournament(id),
          delay
        ]);
        
        listTeam.value = res;
        listData.value = res.map((item: any) => {
          return {
            id: item.teamId,
            name: item.name,
          };
        });
      } catch (err) {
        console.log(err);
      } finally {
        isLoading.value = false;
      }
    };
    
    const handleDellete = (item: any) => {
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

    const handleManualMatchSuccess = () => {
      toast.success({
        message: "Trận đấu đã được tạo thành công",
        position: "topRight",
      });
    };

    const handleViewDetail = (teamId: number) => {
      navigateRouter.push(`/quanlygiaidau/${id}/danhsachdoibong/${teamId}/danhsachthanhvien`);
    };
    
    return {
      id,
      listTeam,
      listData,
      activeIndex,
      openTeamTournament,
      openTeambatchTournament,
      openManualMatch,
      openAlert,
      teamInfo,
      isLoading,
      handleDellete,
      fnGetDelTeamTournament,
      handelClick,
      fnGetListTournamentTeam,
      handleManualMatchSuccess,
      handleViewDetail,
    };
  },
});
</script>

<style scoped>
/* Thu nhỏ card để 5 cái vừa hàng - GIỐNG TRANG ĐỘI BÓNG */
.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 340px; /* giảm chiều cao */
  width: 100%;
  padding: 2px; /* tạo khoảng viền */
  box-sizing: border-box;
}

.cardGiaidau:hover {
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
  border-radius: 18px; /* nhỏ hơn border-radius ngoài 1 chút */
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
}

.cardAbsolute:hover {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}

.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}

.dotCirCle {
  width: 15px;
  height: 15px;
  background-color: rgba(255, 229, 190, 1);
}

.bangxephang {
  border: 1px solid var(--textsport);
}

.rowHover:hover {
  color: var(--textsport);
}
</style>