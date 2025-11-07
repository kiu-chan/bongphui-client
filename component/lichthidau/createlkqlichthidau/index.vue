<template>
  <popUpModal
    :open="openPopup"
    :width="700"
    :title="'Cập nhật trạng thái của trận đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams"
  >
    <div class="p-5 max-h-[60vh]">
      <selectNebula
        :name="'Trạng thái của trận đấu'"
        v-model="status"
        :statusMatch="statusMatch"
      />
    </div>
  </popUpModal>
</template>

<script lang="ts">
import popUpModal from "../../library/popupModal/index.vue";
import selectNebula from "../../library/selectNebula/index.vue";
import { statusMatch } from "../../../utils/headerLeague";
import { useMatchStore } from "../../../store/matchManger";
export default defineComponent({
  components: {
    popUpModal,
    selectNebula,
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
    const status: Ref<string> = ref("");
    const MatchStore = useMatchStore();
    const toast = useToast();
    watch(openPopup, (_new) => {
      if (_new) {
        fnReset();
      }
    });
    watch(status, (_new) => {
      if (_new) {
        console.log(status.value, "chính");
      }
    });

    const fnAddTeams = () => {
      const params = [status.value && `status=${status.value}`].filter(Boolean);

      const url = params.length > 0 ? `?${params.join("&")}` : "";
      MatchStore.fnUpdateMatchStatus(id.value, url)
        .then((res: any) => {
          toast.success({
            message: "thêm dữ liệu thành công",
            position: "topRight",
          });
          ctx.emit("toggle");
          ctx.emit("success");
        })
        .catch((err) => {
          toast.error({
            message: "thêm dữ liệu thất bại",
            position: "topRight",
          });
        });
    };
    const fnReset = () => {};
    return {
      fnAddTeams,
      status,
      statusMatch,
    };
  },
});
</script>
<style></style>
