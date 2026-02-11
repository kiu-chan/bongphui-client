<template>
  <main class="tournaments-page min-h-screen w-full overflow-x-hidden">
    <!-- Hero stays full-width behind the content -->
    <section class="page-hero w-full"></section>

    <!-- Content panel: full width, pulled up to overlap hero so page uses full viewport -->
    <section class="page-content relative z-40 w-full max-w-screen-2xl mx-0 px-6 py-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Danh sách giải đấu</h1>
          <p class="text-sm text-gray-500 mt-1">Dữ liệu lấy từ API /api/tournaments — chỉ hiển thị nút "Xem đội".</p>
        </div>

        <div class="flex items-center gap-3">
          <input
            v-model="keyword"
            @keyup.enter="onSearch"
            type="text"
            placeholder="Tìm kiếm tên giải đấu..."
            class="w-64 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button @click="onSearch" class="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">Tìm</button>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="animate-pulse bg-white rounded-lg shadow-sm p-4 h-40"></div>
      </div>

      <!-- Grid -->
      <div v-else>
        <div v-if="tournamentsFiltered.length === 0" class="text-center py-12 text-gray-500">
          Không tìm thấy giải đấu.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="t in tournamentsFiltered"
            :key="t.id"
            class="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div class="flex flex-col md:flex-row">
              <!-- Left image -->
              <div class="md:w-40 h-40 md:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  :src="t.imageUrl || t.logoUrl || defaultLogo"
                  @error="$event.target.src = defaultLogo"
                  :alt="t.name"
                  class="w-full h-40 md:h-full object-cover"
                />
              </div>

              <!-- Right content -->
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <!-- Title: allow up to 2 lines then ellipsis -->
                  <h2
                    class="font-semibold text-lg md:text-xl text-gray-800 leading-tight break-words line-clamp-2"
                    :title="t.name"
                  >
                    {{ t.name }}
                  </h2>

                  <!-- Location (single line, ellipsis) -->
                  <p class="text-sm text-gray-500 mt-1 truncate">{{ t.location || 'Địa điểm chưa cập nhật' }}</p>

                  <!-- Description: allow up to 3 lines then ellipsis -->
                  <p v-if="t.description" class="text-sm text-gray-600 mt-3 line-clamp-3">
                    {{ t.description }}
                  </p>

                  <div class="mt-3 text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                    <span class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V11H3v8a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(t.startDate) }} → {{ formatDate(t.endDate) }}
                    </span>

                    <span class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 7h18M3 12h18M3 17h18" />
                      </svg>
                      {{ t.numberOfTeams ?? 'N/A' }} đội
                    </span>

                    <span v-if="t.format" class="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{{ t.format }}</span>
                  </div>
                </div>

                <!-- Only "Xem đội" button -->
                <div class="mt-4 flex items-center justify-end">
                  <button
                    @click="viewTeams(t.id)"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Xem đội
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Hiển thị {{ offset + 1 }} - {{ Math.min(offset + tournaments.length, total) }} / {{ total || tournaments.length }} kết quả
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="offset === 0"
              class="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              @click="nextPage"
              :disabled="tournaments.length < limit"
              class="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useTournamentStore } from "../../store/tournament";
import defaultLogoImg from "../../assets/img/Chelsea_FC.svg.png";

export default defineComponent({
  setup() {
    const TournamentStore = useTournamentStore();
    const router = useRouter();

    const tournaments = ref<any[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const keyword = ref<string>("");
    const limit = ref<number>(6);
    const offset = ref<number>(0);
    const total = ref<number>(0);

    const defaultLogo = defaultLogoImg;

    const fetchList = async () => {
      loading.value = true;
      try {
        const params: string[] = [];
        if (keyword.value && keyword.value.trim() !== "") params.push(`keyword=${encodeURIComponent(keyword.value.trim())}`);
        params.push(`limit=${limit.value}`);
        params.push(`offset=${offset.value}`);
        const query = params.length ? `?${params.join("&")}` : "";
        const res: any = await TournamentStore.fnGetTournament(query);

        if (Array.isArray(res)) {
          tournaments.value = res;
          total.value = res.length;
        } else if (res && Array.isArray(res.data)) {
          tournaments.value = res.data;
          total.value = typeof res.total === "number" ? res.total : res.data.length;
        } else if (res && Array.isArray(res.tournaments)) {
          tournaments.value = res.tournaments;
          total.value = typeof res.total === "number" ? res.total : res.tournaments.length;
        } else {
          tournaments.value = res || [];
          total.value = tournaments.value.length;
        }
      } catch (err: any) {
        console.error("Lỗi khi lấy danh sách giải đấu:", err);
        error.value = err?.message || "Lỗi khi tải dữ liệu";
        tournaments.value = [];
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchList();
    });

    const onSearch = () => {
      offset.value = 0;
      fetchList();
    };

    const nextPage = () => {
      offset.value += limit.value;
      fetchList();
    };

    const prevPage = () => {
      offset.value = Math.max(0, offset.value - limit.value);
      fetchList();
    };

    const viewTeams = (id?: number | string) => {
      if (!id) return;
      router.push(`/api/tournaments/${id}/teams`).catch(() => {});
    };

    const formatDate = (d?: string) => {
      if (!d) return "-";
      try {
        return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
      } catch {
        return d as string;
      }
    };

    const tournamentsFiltered = computed(() => {
      const kw = keyword.value.trim().toLowerCase();
      if (!kw) return tournaments.value;
      return tournaments.value.filter((x: any) => {
        return (
          (x.name || "").toString().toLowerCase().includes(kw) ||
          (x.location || "").toString().toLowerCase().includes(kw) ||
          (x.description || "").toString().toLowerCase().includes(kw)
        );
      });
    });

    return {
      tournaments,
      tournamentsFiltered,
      loading,
      error,
      keyword,
      limit,
      offset,
      total,
      defaultLogo,
      onSearch,
      nextPage,
      prevPage,
      viewTeams,
      formatDate,
    };
  },
});
</script>

<style scoped>
/* Hero uses site background (keeps existing header/hero) */
.page-hero {
  height: 260px;
  background: transparent; /* leave global site hero visible */
}

/* Page content: remove side gutters and make panel span full width
   but keep inner content max width for readability.
*/
.page-content {
  margin: 0;
  padding-left: 48px;
  padding-right: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.98);
  box-shadow: 0 10px 30px rgba(7, 8, 26, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.04);
  transform: translateY(-110px); /* pull up to overlap hero and remove top gap */
}

/* Make sure layout uses full viewport width and no horizontal scrolling */
.tournaments-page {
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}

/* utility line clamps for truncation with ellipsis */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

/* ensure images inside cards don't overflow */
article img { display:block; }

/* small utilities */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>