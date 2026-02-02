<template>
  <main class="tournaments-page min-h-screen w-full overflow-x-hidden">
    <section class="page-hero w-full"></section>

    <section class="page-content relative z-40 w-full max-w-screen-2xl mx-0 px-6 py-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Giải đấu của tôi</h1>
          <p class="text-sm text-gray-500 mt-1">Danh sách giải đấu bạn đã tạo</p>
        </div>

        <div class="flex items-center gap-3">
          <input
            v-model="keyword"
            @keyup.enter="onSearch"
            type="text"
            placeholder="Tìm kiếm..."
            class="w-64 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button @click="onSearch" class="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">Tìm</button>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="animate-pulse bg-white rounded-lg shadow-sm p-4 h-40"></div>
      </div>

      <div v-else>
        <div v-if="tournamentsFiltered.length === 0" class="text-center py-12 text-gray-500">
          Không tìm thấy giải đấu.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="t in tournamentsFiltered" :key="t.id" class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img :src="t.imageUrl || defaultLogo" alt="Logo giải đấu" class="w-full h-40 object-cover rounded mb-3" />
            <h3 class="font-bold text-lg text-gray-800 mb-1">{{ t.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ t.location || "Chưa có địa điểm" }}</p>
            <div class="text-xs text-gray-500 mb-3">
              {{ formatDate(t.startDate) }} - {{ formatDate(t.endDate) }}
            </div>
            <button @click="viewTeams(t.id)" class="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Xem đội
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useTournamentStore } from "~/store/tournament";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const TournamentStore = useTournamentStore();
    const router = useRouter();

    const tournaments = ref<any[]>([]);
    const loading = ref(false);
    const keyword = ref("");
    const defaultLogo = "/img/imglg.png";

    const fetchList = async () => {
      loading.value = true;
      try {
        const res: any = await TournamentStore.fnGetMyTournaments();
        tournaments.value = Array.isArray(res) ? res : [];
      } catch (err: any) {
        console.error("Lỗi:", err);
        tournaments.value = [];
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchList();
    });

    const onSearch = () => {
      fetchList();
    };

    const viewTeams = (id?: number | string) => {
      if (!id) return;
      router.push(`/tournaments/${id}/teams`).catch(() => {});
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
          (x.location || "").toString().toLowerCase().includes(kw)
        );
      });
    });

    return {
      tournaments,
      tournamentsFiltered,
      loading,
      keyword,
      defaultLogo,
      onSearch,
      viewTeams,
      formatDate,
    };
  },
});
</script>

<style scoped>
.page-hero {
  height: 260px;
  background: transparent;
}

.page-content {
  background: white;
  border-radius: 1rem;
  margin-top: -6rem;
}
</style>