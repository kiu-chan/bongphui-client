<template>
  <div class="banner pb-30 md:pb-0">
    <div class="grid grid-cols-1 md:grid-cols-10">
      <div class="col-span-1 md:col-span-4 mt-8 md:mt-[136px] px-4 md:px-0">
        <div class="flex items-center">
          <div class="w-[120px] justify-center hidden md:flex">
            <ul>
              <template v-for="(ite, index) in item" :key="index">
                <li
                  :class="[idDefault === ite.id ? 'idSlide' : '']"
                  style="
                    color: rgba(108, 127, 246, 1);
                    transition: all 0.4s ease;
                  "
                  class="font-medium text-[20px] mb-[4px] cursor-pointer flex justify-center"
                  @click="handelBaner(ite.id)"
                >
                  0{{ ite.id }}
                </li>
              </template>
            </ul>
          </div>
          <div>
            <h3
              style="color: rgba(247, 163, 39, 1)"
              class="font-medium text-2xl md:text-[50px]"
            >
              Giải đấu việt
            </h3>
            <h1
              style="color: rgba(245, 245, 245, 1)"
              class="font-bold text-3xl md:text-[70px] leading-tight"
            >
              NÂNG TẦM <br />
              THỂ THAO VIỆT
            </h1>
          </div>
        </div>
      </div>
      <div class="col-span-1 md:col-span-6 md:max-w-[981px] md:max-h-[860px] mt-6 md:mt-0 hidden md:block">
        <img
          class="bannerImg w-full h-full contain"
          :key="banner"
          :src="banner"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, type Ref } from "vue";
import defaultBanner from "../../../assets/img/2023.2.24-Crop-Football-Kid-An-2-copy-2 1.png";
import defaultBanner2 from "../../../assets/img/vietnam.png";

export default defineComponent({
  setup() {
    const bannerImg = ref<HTMLImageElement | null>(null);
    const idDefault: Ref<number> = ref(1);
    const banner: Ref<string> = ref(defaultBanner);
    const item: { id: number; img: string }[] = [
      {
        id: 1,
        img: defaultBanner,
      },
      {
        id: 2,
        img: defaultBanner2,
      },
      {
        id: 3,
        img: defaultBanner,
      },
      {
        id: 4,
        img: defaultBanner2,
      },
    ];

    const handelBaner = (ite: number) => {
      idDefault.value = ite;
      banner.value = item.find((i) => i.id == ite)?.img || "";
    };
    return {
      item,
      idDefault,
      banner,
      handelBaner,
    };
  },
});
</script>
<style scoped>
@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.idSlide {
  font-size: 25px !important;
  color: rgba(245, 245, 245, 1) !important;
  border-bottom: 2px solid rgba(247, 163, 39, 1);
}
.bannerImg {
  animation: zoomIn 0.8s ease-out;
}
</style>