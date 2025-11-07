<template>
  <popUpModal
    :open="openPopup"
    :width="700"
    :title="'Chia bảng đấu trong giải'"
    @toggle="$emit('toggle')"
    @success="fnchiabang"
  >
    <div class="p-5 max-h-[60vh] grid grid-cols-2 gap-8">
      <inputNebula
        :placeholder="'Nhập số lượng bảng đấu'"
        :name="'Số lượng bảng đấu'"
        v-model="numberOfTables"
      />
      <inputNebula
        :placeholder="'Nhập số lượng đội trong bảng đấu'"
        :name="'Số lượng đội bóng trong bảng'"
        v-model="teamsPerTable"
      />
      <inputNebula
        :placeholder="'Số vòng bảng trong giải đấu'"
        :name="'Số lượng vòng bảng trong giải đấu'"
        v-model="numberOfPhases"
      />
    </div>
  </popUpModal>
</template>

<script lang="ts">
import popUpModal from "../../library/popupModal/index.vue";
import inputNebula from "../../library/input/index.vue";
import { useTournamentStore } from "~/store/tournament";

interface Group {
  leagueName: string;
  teamIds: any[];
}
export default defineComponent({
  components: {
    popUpModal,
    inputNebula,
  },
  props: {
    openPopup: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<Array<{ id: number; name: string }>>,
      required: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, data, id } = toRefs(props);
    const TournamentStore = useTournamentStore();
    const numberOfTables: Ref<number> = ref(4);
    const teamsPerTable: Ref<number> = ref(4);
    const numberOfPhases: Ref<number> = ref(2);
    const toast = useToast();

    watch(openPopup, (_new) => {
      if (_new) {
        fnReset();
      }
    });
    const chiabang = () => {
      const group = ref<Group[]>([]);
      for (let i = 0; i < numberOfTables.value; i++) {
        group.value.push({
          leagueName: String.fromCharCode(65 + i),
          teamIds: [],
        });
      }
      const shuffle = [...data.value].sort(() => Math.random() - 0.5);
      shuffle.forEach((item, index) => {
        const groupIndex = index % numberOfTables.value;
        group.value[groupIndex].teamIds.push(item.id);
      });
      return group.value;
    };
    const fnchiabang = () => {
      const payload = {
        numberOfTables: Number(numberOfTables.value),
        teamsPerTable: Number(teamsPerTable.value),
        leagueRequests: chiabang(),
      };
      console.log(payload);
      TournamentStore.fnCreatedLeague(id.value, payload)
        .then((res: any) => {
          toast.success({
            message: res,
            position: "topRight",
          });
          fnAddLeagueMatches();
          navigateTo(`/giaidau/${id.value}/bangxephang`);
        })
        .catch((err) => {
          toast.error({
            message: "thêm dữ liệu thất bại",
            position: "topRight",
          });
        });
    };
    const fnAddLeagueMatches = () => {
      TournamentStore.fnAddLeagueMatches(id.value)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fnReset = () => {};
    return {
      teamsPerTable,
      numberOfTables,
      numberOfPhases,
      fnchiabang,
    };
  },
});
</script>
<style></style>
