<template>
  <main class="tournaments-page min-h-screen w-full overflow-x-hidden">
    <!-- Hero background (keeps site header background visible but provides a consistent hero for this page) -->
    <section class="page-hero w-full"></section>

    <!-- Content panel overlapping the hero so background doesn't obscure text/buttons -->
    <section class="page-content container mx-auto -mt-24 px-6 py-8 rounded-2xl shadow-lg relative z-40">
      <div class="flex items-center justify-between mb-6">
        <div>
          <button @click="goBack" type="button" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-gray-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            Quay lại
          </button>
          <h1 class="text-2xl lg:text-3xl font-semibold text-gray-800 mt-3">Đội tham dự</h1>
          <p class="text-sm text-gray-500 mt-1">Danh sách đội trong giải đấu</p>
        </div>

        <div class="flex items-center gap-3">
          <input
            v-model="q"
            @input="onFilter"
            type="search"
            placeholder="Tìm đội (tên / sân / huấn luyện viên)..."
            class="w-64 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />
          <select v-model="yearFilter" @change="onFilter" class="px-3 py-2 border rounded-md text-sm bg-white">
            <option value="">Tất cả năm thành lập</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <div class="text-gray-500">Đang tải danh sách đội...</div>
      </div>

      <div v-else>
        <div v-if="teamsFiltered.length === 0" class="text-center py-12 text-gray-500">
          Không tìm thấy đội nào.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="team in teamsFiltered"
            :key="team.teamId || team.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div class="flex flex-col md:flex-row">
              <div class="md:w-40 h-40 md:h-auto bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  :src="getTeamLogo(team.logoUrl)"
                  @error="$event.target.src = defaultLogo"
                  :alt="team.name"
                  class="w-full h-40 md:h-full object-contain"
                />
              </div>

              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-semibold text-lg text-gray-800 truncate">{{ team.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1 truncate">{{ team.home_stadium || 'Sân chưa cập nhật' }}</p>

                  <p v-if="team.description" class="text-sm text-gray-600 mt-3 line-clamp-3">{{ team.description }}</p>

                  <div class="mt-3 text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                    <span class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V11H3v8a2 2 0 002 2z" />
                      </svg>
                      Thành lập: {{ team.foundedYear ?? 'N/A' }}
                    </span>

                    <span v-if="team.coach?.name" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.72 0 5.24.75 7.379 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      HLV: {{ team.coach.name }}
                    </span>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-end gap-2">
                  <!-- ONLY keep the "Xem thành viên" button as requested -->
                  <button
                    type="button"
                    :disabled="navigating"
                    @click="viewPlayers(team)"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 disabled:opacity-60"
                  >
                    Xem thành viên
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTournamentStore } from "../../../../store/tournament";
import defaultLogo from "../../../assets/img/Chelsea_FC.svg.png";

const route = useRoute();
const router = useRouter();
const TournamentStore = useTournamentStore();

const tournamentId = Number(route.params.id || 0);
const teams = ref<any[]>([]);
const loading = ref(false);

const q = ref("");
const yearFilter = ref("");

// navigation state to avoid double click
const navigating = ref(false);

const fetchTeams = async (id: number | string) => {
  loading.value = true;
  try {
    const res: any = await TournamentStore.fnGetTeamsTournament(id);
    if (Array.isArray(res)) teams.value = res;
    else if (res && Array.isArray(res.data)) teams.value = res.data;
    else if (res && Array.isArray(res.teams)) teams.value = res.teams;
    else if (res && Array.isArray(res.result)) teams.value = res.result;
    else teams.value = Array.isArray(res) ? res : (res || []);
  } catch (err) {
    console.error("Lỗi khi lấy đội:", err);
    teams.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (tournamentId) fetchTeams(tournamentId);
});

watch(() => route.params.id, (val) => {
  const id = Number(val);
  if (id) fetchTeams(id);
});

const years = computed(() => Array.from(new Set(teams.value.map(t => t.foundedYear).filter(Boolean))).sort((a,b)=> (b as number)-(a as number)));

const onFilter = () => {};

const teamsFiltered = computed(() => {
  const term = q.value.trim().toLowerCase();
  return teams.value.filter(t => {
    if (yearFilter.value && String(t.foundedYear) !== String(yearFilter.value)) return false;
    if (!term) return true;
    const coach = t.coach?.name || "";
    return (
      (t.name || "").toLowerCase().includes(term) ||
      (t.home_stadium || "").toLowerCase().includes(term) ||
      (coach || "").toLowerCase().includes(term)
    );
  });
});

const getTeamLogo = (logo?: string | null) => {
  if (!logo) return defaultLogo;
  if (typeof logo === "string" && logo.length < 6 && !logo.startsWith("http")) return defaultLogo;
  return logo;
};

// navigate to the players page (child route)
const viewPlayers = async (team: any) => {
  const id = team.teamId ?? team.id;
  if (!id) {
    console.warn("Team id not found", team);
    return;
  }
  const path = `/tournaments/${tournamentId}/teams/${id}/players`;

  if (navigating.value) return;
  navigating.value = true;

  try {
    await router.push(path);
  } catch (err) {
    console.warn("router.push failed, fallback to full reload", err);
    window.location.href = path;
  } finally {
    setTimeout(() => (navigating.value = false), 300);
  }
};

const goBack = () => router.back();
</script>

<style scoped>
/* Hero uses site background (keep header background visible) */
.page-hero {
  height: 240px;
  background: transparent;
}

/* Content panel styling so background doesn't obscure the page content */
.page-content {
  background: rgba(255,255,255,0.98);
  border-radius: 12px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(7, 8, 26, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.04);
}

/* line clamp helper */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>