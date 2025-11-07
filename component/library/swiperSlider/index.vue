<template>
  <div class="imgDefault overflow-hidden flex justify-center">
    <div style="transform: translateX(70%)" class="h-full">
      <div class="h-full">
        <img class="h-full" :src="imgDefaultNew" alt="" />
      </div>
    </div>
    <div class="linearBackground"></div>
    <div class="container containerNew mt-[20px]">
      <div class="flex justify-between items-center">
        <div>
          <h1
            style="color: rgba(247, 163, 39, 1)"
            class="font-medium text-[45px]"
          >
            {{ title }}
          </h1>
          <h3
            style="color: rgba(255, 255, 255, 1)"
            class="font-medium text-[20px]"
          >
            {{ text }}
          </h3>
        </div>
        <div class="flex justify-between gap-2">
          <div
            class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
            style="
              border: 1.5px solid rgba(247, 163, 39, 1);
              color: rgba(247, 163, 39, 1);
            "
            @click="prevSlide"
          >
            <Icon
              class="text-[20px]"
              name="ci:chevron-left"
              width="40"
              height="40"
            />
          </div>
          <div
            class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
            style="
              background-color: rgba(247, 163, 39, 1);
              color: rgba(255, 255, 255, 1);
            "
            @click="nextSlide"
          >
            <Icon
              class="text-[20px]"
              name="ci:chevron-right"
              width="40"
              height="40"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center h-full gap-[63px] mt-[40px] slideImg">
        <div
          v-for="(item, index) in listImg"
          :key="index"
          class="min-w-[416px] transition-transform duration-500 ease-in-out"
          :style="{
            transform: `translateX(calc(${currentIndex * 100}% + ${
              currentIndex * 60
            }px))`,
          }"
        >
          <img
            :src="item.imageUrl"
            class="w-full h-[249px] mb-4 object-cover"
          />
          <p class="font-medium text-[20px] text-white">
            {{ item.title }}
          </p>
          <p class="text-[18px] text-white">11/09/2025 , SVĐ Hà Nôi</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    listImg: {
      type: Array as PropType<
        Array<{ id: number; title: string; imageUrl: string }>
      >,
      required: true,
    },
    imgHPL: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  setup(props, ctx) {
    const { listImg, imgHPL, title, text } = toRefs(props);
    const imgDefaultNew = ref<string | undefined>(imgHPL.value);
    const currentIndex = ref(0);
    watch(currentIndex, (index) => {
      imgDefaultNew.value =
        index != 0
          ? listImg.value.find((item) => item.id === Math.abs(index))?.imageUrl
          : imgHPL.value;
    });
    const nextSlide = () => {
      if (currentIndex.value < 0) {
        currentIndex.value++;
      }
    };

    const prevSlide = () => {
      if (
        currentIndex.value >
        listImg.value.length - 1 - listImg.value.length
      ) {
        currentIndex.value--;
      }
    };
    return {
      imgDefaultNew,
      currentIndex,
      nextSlide,
      prevSlide,
    };
  },
});
</script>
<style scoped>
.imgDefault {
  position: relative;
  background: linear-gradient(180deg, #121d7b 0%, #111167 100%);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 620px;
  z-index: 1;
}
.imgDefault::before {
  content: "";
  background-image: url(../assets/img/anh_12.png);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
.linearBackground {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(
    183.21deg,
    #132189 4.14%,
    rgba(19, 27, 119, 0) 47.46%,
    #131b78 97.04%
  );
  width: 100%;
  height: 100%;
  z-index: 999;
}
.containerNew {
  position: absolute;
  z-index: 9999;
  top: 0;
}
.slideImg {
  width: 900px;
  overflow: hidden;
}
</style>
