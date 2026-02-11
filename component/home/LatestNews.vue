<template>
  <div class="news-slider-wrapper mb-8">
    <div class="mt-12 md:mt-16 lg:mt-20"></div>
    <SwiperSlider
      :listImg="listNew"
      :imgHPL="imgDefaultNew"
      title="Tin tức mới nhất"
      text="Xem tất cả các trận đấu"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, onMounted } from "vue";
import SwiperSlider from "../../component/library/swiperSlider/index.vue";
import imgHPL from "../../assets/img/hpl.png";
import { useNewStore } from "../../store/new";

interface NewItem { id: number; title: string; imageUrl?: string; }

export default defineComponent({
  name: "LatestNews",
  components: { SwiperSlider },
  setup() {
    const NewStore = useNewStore();
    const imgDefaultNew = ref<string>(imgHPL);
    const listNew: Ref<NewItem[]> = ref([]);

    onMounted(() => {
      fngetListNew();
    });

    const fngetListNew = async () => {
      try {
        const res: any = await NewStore.fnGetNew();
        listNew.value = Array.isArray(res) ? res : (res ? [res] : []);
      } catch {
        listNew.value = [];
      }
    };

    return {
      imgDefaultNew,
      listNew,
    };
  },
});
</script>

<style scoped>
.news-slider-wrapper { margin-top: 0; margin-bottom: 32px; }
</style>