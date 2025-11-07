<template>
  <TournamentHeader :stt="1">
    <div class="px-5 py-3 flex justify-end flex-wrap gap-4 mt-2">
      <button
        @click="toggleTeamModal"
        class="ButtonColor px-5 py-2 rounded-lg transition-colors"
      >
        Thêm đội
      </button>
      <button
        @click="toggleTeamsModal"
        class="ButtonColor px-5 py-2 rounded-lg transition-colors"
      >
        Thêm đội trong hệ thống
      </button>
      <button
        @click="toggleChiabangModal"
        class="ButtonColor px-5 py-2 rounded-lg transition-colors"
      >
        Chia bảng
      </button>
    </div>

    <div
      class="app-container container mx-auto mt-[58px] px-4 sm:px-6 md:mt-16 grid w-full gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8"
    >
      <div
        class="box-item relative"
        v-for="(item, index) in lstData"
        :key="index"
      >
        <div
          class="box-item__card relative z-[100] bg-[hsl(210_9.09%_4.31%)] h-[304px] w-full items-center justify-between rounded-2xl p-4 sm:rounded-[15px] overflow-hidden"
        >
          <div
            class="flex items-center justify-center box-item__card2 relative"
          >
            <div class="absolute right-[10px] top-0 flex gap-2">
              <Icon
                @click="UpdateTeam(item)"
                class="icon"
                name="hugeicons:pencil-edit-02"
                width="12"
                height="12"
                style="color: #258e26"
              />
              <Icon
                @click="confirmDelete(item)"
                class="icon"
                name="ic:baseline-restore-from-trash"
                width="12"
                height="12"
                style="color: #258e26"
              />
            </div>
            <div class="flex flex-col items-center gap-[10px]">
              <img
                class="w-[60px] h-[60px]"
                src="../../../assets/img/Chelsea_FC.svg.png"
                alt=""
              />
              <h2>FC {{ item.name }}</h2>
            </div>
          </div>
          <p class="ngancach mt-[20px]"></p>
          <div class="flex flex-col items-center">
            <p>0 trận đấu đã chơi</p>
            <div class="flex gap-2">
              <p>0 thắng</p>
              <p>0 thua</p>
              <p>0 hòa</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CreateTeamTournament
      :openPopup="openTeamTournament"
      :id="idParam"
      @toggle="toggleTeamModal"
      @success="loadTeams"
    />
    <CreateTeambatchTournament
      :openPopup="openTeamsTournament"
      :lstTeam="lstTeam"
      :id="idParam"
      @toggle="toggleTeamsModal"
      @success="loadTeams"
    />
    <UpdateTeamTournament
      :openPopup="openUpdate"
      :id="selectedTeamId?.id || 0"
      @toggle="toggleUpdateTeam"
      @success="loadTeams"
    />
    <Chiabang
      :openPopup="openChiabang"
      :data="lstLeague"
      :id="idParam"
      @toggle="toggleChiabangModal"
      @success="loadTeams"
    />
    <AlertMessage
      :open="openDelete"
      :title="'Xóa đội bóng'"
      :alertmsg="'Bạn có chắc chắn muốn xóa đội bóng'"
      :alertmsgname="selectedTeamId?.name"
      @toggle="toggleDeleteModal"
      @success="handleDelete"
    />
  </TournamentHeader>
</template>

<script lang="ts">
import TournamentHeader from "~/component/taogiaidau/tournamentHeader.vue";
import CreateTeamTournament from "~/component/giaidau/createTeamTournament/index.vue";
import CreateTeambatchTournament from "~/component/giaidau/creatTeambatchTournament/index.vue";

import UpdateTeamTournament from "~/component/giaidau/updateTeamTournament/index.vue";
import Chiabang from "~/component/giaidau/chiabang/index.vue";

import AlertMessage from "~/component/library/alertMessage/index.vue";
import { useTournamentStore } from "~/store/tournament";
import { useTeamStore } from "~/store/team";

interface LstTeam {
  teamId: number;
  name: string;
  logoUrl: string;
  foundedYear: number;
  coach: {
    coachId: number;
    name: string;
    nationality: string;
    birthdate: string;
  };
}
interface Team {
  id: number;
  name: string;
}

export default defineComponent({
  components: {
    TournamentHeader,
    CreateTeamTournament,
    UpdateTeamTournament,
    CreateTeambatchTournament,
    AlertMessage,
    Chiabang,
  },
  setup() {
    const TournamentStore = useTournamentStore();
    const TeamStore = useTeamStore();
    const lstData = ref<LstTeam[]>([]);
    const lstTeam = ref<Team[]>([]);

    const lstLeague: Ref<Team[]> = ref([]);
    const openTeamTournament = ref(false);
    const openTeamsTournament = ref(false);
    const openUpdate = ref(false);
    const openDelete = ref(false);
    const openChiabang = ref(false);
    const toast = useToast();
    const route = useRoute();
    const idParam = (route.params.tournament ?? "") as string;
    const selectedTeamId: Ref<Team | null> = ref(null);

    const loadTeams = () => {
      TournamentStore.fnGetTeamsTournament(idParam)
        .then((res: any) => {
          lstData.value = res;
          lstLeague.value = res.map((item: any) => {
            return {
              id: item.teamId,
              name: item.name,
            };
          });
        })
        .catch((err) => {
          console.error("Lỗi khi load danh sách đội:", err);
        });
    };
    const toggleUpdateTeam = () => {
      openUpdate.value = !openUpdate.value;
    };

    const UpdateTeam = (item: any) => {
      selectedTeamId.value = {
        id: item.teamId,
        name: item.name,
      };
      toggleUpdateTeam();
    };

    const toggleTeamModal = () => {
      openTeamTournament.value = !openTeamTournament.value;
    };
    const toggleTeamsModal = () => {
      openTeamsTournament.value = !openTeamsTournament.value;
      if (openTeamsTournament.value) {
        fnGetTeamName();
      }
    };
    const toggleChiabangModal = () => {
      openChiabang.value = !openChiabang.value;
    };
    const toggleDeleteModal = () => {
      openDelete.value = !openDelete.value;
    };
    const fnGetTeamName = () => {
      TeamStore.fnGetTeamName()
        .then((res: any) => {
          lstTeam.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const confirmDelete = (item: LstTeam) => {
      selectedTeamId.value = {
        id: item.teamId,
        name: item.name,
      };
      toggleDeleteModal();
    };

    const handleDelete = async () => {
      if (selectedTeamId.value?.id === null) return;
      try {
        await TournamentStore.fnDelTeamTournament(
          selectedTeamId.value?.id,
          idParam
        );
        toast.success({
          message: "Xoá Đội Bóng Thành Công",
          position: "topRight",
        });
        await loadTeams();
      } catch (err) {
        toast.error({
          message: "Xoá Đội Bóng Thất Bại",
          position: "topRight",
        });
        console.error("Lỗi khi xoá đội:", err);
      } finally {
        toggleDeleteModal();
      }
    };

    onMounted(loadTeams);

    return {
      idParam,
      lstData,
      lstTeam,
      lstLeague,
      openTeamTournament,
      openDelete,
      openUpdate,
      selectedTeamId,
      openChiabang,
      openTeamsTournament,
      toggleUpdateTeam,
      UpdateTeam,
      loadTeams,
      toggleTeamsModal,
      toggleTeamModal,
      toggleDeleteModal,
      toggleChiabangModal,
      confirmDelete,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.box-item {
  position: relative;
  background-clip: padding-box;
  border: 4px solid transparent;
  background-color: var(--background);
  border-radius: 20px;
}
.box-item:before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  margin: -1px;
  background-image: linear-gradient(
    263deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(75, 209, 129, 1) 0%,
    rgba(23, 48, 23, 1) 100%
  );
  border-radius: 16px;
  overflow: hidden;
}

.ngancach {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
}

@media (max-width: 600px) {
  .box-item__none {
    transform: translateX(7px);
  }
}
@media (max-width: 474px) {
  .box-item__none {
    transform: translateX(2px);
  }
  .box-item__card2 {
    justify-content: space-between;
  }
}
</style>
