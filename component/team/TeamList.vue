<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-[46px]">
      <div>
        <h1 class="font-medium text-[32px] md:text-[45px] leading-tight">Đội bóng</h1>
      </div>
      
      <div class="flex flex-wrap gap-4 mt-4 md:mt-0 items-center">
        <template v-if="isAuthenticated">
          <NuxtLink to="/taodoibong">
            <div
              class="w-full sm:w-[180px] md:w-[232px] h-[50px] flex justify-center items-center font-medium text-[16px] rounded-2xl buttonAdd cursor-pointer"
            >
              Tạo đội bóng mới
            </div>
          </NuxtLink>
          <NuxtLink to="../quanlygiaidau/giaidaucuatoi">
            <div
              class="w-full sm:w-[180px] md:w-[232px] h-[50px] flex justify-center items-center font-medium text-[16px] rounded-2xl buttonAdd cursor-pointer"
            >
              Đội bóng của tôi
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>

    <!-- Grid đội bóng -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 place-items-center">
      <div
        v-for="(item, index) in teams"
        :key="index"
        class="cardGiaidau w-full"
      >
        <NuxtLink :to="`quanlydoibong/${item.teamId}/danhsach`">
          <div class="cardAbsolute flex flex-col justify-between items-center p-3 md:p-[16px]">
            <div class="max-w-[90px] md:max-w-[110px] h-[110px] md:h-[130px]">
              <img 
                class="w-full h-full object-contain" 
                :src="item?.logoUrl || '/img/imglg.png'" 
                alt="" 
                @error="$event.target.src = '/img/imglg.png'"
              />
            </div>
            <div
              :style="[
                activeIndex === index
                  ? 'color :rgba(244, 134, 55, 1)'
                  : 'color :rgba(0, 0, 0, 1)',
              ]"
              class="text-center"
            >
              <h2 class="font-medium text-[16px] md:text-[18px] mx-auto line-clamp-2">
                {{ item.name }}
              </h2>
            </div>
            <div
              style="
                color: rgba(255, 255, 255, 1);
                background: linear-gradient(90deg, #ec7748 0%, #a545d6 100%);
              "
              class="w-[120px] md:w-[138px] h-[36px] md:h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[14px] md:text-[16px] mt-2"
            >
              Xem chi tiết
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 md:mt-[40px]">
      <div class="flex justify-between gap-3 md:gap-4 items-center">
        <div
          class="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full cursor-pointer transition-all hover:scale-110"
          style="
            border: 1.5px solid rgba(247, 163, 39, 1);
            color: rgba(247, 163, 39, 1);
          "
          @click="handlePrevPage"
        >
          <Icon
            class="text-[18px] md:text-[20px]"
            name="ci:chevron-left"
            width="40"
            height="40"
          />
        </div>
        <div class="hidden md:flex gap-2">
          <Icon
            v-for="i in 5"
            :key="i"
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
        </div>
        <div
          class="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full cursor-pointer transition-all hover:scale-110"
          style="
            background-color: rgba(247, 163, 39, 1);
            color: rgba(255, 255, 255, 1);
          "
          @click="handleNextPage"
        >
          <Icon
            class="text-[18px] md:text-[20px]"
            name="ci:chevron-right"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface TeamProps {
  teams: any[];
  isAuthenticated: boolean;
  currentPage: number;
}

const props = defineProps<TeamProps>();
const emit = defineEmits(['prev-page', 'next-page']);

const activeIndex = ref<number | null>(null);

const handlePrevPage = () => {
  emit('prev-page');
};

const handleNextPage = () => {
  emit('next-page');
};
</script>

<style scoped>
.buttonAdd {
  border: 1px solid rgba(4, 184, 10, 1);
  color: rgba(4, 184, 10, 1);
  transition: all 0.3s ease;
}

.buttonAdd:hover {
  background: rgba(4, 184, 10, 0.1);
  transform: translateY(-2px);
}

.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 300px;
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.cardGiaidau:hover {
  background: linear-gradient(180deg, #f17a3c 0%, #131b77 100%);
  transform: translateY(-5px);
}

.cardAbsolute {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  transition: all 0.3s ease;
}

.cardAbsolute:hover {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}

.dotCirCle {
  width: 15px;
  height: 15px;
  background-color: rgba(255, 229, 190, 1);
  border-radius: 50%;
}

@media (min-width: 768px) {
  .cardGiaidau {
    height: 340px;
  }
}
</style>