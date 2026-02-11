<template>
  <div class="partners-section container mx-auto mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20 px-4">
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 md:mb-8 lg:mb-12 space-y-6 lg:space-y-0">
      <div>
        <h1 class="font-medium text-2xl md:text-3xl lg:text-[45px] text-gray-800">Đối tác</h1>
        <h3 class="font-medium text-base md:text-lg lg:text-xl text-gray-500 mt-2">
          Các đối tác chiến lược của chúng tôi
        </h3>
      </div>
      <div class="flex justify-center lg:justify-end gap-2">
        <button class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-colors duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>

    <!-- Auto-scrolling partners marquee -->
    <div
      class="partners-marquee relative overflow-hidden rounded-xl bg-white/0 p-4"
      @mouseover="pauseMarquee"
      @mouseleave="resumeMarquee"
    >
      <div
        class="partners-track flex items-center space-x-8"
        ref="partnersTrack"
        :style="{ transform: `translateX(${trackTranslateX}px)` }"
      >
        <div
          v-for="(partner, index) in repeatedPartners"
          :key="`partner-${index}`"
          class="flex items-center justify-center min-w-[140px] md:min-w-[160px] lg:min-w-[180px] p-2"
        >
          <img
            :src="partner.logoUrl"
            :alt="partner.name || 'Partner logo'"
            class="max-h-14 md:max-h-16 lg:max-h-20 object-contain"
            @error="$event.target.src = defaultPartnerLogo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, onMounted, onBeforeUnmount, computed } from "vue";
import defaultPartnerLogo from "../../assets/img/doitac1.png";

interface Partner { id: number; name?: string; logoUrl: string; }

export default defineComponent({
  name: "Partners",
  setup() {
    const partnersData: Ref<Partner[]> = ref([]);
    const marqueePaused = ref(false);
    const partnersTrack = ref<HTMLElement | null>(null);
    const trackTranslateX = ref<number>(0);
    let lastTimestamp = 0;
    let rafId: number | undefined;
    const scrollSpeed = 40;

    onMounted(() => {
      fnGetPartnersData();
      startPartnersAutoScroll();
    });

    onBeforeUnmount(() => {
      stopPartnersAutoScroll();
    });

    const startPartnersAutoScroll = () => {
      stopPartnersAutoScroll();
      lastTimestamp = performance.now();
      const step = (ts: number) => {
        const dt = (ts - lastTimestamp) / 1000;
        lastTimestamp = ts;
        if (!marqueePaused.value && partnersTrack.value) {
          trackTranslateX.value -= scrollSpeed * dt;
          const totalWidth = partnersTrack.value.scrollWidth || 0;
          const halfWidth = totalWidth / 2 || 0;
          if (halfWidth > 0) {
            if (-trackTranslateX.value >= halfWidth) {
              trackTranslateX.value += halfWidth;
            }
          }
        }
        rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const stopPartnersAutoScroll = () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
    };

    const pauseMarquee = () => {
      marqueePaused.value = true;
    };
    const resumeMarquee = () => {
      marqueePaused.value = false;
    };

    const fnGetPartnersData = () => {
      partnersData.value = [
        { id: 1, logoUrl: defaultPartnerLogo },
        { id: 2, logoUrl: defaultPartnerLogo },
        { id: 3, logoUrl: defaultPartnerLogo },
        { id: 4, logoUrl: defaultPartnerLogo },
        { id: 5, logoUrl: defaultPartnerLogo },
        { id: 6, logoUrl: defaultPartnerLogo },
      ];
    };

    const repeatedPartners = computed(() => {
      const base = partnersData.value && partnersData.value.length ? partnersData.value : [{ id: 0, logoUrl: defaultPartnerLogo }];
      return [...base, ...base];
    });

    return {
      partnersData,
      defaultPartnerLogo,
      repeatedPartners,
      marqueePaused,
      pauseMarquee,
      resumeMarquee,
      partnersTrack,
      trackTranslateX,
    };
  },
});
</script>

<style scoped>
.partners-marquee { background: transparent; }
.partners-track {
  display: flex;
  align-items: center;
  gap: 2rem;
  will-change: transform;
}
.partners-track img { filter: none !important; opacity: 1 !important; transition: transform 0.2s; }
.partners-track img:hover { transform: scale(1.05); }

@media (min-width: 768px) { .partners-track { gap: 2.5rem; } .partners-track img { max-height: 4rem; } }
@media (min-width: 1024px) { .partners-track img { max-height: 5rem; } }
</style>