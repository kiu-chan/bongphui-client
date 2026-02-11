<template>
  <popUpModal
    :open="openPopup"
    :width="700"
    :maxHeight="700"
    :title="'Thêm đội vào giải đấu'"
    @toggle="$emit('toggle')"
    @success="fnAddTeams"
  >
    <div class="max-h-[400px] overflow-auto">
      <div class="flex justify-center mt-2">
        <inputImage :width="200" :height="200" @image="handleImage" />
      </div>
      <div class="p-5 grid grid-cols-2 gap-8">
        <InputForm
          v-model="name"
          :name="'Tên đội bóng'"
          :placeHolder="'Tên đội bóng'"
        />
        <InputForm
          :name="'Năm Thành Lập'"
          :placeHolder="'Tên đội bóng'"
          v-model="foundedYear"
        />
        <inputArea
          class="col-span-2"
          :name="'Mô tả dội bóng'"
          v-model="content"
        />
      </div>
    </div>
  </popUpModal>
</template>

<script lang="ts">
import popUpModal from "../../library/popupModal/index.vue";
import inputImage from "../../library/InputImage/index.vue";
import inputArea from "../../library/inputArea/index.vue";
import InputForm from "../../library/input/index.vue";
import { useTournamentStore } from "~/store/tournament";

export default defineComponent({
  components: {
    popUpModal,
    inputImage,
    inputArea,
    InputForm,
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
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup } = toRefs(props);
    const TournamentStore = useTournamentStore();
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
      }
    });

    const fnAddTeams = () => {
      const payload = {
        name: name.value,
        logoUrl: logoFile.value,
        foundedYear: Number(foundedYear.value),
        description: content.value,
        coach: null,
        players: null,
        tournaments: null,
        username: "vui khỏe",
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
