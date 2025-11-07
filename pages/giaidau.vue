<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto">
            <div class="flex justify-between items-center mb-[46px] pt-[50px]">
              <div>
                <h1 class="font-medium text-[45px]">Giải đấu</h1>
              </div>
              <div class="flex justify-between gap-4">
                <NuxtLink to="/taogiaidau">
                  <div
                    class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd"
                  >
                    Tạo giải đấu mới
                  </div>
                </NuxtLink>
                <NuxtLink to="/quanlygiaidau/1/danhsachdoibong">
                  <div
                    class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd"
                  >
                    Giải đấu của tôi
                  </div>
                </NuxtLink>
                <div class="search max-w-[397px] h-[60px] rounded-2xl relative">
                  <input
                    class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]"
                    type="text"
                    placeholder="Tìm kiếm"
                  />
                  <Icon
                    class="absolute IconSearch"
                    name="hugeicons:search-02"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-8">
              <div
                v-for="(item, index) in listData"
                :key="index"
                class="cardGiaidau"
                :class="[
                  activeIndex === index
                    ? 'cardGiaidau-click'
                    : 'cardGiaidau-noclick',
                ]"
                @click="handelClick(index)"
              >
                <div
                  :class="[
                    activeIndex === index
                      ? 'cardAbsolute-click'
                      : 'cardAbsolute-noclick',
                  ]"
                  class="cardAbsolute flex flex-col justify-between items-center pl-[51px] pr-[51px] pt-[22px] pb-[22px]"
                >
                  <div class="max-w-[136px] h-[171px]">
                    <img
                      class="w-full h-full object-cover"
                      :src="item?.imageUrl"
                      alt=""
                    />
                  </div>
                  <div
                    :style="[
                      activeIndex === index
                        ? 'color :rgba(244, 134, 55, 1)'
                        : 'color :rgba(0, 0, 0, 1)',
                    ]"
                  >
                    <h2
                      style="width: 200px"
                      class="font-medium text-[25px] text-center"
                    >
                      {{ item.name }}
                    </h2>
                    <!-- <h3
                      style="
                        width: 200px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      class="font-normal text-[18px] text-center"
                    >
                      {{ item.description }}
                    </h3> -->
                  </div>
                  <NuxtLink :to="`quanlygiaidau/${item.id}/danhsachdoibong`">
                    <div
                      :style="[
                        activeIndex === index
                          ? 'background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)'
                          : 'background :rgba(177, 174, 172, 1)',
                      ]"
                      style="color: rgba(255, 255, 255, 1)"
                      class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
                    >
                      Xem chi tiết
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-[40px]">
              <div class="flex justify-between gap-4 items-center">
                <div
                  class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                  style="
                    border: 1.5px solid rgba(247, 163, 39, 1);
                    color: rgba(247, 163, 39, 1);
                  "
                >
                  <Icon
                    class="text-[20px]"
                    name="ci:chevron-left"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="flex gap-2">
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                  <Icon
                    class="dotCirCle"
                    name="octicon:dot-fill-16"
                    width="16"
                    height="16"
                  />
                </div>
                <div
                  class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
                  style="
                    background-color: rgba(247, 163, 39, 1);
                    color: rgba(255, 255, 255, 1);
                  "
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
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import SliderBanner from "../component/library/sliderBanner/index.vue";
import { useTournamentStore } from "../store/tournament";
export default defineComponent({
  components: {
    SliderBanner,
  },
  setup() {
    const listData: Ref<Array<null>> = ref([]);
    const TournamentStore = useTournamentStore();
    onMounted(() => {
      OpenTournament();
    });

    const keyword: Ref<string> = ref("");
    const OpenTournament = () => {
      let params = [
        keyword.value?.toString() && `name=${keyword.value}`,
      ].filter(Boolean);

      let url = params.length > 0 ? `?${params.join("&")}` : "";
      TournamentStore.fnGetTournament(url)
        .then((res) => {
          listData.value = res;
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    const activeIndex = ref<number | null>(null);
    const handelClick = (index) => {
      activeIndex.value = index;
    };
    return {
      handelClick,
      activeIndex,
      listData,
    };
  },
});
</script>
<style scoped>
.buttonAdd {
  border: 1px solid rgba(4, 184, 10, 1);
  color: rgba(4, 184, 10, 1);
}
.search {
  border: 1px solid rgba(177, 174, 172, 1);

  background: rgba(255, 255, 255, 1);
}
.IconSearch {
  top: 30%;
  left: 14px;
  width: 23px;
  height: 23px;
  border-width: 2px;
}

.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 457px;
  max-width: 285px;
  padding: 2.5px; /* tạo khoảng viền */
  box-sizing: border-box;
}

.cardGiaidau-click {
  background: linear-gradient(
    180deg,
    #f17a3c 0%,
    #131b77 100%
  ); /* border gradient */
}
.cardGiaidau-noclick {
  background: linear-gradient(
    180deg,
    #b0aeac 0%,
    #b1aeac 100%
  ); /* border gradient */
}
.cardAbsolute {
  width: 100%;
  height: 100%;
  border-radius: 16px; /* nhỏ hơn border-radius ngoài 1 chút */
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
}
.cardAbsolute-click {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}
.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}
</style>
