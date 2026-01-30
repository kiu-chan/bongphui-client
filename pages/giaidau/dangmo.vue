<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-[46px] pt-[30px] md:pt-[50px]">
              <div>
                <h1 class="font-medium text-[32px] md:text-[45px] leading-tight">
                  Tất cả — Giải đấu đang mở đăng ký
                </h1>
                <p class="text-[14px] text-gray-500 mt-2">Hiển thị các giải đấu đang mở đăng ký. Bạn có thể chuyển trang để xem thêm.</p>
              </div>
              <div class="flex flex-wrap gap-4 mt-4 md:mt-0 items-center">
                <div class="search max-w-[397px] h-[60px] rounded-2xl relative w-full sm:w-[320px]">
                  <input class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]" type="text" placeholder="Tìm kiếm" v-model="keyword" @keyup.enter="goToFirstPage" />
                  <Icon class="absolute IconSearch" name="hugeicons:search-02" width="24" height="24" />
                </div>
                <NuxtLink to="/giaidau">
                  <div class="w-full sm:w-[180px] h-[50px] flex justify-center items-center font-medium text-[16px] rounded-2xl buttonAdd">Quay lại</div>
                </NuxtLink>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
              <div v-for="(item, index) in listData" :key="item?.id ?? index" class="cardGiaidau w-full">
                <NuxtLink :to="`/quanlygiaidau/${item.id}/danhsachdoibong`">
                  <div class="cardAbsolute flex flex-col justify-between items-center p-[16px]">
                    <div class="max-w-[110px] h-[130px]">
                      <img 
                        class="w-full h-full object-contain" 
                        :src="item?.imageUrl || '/img/imglg.png'" 
                        alt="" 
                        @error="$event.target.src = '/img/imglg.png'"
                      />
                    </div>
                    <div :style="[activeIndex === index ? 'color :rgba(244, 134, 55, 1)' : 'color :rgba(0, 0, 0, 1)']" class="text-center">
                      <h2 style="width: 160px" class="font-medium text-[18px] mx-auto">{{ item.name }}</h2>
                    </div>
                    <div style="color: rgba(255, 255, 255, 1);background: linear-gradient(90deg,#ec7748 0%,#a545d6 100%)" class="w-[138px] h-[40px] rounded-[5px] flex justify-center items-center font-normal text-[16px]">Xem chi tiết</div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div class="flex justify-center mt-[40px] items-center gap-4">
              <button class="flex items-center justify-center w-[120px] h-[44px] rounded-full border" :class="{'opacity-40 cursor-not-allowed': page <= 1 || loading}" :disabled="page <= 1 || loading" @click="prevPage">
                <Icon name="ci:chevron-left" width="20" height="20" /><span class="ml-2">Prev</span>
              </button>

              <div class="text-[16px]">Trang <strong>{{ page }}</strong> / <strong>{{ totalPages }}</strong></div>

              <button class="flex items-center justify-center w-[120px] h-[44px] rounded-full bg-[#f7a327] text-white" :class="{'opacity-40 cursor-not-allowed': page >= totalPages || loading}" :disabled="page >= totalPages || loading" @click="nextPage">
                <span class="mr-2">Next</span><Icon name="ci:chevron-right" width="20" height="20" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import SliderBanner from "~/component/library/sliderBanner/index.vue";
import { useTournamentStore } from "~/store/tournament";

export default defineComponent({
  components: { SliderBanner },
  setup() {
    const TournamentStore = useTournamentStore();
    const listData = ref<any[]>([]);
    const keyword = ref<string>("");
    const limit = ref<number>(10);
    const page = ref<number>(1);
    const totalPages = ref<number>(1);
    const totalItems = ref<number>(0);
    const activeIndex = ref<number | null>(null);
    const loading = ref<boolean>(false);

    // flag to avoid watch(page) triggering an extra fetch when we sync page from server
    const suppressPageWatch = ref(false);

    const computeOffset = () => (page.value - 1) * limit.value;

    const fetchUpcoming = async () => {
      loading.value = true;
      const offset = computeOffset();
      const params = [
        keyword.value?.toString() ? `keyword=${encodeURIComponent(keyword.value)}` : null,
        `limit=${limit.value}`,
        `offset=${offset}`,
      ].filter(Boolean);
      const url = params.length ? `?${params.join("&")}` : "";

      try {
        const res: any = await TournamentStore.fnGetUpcoming(url);

        // normalize response to support API shapes like:
        // { items: [...], totalItems: n, totalPages: n, currentPage: n, limit: n, offset: n }
        // or older shapes: res.data.items / res.data.list / res.items / array

        let payload: any = null;
        let items: any[] = [];
        let totalFromApi: number | null = null;
        let totalPagesFromApi: number | null = null;
        let currentPageFromApi: number | null = null;

        if (res == null) {
          payload = null;
        } else if (Array.isArray(res)) {
          // direct array response
          items = res;
          payload = null;
        } else {
          // prefer res.data if exists, otherwise use res itself
          payload = res.data ?? res;
        }

        if (payload) {
          if (Array.isArray(payload.items)) {
            items = payload.items;
          } else if (Array.isArray(payload.list)) {
            items = payload.list;
          } else if (Array.isArray(payload.data)) {
            items = payload.data;
          } else if (Array.isArray(payload)) {
            items = payload;
          }

          // totals from known fields
          const totalCandidates = payload.totalItems ?? payload.total ?? payload.meta?.total;
          totalFromApi = Number(totalCandidates);
          if (Number.isNaN(totalFromApi)) totalFromApi = null;

          const totalPagesCandidates = payload.totalPages ?? payload.meta?.totalPages;
          totalPagesFromApi = Number(totalPagesCandidates);
          if (Number.isNaN(totalPagesFromApi)) totalPagesFromApi = null;

          const currentPageCandidates = payload.currentPage ?? payload.page ?? null;
          currentPageFromApi = currentPageCandidates != null ? Number(currentPageCandidates) : null;
          if (currentPageFromApi != null && Number.isNaN(currentPageFromApi)) currentPageFromApi = null;

          // adjust local limit if server returned a valid limit
          const limitFromApi = Number(payload.limit ?? NaN);
          if (!Number.isNaN(limitFromApi) && limitFromApi > 0) {
            limit.value = limitFromApi;
          }
        }

        // If items still empty and res had items at root (res.items)
        if ((!items || items.length === 0) && res && Array.isArray(res.items)) {
          items = res.items;
          const totalCandidates = res.totalItems ?? res.total ?? res.meta?.total;
          totalFromApi = Number(totalCandidates);
          if (Number.isNaN(totalFromApi)) totalFromApi = null;
          const totalPagesCandidates = res.totalPages ?? res.meta?.totalPages;
          totalPagesFromApi = Number(totalPagesCandidates);
          if (Number.isNaN(totalPagesFromApi)) totalPagesFromApi = null;
          const currentPageCandidates = res.currentPage ?? res.page ?? null;
          currentPageFromApi = currentPageCandidates != null ? Number(currentPageCandidates) : null;
          if (currentPageFromApi != null && Number.isNaN(currentPageFromApi)) currentPageFromApi = null;
        }

        listData.value = items || [];

        // Compute totalPages with priority:
        // 1) explicit totalPagesFromApi
        // 2) compute from totalFromApi / limit
        // 3) fallback inference from returned items
        if (totalFromApi != null && !Number.isNaN(totalFromApi)) {
          totalItems.value = totalFromApi;
          if (totalPagesFromApi != null && !Number.isNaN(totalPagesFromApi)) {
            totalPages.value = Math.max(1, totalPagesFromApi);
          } else {
            totalPages.value = Math.max(1, Math.ceil(totalItems.value / Math.max(1, limit.value)));
          }
        } else if (totalPagesFromApi != null && !Number.isNaN(totalPagesFromApi)) {
          totalPages.value = Math.max(1, totalPagesFromApi);
          totalItems.value = totalPages.value * limit.value;
        } else {
          // fallback: infer from returned items
          totalItems.value = Array.isArray(items) ? items.length : 0;
          if (Array.isArray(items)) {
            if (items.length < limit.value) {
              totalPages.value = page.value;
            } else {
              totalPages.value = Math.max(1, page.value + 1);
            }
          } else {
            totalPages.value = 1;
          }
        }

        // Sync page with server's currentPage if provided, avoid triggering watch fetch loop
        if (currentPageFromApi != null && !Number.isNaN(currentPageFromApi)) {
          const clamped = Math.max(1, Math.min(currentPageFromApi, totalPages.value));
          if (clamped !== page.value) {
            suppressPageWatch.value = true;
            page.value = clamped;
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy upcoming:", err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => fetchUpcoming());

    watch(keyword, () => { page.value = 1; fetchUpcoming(); });

    watch(page, () => {
      if (page.value < 1) page.value = 1;
      if (suppressPageWatch.value) {
        suppressPageWatch.value = false;
        return;
      }
      fetchUpcoming();
    });

    const prevPage = () => { if (page.value > 1) page.value--; };
    const nextPage = () => { if (page.value < totalPages.value) page.value++; };
    const goToFirstPage = () => { page.value = 1; };

    return { listData, keyword, page, totalPages, prevPage, nextPage, activeIndex, limit, loading, goToFirstPage };
  },
});
</script>

<style scoped>
.buttonAdd { border: 1px solid rgba(4,184,10,1); color: rgba(4,184,10,1); display:inline-flex; text-align:center; }
.search { border:1px solid rgba(177,174,172,1); background:#fff; }
.IconSearch { top:30%; left:14px; width:23px; height:23px; border-width:2px; }
.cardGiaidau { position:relative; border-radius:20px; background:linear-gradient(180deg,#b0aeac 0%,#b1aeac 100%); clip-path: polygon(0 0,84% 0,100% 17%,100% 100%,17% 100%,0 84%); height:340px; width:100%; padding:2px; box-sizing:border-box; }
.cardGiaidau:hover { background: linear-gradient(180deg,#f17a3c 0%,#131b77 100%); }
.cardAbsolute { width:100%; height:100%; border-radius:18px; background:linear-gradient(180deg,#fffefe 0%,#eeeae8 100%); clip-path: polygon(0 0,84% 0,100% 17%,100% 100%,17% 100%,0 84%); }
.cardAbsolute:hover { background: linear-gradient(180deg,#fffefe 0%,#ffd7c3 100%); }
</style>