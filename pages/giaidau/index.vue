<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto">
            <!-- Header: responsive - trên mobile sẽ xếp cột, trên desktop hàng ngang -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-[46px] pt-[30px] md:pt-[50px]">
              <div>
                <!-- font-size responsive để không bị bó nghẹt trên mobile -->
                <h1 class="font-medium text-[32px] md:text-[45px] leading-tight">
                  Giải đấu đang diễn ra
                </h1>
              </div>

              <!-- Buttons: wrap trên mobile, fixed-width trên desktop -->
              <div class="flex flex-wrap gap-4 mt-4 md:mt-0 items-center">
                <NuxtLink to="/taogiaidau">
                  <div
                    class="w-full sm:w-[180px] md:w-[232px] h-[50px] flex justify-center items-center font-medium text-[16px] rounded-2xl buttonAdd"
                  >
                    Tạo giải đấu mới
                  </div>
                </NuxtLink>
                <NuxtLink to="/quanlygiaidau/1/danhsachdoibong">
                  <div
                    class="w-full sm:w-[180px] md:w-[232px] h-[50px] flex justify-center items-center font-medium text-[16px] rounded-2xl buttonAdd"
                  >
                    Giải đấu của tôi
                  </div>
                </NuxtLink>
              </div>
            </div>
            <!-- /Header -->

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
              <div
                v-for="(item, index) in listData"
                :key="index"
                class="cardGiaidau w-full"
              >
                <NuxtLink :to="`quanlygiaidau/${item.id}/danhsachdoibong`">
                  <div class="cardAbsolute flex flex-col justify-between items-center p-[16px]">
                    <div class="max-w-[110px] h-[130px]">
                      <img
                        class="w-full h-full object-contain"
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
                      class="text-center"
                    >
                      <h2
                        style="width: 160px"
                        class="font-medium text-[18px] mx-auto"
                      >
                        {{ item.name }}
                      </h2>
                    </div>
                    <div
                      style="color: rgba(255, 255, 255, 1);background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)"
                      class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
                    >
                      Xem chi tiết
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Xem thêm: dẫn tới trang hiển thị đầy đủ các giải đấu đang diễn ra -->
            <div class="flex justify-center mt-[40px]">
              <NuxtLink to="/giaidau/dangdienra">
                <div
                  class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd"
                >
                  Xem thêm
                </div>
              </NuxtLink>
            </div>
            <!-- Kết thúc phần thay đổi -->

          </div>

          <div class="app-container container mx-auto mt-12">
            <div class="flex justify-between items-center mb-[46px] pt-[10px]">
              <div>
                <h1 class="font-medium text-[45px]">
                  Giải đấu đang mở đăng ký
                </h1>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
              <div
                v-for="(item, index) in listDataFeartured"
                :key="index"
                class="cardGiaidau w-full"
              >
                <NuxtLink :to="`quanlygiaidau/${item.id}/danhsachdoibong`">
                  <div class="cardAbsolute flex flex-col justify-between items-center p-[16px]">
                    <div class="max-w-[110px] h-[130px]">
                      <img
                        class="w-full h-full object-contain"
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
                      class="text-center"
                    >
                      <h2
                        style="width: 160px"
                        class="font-medium text-[18px] mx-auto"
                      >
                        {{ item.name }}
                      </h2>
                    </div>
                    <div
                      style="color: rgba(255, 255, 255, 1);background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)"
                      class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
                    >
                      Xem chi tiết
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Xem thêm cho mục đang mở đăng ký -->
            <div class="flex justify-center mt-[40px]">
              <NuxtLink to="/giaidau/dangmo">
                <div
                  class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd"
                >
                  Xem thêm
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="app-container container mx-auto mt-12">
            <div class="flex justify-between items-center mb-[46px] pt-[10px]">
              <div>
                <h1 class="font-medium text-[45px]">Giải đấu đã diễn ra</h1>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
              <div
                v-for="(item, index) in listDataCompleted"
                :key="index"
                class="cardGiaidau w-full"
              >
                <NuxtLink :to="`quanlygiaidau/${item.id}/danhsachdoibong`">
                  <div class="cardAbsolute flex flex-col justify-between items-center p-[16px]">
                    <div class="max-w-[110px] h-[130px]">
                      <img
                        class="w-full h-full object-contain"
                        :src="item?.imageUrl"
                        alt=""
                      />
                    </div>
                    <div
                      class="buttonChitiet text-center"
                      :style="[
                        activeIndex === index
                          ? 'color :rgba(244, 134, 55, 1)'
                          : 'color :rgba(0, 0, 0, 1)',
                      ]"
                    >
                      <h2
                        style="width: 160px"
                        class="font-medium text-[18px] mx-auto"
                      >
                        {{ item.name }}
                      </h2>
                    </div>
                    <div
                      style="color: rgba(255, 255, 255, 1);background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)"
                      class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]"
                    >
                      Xem chi tiết
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Xem thêm cho mục đã diễn ra -->
            <div class="flex justify-center mt-[40px]">
              <NuxtLink to="/giaidau/dadienra">
                <div
                  class="w-[232px] h-[60px] flex justify-center items-center font-medium text-[20px] rounded-2xl buttonAdd"
                >
                  Xem thêm
                </div>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import SliderBanner from "../component/library/sliderBanner/index.vue";
import { useTournamentStore } from "../store/tournament";

export default defineComponent({
  components: {
    SliderBanner,
  },
  setup() {
    // ongoing (preview)
    const listData = ref<any[]>([]);
    const listDataFeartured = ref<any[]>([]);
    const listDataCompleted = ref<any[]>([]);

    const TournamentStore = useTournamentStore();
    const limit = 5;
    const offset2 = ref(1);
    const offset3 = ref(1);
    const keywordOnGoing = ref("");
    const keywordFeartured = ref("");
    const keywordCompleted = ref("");

    onMounted(() => {
      Promise.allSettled([OpenTournament(), OpenFeartured(), OpenCompleted()])
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    });

    // Watch keyword changes only (ongoing no offset)
    watch(keywordOnGoing, () => {
      OpenTournament();
    });
    watch([offset2, keywordFeartured], () => {
      OpenFeartured();
    });
    watch([offset3, keywordCompleted], () => {
      OpenCompleted();
    });

    /**
     * IMPORTANT:
     * The ongoing preview should now read only the array wrapped in res.data.items
     * (per the updated API). We still keep the rest of behavior unchanged.
     */
    const OpenTournament = async () => {
      const params = [
        keywordOnGoing.value?.toString() && `keyword=${encodeURIComponent(keywordOnGoing.value)}`,
        limit && `limit=${limit}`,
        // fixed offset = 1 for preview; full list is at /giaidau/dangdienra
        `offset=1`,
      ].filter(Boolean);

      const url = params.length > 0 ? `?${params.join("&")}` : "";

      try {
        const res: any = await TournamentStore.fnGetOngoing(url);

        // Per new API: only take data from res.data.items
        let items: any[] = [];
        if (res && res.data && Array.isArray(res.data.items)) {
          items = res.data.items;
        } else if (res && Array.isArray(res.items)) {
          // fallback if API uses items at root
          items = res.items;
        } else if (Array.isArray(res)) {
          // fallback if API returned a raw array
          items = res;
        } else {
          items = [];
        }

        // ensure we only show up to `limit` items in the preview
        listData.value = Array.isArray(items) ? items.slice(0, limit) : [];
      } catch (err) {
        console.log("err", err);
        listData.value = [];
      }
    };

    // Updated: read res.data.items first (same behavior as ongoing)
    const OpenFeartured = async () => {
      const params = [
        keywordFeartured.value?.toString() && `keyword=${encodeURIComponent(keywordFeartured.value)}`,
        limit && `limit=${limit}`,
        offset2.value && `offset=${offset2.value}`,
      ].filter(Boolean);

      const url = params.length > 0 ? `?${params.join("&")}` : "";
      try {
        const res: any = await TournamentStore.fnGetUpcoming(url);

        // Prefer res.data.items per updated API shape
        let items: any[] = [];
        if (res && res.data && Array.isArray(res.data.items)) {
          items = res.data.items;
        } else if (res && Array.isArray(res.items)) {
          items = res.items;
        } else if (Array.isArray(res)) {
          items = res;
        } else if (res && res.data) {
          // fallback: data may itself be an array or contain items/list
          if (Array.isArray(res.data)) items = res.data;
          else if (Array.isArray((res.data as any).items)) items = (res.data as any).items;
          else if (Array.isArray((res.data as any).list)) items = (res.data as any).list;
          else items = res.data;
        } else {
          items = [];
        }

        listDataFeartured.value = Array.isArray(items) ? items.slice(0, limit) : [];
      } catch (err) {
        console.log("err", err);
        listDataFeartured.value = [];
      }
    };

    // Updated: read res.data.items first (same behavior as ongoing)
    const OpenCompleted = async () => {
      const params = [
        keywordCompleted.value?.toString() && `keyword=${encodeURIComponent(keywordCompleted.value)}`,
        limit && `limit=${limit}`,
        offset3.value && `offset=${offset3.value}`,
      ].filter(Boolean);

      const url = params.length > 0 ? `?${params.join("&")}` : "";
      try {
        const res: any = await TournamentStore.fnGetCompleted(url);

        // Prefer res.data.items per updated API shape
        let items: any[] = [];
        if (res && res.data && Array.isArray(res.data.items)) {
          items = res.data.items;
        } else if (res && Array.isArray(res.items)) {
          items = res.items;
        } else if (Array.isArray(res)) {
          items = res;
        } else if (res && res.data) {
          // fallback: data may itself be an array or contain items/list
          if (Array.isArray(res.data)) items = res.data;
          else if (Array.isArray((res.data as any).items)) items = (res.data as any).items;
          else if (Array.isArray((res.data as any).list)) items = (res.data as any).list;
          else items = res.data;
        } else {
          items = [];
        }

        listDataCompleted.value = Array.isArray(items) ? items.slice(0, limit) : [];
      } catch (err) {
        console.log("err", err);
        listDataCompleted.value = [];
      }
    };

    const activeIndex = ref<number | null>(null);

    return {
      offset2,
      offset3,
      keywordCompleted,
      keywordFeartured,
      keywordOnGoing,
      activeIndex,
      listData,
      listDataFeartured,
      listDataCompleted,
    };
  },
});
</script>

<style scoped>
.buttonAdd {
  border: 1px solid rgba(4, 184, 10, 1);
  color: rgba(4, 184, 10, 1);
}
/* ensure the mobile full-width buttons look good */
.buttonAdd {
  display: inline-flex;
  text-align: center;
}

/* smaller padding on mobile for header area */
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

/* Thu nhỏ card để 5 cái vừa hàng */
.cardGiaidau {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #b0aeac 0%, #b1aeac 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
  height: 340px; /* giảm chiều cao */
  width: 100%;
  padding: 2px; /* tạo khoảng viền */
  box-sizing: border-box;
}

.cardGiaidau:hover{
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
  border-radius: 18px; /* nhỏ hơn border-radius ngoài 1 chút */
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
  clip-path: polygon(0 0, 84% 0, 100% 17%, 100% 100%, 17% 100%, 0 84%);
}
.cardAbsolute:hover {
  background: linear-gradient(180deg, #fffefe 0%, #ffd7c3 100%);
}
.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}
.buttonChitiet:hover{
color :rgba(244, 134, 55, 1)
}

@media (min-width: 1600px) {
  .listCardGiaiDau {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>