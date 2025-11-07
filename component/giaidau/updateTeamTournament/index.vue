<template>
  <popUpModal
    :open="openPopup"
    :width="700"
    :title="'Cập nhật đội trong giải đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams"
  >
    <div class="flex justify-center mt-2">
      <inputImage :width="200" :height="200" @image="handleImage" />
    </div>
    <div class="p-5 max-h-[60vh] grid grid-cols-2 gap-8">
      <inputNebula :name="'Tên Đội Bóng'" v-model="name" />
      <inputNebula :name="'Năm Thành Lập'" v-model="foundedYear" />
      <inputArea
        class="col-span-2"
        :name="'Mô tả dội bóng'"
        v-model="content"
      />
    </div>
  </popUpModal>
</template>

<script lang="ts">
import popUpModal from "../../library/popupModal/index.vue";
import inputImage from "../../library/InputImage/index.vue";
import inputArea from "../../library/inputArea/index.vue";
import inputNebula from "../../library/input/index.vue";
import { useTournamentStore } from "~/store/tournament";
import { useTeamStore } from "~/store/team";

export default defineComponent({
  components: {
    popUpModal,
    inputImage,
    inputArea,
    inputNebula,
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
    const TournamentStore = useTournamentStore();
    const TeamStore = useTeamStore();

    const content: Ref<string> = ref("");
    const name: Ref<string> = ref("");
    const foundedYear: Ref<string> = ref("");
    const logoFile: Ref<string> = ref("");
    const toast = useToast();
    const handleImage = (file: File) => {
      logoFile.value = file.name;
    };
    watch(openPopup, (_new) => {
      if (_new) {
        fnReset();
        fndetail();
      }
    });

    const fndetail = () => {
      TeamStore.fnDetailTeam(Number(id.value))
        .then((res: any) => {
          name.value = res.name;
          content.value = res.description;
          foundedYear.value = res.foundedYear;
          logoFile.value = res.logoUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fnAddTeams = () => {
      const payload = {
        name: name.value,
        logoUrl: logoFile.value,
        foundedYear: Number(foundedYear.value),
        description: content.value,
        coach: null,
      };
      TournamentStore.fnAddTeamsTournament(props.id, payload)
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
    const fnReset = () => {
      name.value = "";
      foundedYear.value = "";
      logoFile.value = "";
      content.value = "";
    };
    return {
      name,
      content,
      foundedYear,
      handleImage,
      fnAddTeams,
    };
  },
});
</script>
<style></style>
