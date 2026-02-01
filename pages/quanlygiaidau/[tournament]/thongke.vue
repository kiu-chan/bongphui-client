<template>
  <TournamentHeader :stt="4">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <div v-else class="mt-[58px] px-4 sm:px-6 md:mt-16 w-full gap-4">
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
    const isLoading = ref(true);
    
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
    
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
      isLoading,
    };
  },
});
</script>
<style scoped></style>