<template>
  <div class="highlight-wrapper mb-12">
    <div class="mt-8 md:mt-12 lg:mt-16"></div>
    <SwiperSlider 
      :listImg="listHightLight" 
      :imgHPL="imgDefaultNew2" 
      title="Highlight Giải đấu" 
      text="Highlight Giải đấu" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, onMounted } from "vue";
import SwiperSlider from "../../component/library/swiperSlider/index.vue";
import SonMuller from "../../assets/img/sonMuler.png";
import { useNewStore } from "../../store/new";

interface NewItem { id: number; title: string; imageUrl?: string; }

export default defineComponent({
  name: "TournamentHighlights",
  components: { SwiperSlider },
  setup() {
    const NewStore = useNewStore();
    const imgDefaultNew2 = ref<string>(SonMuller);
    const listHightLight: Ref<NewItem[]> = ref([]);

    onMounted(() => {
      fngetHightLight();
    });

    const fngetHightLight = async () => {
      try {
        const res: any = await NewStore.fnGetNewHightlight();
        listHightLight.value = Array.isArray(res) ? res : (res ? [res] : []);
      } catch {
        listHightLight.value = [];
      }
    };

    return {
      imgDefaultNew2,
      listHightLight,
    };
  },
});
</script>

<style scoped>
.highlight-wrapper { margin-top: 16px; margin-bottom: 32px; }
</style>