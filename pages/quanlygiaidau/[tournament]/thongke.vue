<template>
  <TournamentHeader :stt="4">
    <div class="mt-[58px] px-4 sm:px-6 md:mt-16 w-full gap-4">
      <ThongkePlayer :id="idParam" />
    </div>
  </TournamentHeader>
</template>
<script lang="ts">
import Thongketran from "../../../component/thongke/thongkeTran.vue";
import ThongkePlayer from "../../../component/thongke/thongkePlayer.vue";
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
export default defineComponent({
  components: {
    ThongkePlayer,
    TournamentHeader,
  },
  setup() {
    const steps = [Thongketran, ThongkePlayer];
    const currentStep = ref(0);
    const route = useRoute();
    const idParam = (route.params.tournament ?? "") as string;
    const nextStep = () => {
      if (currentStep.value < steps.length - 1) currentStep.value++;
    };
    const prevStep = () => {
      if (currentStep.value > 0) currentStep.value--;
    };
    return {
      steps,
      idParam,
      currentStep,
      nextStep,
      prevStep,
    };
  },
});
</script>
<style scoped></style>
