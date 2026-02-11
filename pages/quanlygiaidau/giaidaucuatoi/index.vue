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

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
        <div v-for="n in 6" :key="n" class="animate-pulse cardGiaidau w-full"></div>
      </div>

      <div v-else>
        <div v-if="tournamentsFiltered.length === 0" class="text-center py-12 text-gray-500">
          Không tìm thấy giải đấu.
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
          <div
            v-for="(item, index) in tournamentsFiltered"
            :key="index"
            class="cardGiaidau w-full"
          >
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
    const activeIndex = ref<number | null>(null);

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
      activeIndex,
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

.buttonChitiet:hover{
  color :rgba(244, 134, 55, 1)
}

@media (min-width: 1600px) {
  .listCardGiaiDau {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>