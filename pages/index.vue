<template>
  <main class="home-root">
    <div>
      <SliderBanner />

      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <!-- Lịch thi đấu mới nhất -->
          <LatestSchedule />

          <!-- Tin tức mới nhất -->
          <LatestNews />

          <!-- Đối tác -->
          <Partners />

          <!-- Highlight Giải đấu -->
          <TournamentHighlights />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SliderBanner from "../component/library/sliderBanner/index.vue";
import LatestSchedule from "../component/home/LatestSchedule.vue";
import LatestNews from "../component/home/LatestNews.vue";
import Partners from "../component/home/Partners.vue";
import TournamentHighlights from "../component/home/TournamentHighlights.vue";

export default defineComponent({
  name: "HomeTournamentPage",
  components: {
    SliderBanner,
    LatestSchedule,
    LatestNews,
    Partners,
    TournamentHighlights,
  },
});
</script>

<style scoped>
.home-root {
  font-family: "FS Magistral", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>