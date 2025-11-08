<template>
  <main class="players-page min-h-screen w-full overflow-x-hidden">
    <!-- Reduced-height hero background so top gap is smaller -->
    <section class="page-hero" />

    <!-- Content panel overlapping the hero (white panel so text/buttons are clearly readable) -->
    <section class="page-content mx-auto">
      <div class="header flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <button @click="goBack" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-gray-50 bg-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </button>

          <h1 class="title text-2xl lg:text-3xl font-semibold text-gray-900 mt-3">Danh sách thành viên</h1>
          <p class="text-sm text-gray-600 mt-1">
            Giải: <span class="font-medium">{{ tournamentId }}</span> — Đội: <span class="font-medium">{{ teamId }}</span>
          </p>
        </div>

        <div class="controls flex items-center gap-3">
          <input
            v-model="q"
            @input="onFilter"
            type="search"
            placeholder="Tìm thành viên theo tên / CCCD / số áo..."
            class="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />
          <select v-model="statusFilter" class="px-3 py-2 border rounded-md text-sm bg-white">
            <option value="">Tất cả trạng thái</option>
            <option value="raSan">Được ra sân</option>
            <option value="tuDo">Thành viên tự do</option>
            <option value="khongDK">Không đăng ký</option>
          </select>
          <button @click="refresh" class="px-3 py-2 bg-white border rounded-md text-sm hover:bg-gray-50">Làm mới</button>
        </div>
      </div>

      <!-- Banner: show when tournament members endpoint returns 500 -> interpret as "no members registered" -->
      <div v-if="noMembersInTournament" class="banner mb-6 p-4 rounded border-l-4 border-red-400 bg-red-50 text-red-800 flex items-center justify-between gap-4">
        <div>
          <div class="font-semibold">Đội chưa có thành viên được đăng ký ra sân trong giải</div>
          <div class="text-sm mt-1">Nếu không thêm thành viên vào danh sách thi đấu, đội có thể bị loại khỏi giải đấu.</div>
        </div>
        <div class="flex items-center gap-3">
          <button @click="onAddAllConfirm" :disabled="addingAll" class="px-4 py-2 bg-orange-500 text-white rounded-md">
            <span v-if="addingAll">Đang thêm...</span>
            <span v-else>Thêm tất cả thành viên đội vào giải</span>
          </button>
          <button @click="refresh" class="px-3 py-2 border rounded-md bg-white">Làm mới</button>
        </div>
      </div>

      <div v-if="error && !noMembersInTournament" class="mb-4 p-3 bg-red-50 text-red-700 rounded">
        Lỗi khi lấy dữ liệu: {{ error }}
      </div>

      <div v-if="loading" class="loading py-12 text-center">
        <div class="spinner inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div class="text-gray-600">Đang tải danh sách thành viên...</div>
      </div>

      <!-- Debug snippet to assist troubleshooting when combined list is empty -->
      <div v-if="!loading && membersCombined.length === 0 && responseRaw" class="mb-6 p-3 bg-yellow-50 text-yellow-800 rounded">
        <div class="font-medium mb-2">Debug: response từ API (first 1k chars)</div>
        <pre class="max-h-40 overflow-auto text-xs">{{ debugSnippet }}</pre>
      </div>

      <div v-else>
        <div v-if="membersFiltered.length === 0" class="text-center py-12 text-gray-500">
          Không tìm thấy thành viên.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="p in membersFiltered"
            :key="idKey(p)"
            class="card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="p-4 flex gap-4 items-center">
              <div class="avatar w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <svg v-if="!hasAvatar(p)" class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.72 0 5.24.75 7.379 2.034M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <img v-else :src="p.avatar" @error="$event.target.style.display = 'none'" :alt="p.name" class="w-full h-full object-cover"/>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="font-semibold text-lg text-gray-800 truncate">{{ p.name }}</h3>
                    <p class="text-sm text-gray-500 mt-1 truncate">{{ p.cccd || 'CCCD chưa có' }}</p>
                  </div>

                  <div class="text-right">
                    <div class="text-sm text-gray-500">#{{ p.shirt_number ?? p.shirtNumber ?? '-' }}</div>
                    <div class="text-xs text-gray-400 mt-1">{{ p.phoneNumber || '—' }}</div>
                  </div>
                </div>

                <div class="mt-3 flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 bg-gray-100 rounded text-gray-600">ID: {{ p.id ?? p.playerId ?? '-' }}</span>
                  <span v-if="p.status === 'raSan'" class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Được ra sân</span>
                  <span v-else-if="p.status === 'tuDo'" class="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Thành viên tự do</span>
                  <span v-else class="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">Không đăng ký</span>
                </div>
              </div>
            </div>

            <div class="p-3 border-t bg-gray-50 flex items-center justify-between">
              <div class="text-xs text-gray-500">Nguồn: <span class="font-medium">{{ p.source }}</span></div>
              <div class="flex items-center gap-2">
                <button @click="openPlayer(p)" class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Xem</button>

                <button
                  v-if="p.status !== 'raSan'"
                  :disabled="addingIds.has(idKey(p))"
                  @click="addMember(p)"
                  class="px-3 py-1 text-sm border rounded-md"
                  :class="addingIds.has(idKey(p)) ? 'bg-gray-200 text-gray-600' : 'bg-white hover:bg-gray-50'"
                >
                  <span v-if="addingIds.has(idKey(p))">Đang thêm...</span>
                  <span v-else>Thêm vào giải</span>
                </button>

                <button
                  v-if="p.status === 'raSan'"
                  :disabled="removingIds.has(idKey(p))"
                  @click="removeMember(p)"
                  class="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50"
                >
                  <span v-if="removingIds.has(idKey(p))">Đang xóa...</span>
                  <span v-else>Xóa khỏi danh sách</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/**
 * Full players page with:
 * - fetch /players/by-team/{teamId}
 * - fetch /tournaments/{tournamentId}/teams/{teamId}/members (special-case 500 => "no members registered")
 * - merge both sources and mark status: raSan / tuDo / khongDK
 * - add single member (POST)
 * - remove member (DELETE)
 * - add all members (bulk)
 * - search + filter by status
 * - debug snippet when responses are unexpected
 *
 * Paste this file to: pages/tournaments/[id]/teams/[teamId]/players.vue
 */

import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();

// Optional toast if project provides one
let toast: any = null;
try { toast = useToast(); } catch { /* ignore if not present */ }

const tournamentId = Number(route.params.id || 0);
const teamId = Number(route.params.teamId || 0);

const teamPlayers = ref<any[]>([]);
const tournamentMembers = ref<any[]>([]);
const membersCombined = ref<any[]>([]);
const responseRaw = ref<any>(null);

const loading = ref(false);
const error = ref<string | null>(null);
const noMembersInTournament = ref(false);

const q = ref('');
const statusFilter = ref('');

const addingIds = ref(new Set<string|number>());
const removingIds = ref(new Set<string|number>());
const addingAll = ref(false);

const idKey = (p: any) => p?.id ?? p?.playerId ?? p?.cccd ?? p?._uid ?? JSON.stringify(p);

function extractArray(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.result)) return payload.result;
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  if (payload.data && Array.isArray(payload.data.result)) return payload.data.result;
  // find first array prop
  for (const k of Object.keys(payload)) {
    if (Array.isArray(payload[k])) return payload[k];
  }
  return [];
}

async function fetchTeamPlayers(tid: number | string) {
  const res = await $api.get(`/players/by-team/${tid}`);
  responseRaw.value = responseRaw.value ?? {};
  responseRaw.value.teamPlayers = res;
  teamPlayers.value = extractArray(res);
}

async function fetchTournamentMembers(tourId: number | string, tid: number | string) {
  try {
    const res = await $api.get(`/tournaments/${tourId}/teams/${tid}/members`);
    responseRaw.value = responseRaw.value ?? {};
    responseRaw.value.tournamentMembers = res;
    tournamentMembers.value = extractArray(res);
    noMembersInTournament.value = false;
  } catch (e: any) {
    const status = e?.response?.status ?? e?.status ?? (typeof e === 'string' && e.includes('500') ? 500 : undefined);
    responseRaw.value = responseRaw.value ?? {};
    responseRaw.value.tournamentMembersError = e?.response?.data ?? e?.message ?? String(e);
    if (status === 500) {
      // interpret 500 as "no members registered" (per backend behavior you described)
      tournamentMembers.value = [];
      noMembersInTournament.value = true;
    } else {
      noMembersInTournament.value = false;
      error.value = e?.message || String(e);
      tournamentMembers.value = [];
      throw e;
    }
  }
}

function buildCombined() {
  const mapTeam = new Map<string, any>();
  teamPlayers.value.forEach((p) => {
    const k = p?.id != null ? String(p.id) : p?.playerId != null ? String(p.playerId) : null;
    if (k) mapTeam.set(k, p);
    if (p?.cccd) mapTeam.set(`cccd:${String(p.cccd)}`, p);
  });

  const resultMap = new Map<string, any>();

  tournamentMembers.value.forEach((m) => {
    const idKeyM = m?.id != null ? String(m.id) : m?.playerId != null ? String(m.playerId) : null;
    const cKey = m?.cccd ? `cccd:${String(m.cccd)}` : null;
    const teamEntry = (idKeyM && mapTeam.get(idKeyM)) || (cKey && mapTeam.get(cKey));
    const merged = {
      ...teamEntry,
      ...m,
      id: m.id ?? m.playerId ?? (teamEntry && (teamEntry.id ?? teamEntry.playerId)),
      name: m.name ?? (teamEntry && teamEntry.name),
      cccd: m.cccd ?? (teamEntry && teamEntry.cccd),
      phoneNumber: m.phoneNumber ?? (teamEntry && teamEntry.phoneNumber),
      shirt_number: m.shirt_number ?? m.shirtNumber ?? (teamEntry && (teamEntry.shirt_number ?? teamEntry.shirtNumber)),
      status: teamEntry ? 'raSan' : 'tuDo',
      source: teamEntry ? 'Team & Tournament' : 'Tournament only',
      _uid: `t_${Math.random().toString(36).slice(2,9)}`,
    };
    resultMap.set(String(merged.id ?? merged.cccd ?? merged._uid), merged);
  });

  teamPlayers.value.forEach((p) => {
    const keyById = p?.id != null ? String(p.id) : p?.playerId != null ? String(p.playerId) : null;
    const keyByCccd = p?.cccd ? `cccd:${String(p.cccd)}` : null;
    if ((keyById && resultMap.has(keyById)) || (keyByCccd && resultMap.has(keyByCccd))) return;
    const merged = {
      ...p,
      id: p.id ?? p.playerId,
      name: p.name,
      cccd: p.cccd,
      phoneNumber: p.phoneNumber,
      shirt_number: p.shirt_number ?? p.shirtNumber,
      status: 'khongDK',
      source: 'Team roster only',
      _uid: `r_${Math.random().toString(36).slice(2,9)}`,
    };
    resultMap.set(String(merged.id ?? merged.cccd ?? merged._uid), merged);
  });

  const arr = Array.from(resultMap.values());
  arr.sort((a,b) => (Number(a.shirt_number ?? a.shirtNumber ?? 999) - Number(b.shirt_number ?? b.shirtNumber ?? 999)));
  membersCombined.value = arr;
}

async function fetchAll() {
  error.value = null;
  loading.value = true;
  noMembersInTournament.value = false;
  responseRaw.value = null;
  try {
    await Promise.all([fetchTeamPlayers(teamId), fetchTournamentMembers(tournamentId, teamId)]);
    buildCombined();
  } catch (e: any) {
    if (!noMembersInTournament.value) {
      error.value = e?.message || String(e);
    }
    // still try to show roster if present
    buildCombined();
  } finally {
    loading.value = false;
  }
}

onMounted(() => { if (teamId) fetchAll(); });

watch(() => [route.params.id, route.params.teamId], ([newTour, newTeam]) => {
  const ttt = Number(newTeam);
  if (ttt) fetchAll();
});

const onFilter = () => { /* reactive computed will apply filters */ };

const membersFiltered = computed(() => {
  const term = q.value.trim().toLowerCase();
  return membersCombined.value.filter((p) => {
    if (statusFilter.value && p.status !== statusFilter.value) return false;
    if (!term) return true;
    const name = (p.name || '').toString().toLowerCase();
    const cccd = (p.cccd || '').toString().toLowerCase();
    const shirt = String(p.shirt_number ?? p.shirtNumber ?? '');
    return name.includes(term) || cccd.includes(term) || shirt.includes(term);
  });
});

const debugSnippet = computed(() => {
  try {
    const s = typeof responseRaw.value === 'string' ? responseRaw.value : JSON.stringify(responseRaw.value);
    return s.slice(0, 1000);
  } catch {
    return String(responseRaw.value).slice(0, 1000);
  }
});

const hasAvatar = (p: any) => !!(p?.avatar && typeof p.avatar === 'string' && p.avatar.startsWith('http'));
const openPlayer = (p: any) => console.log('Open player', p);
const goBack = () => router.back();
const refresh = () => fetchAll();

async function addMember(player: any) {
  const key = idKey(player);
  if (!key) return;
  if (addingIds.value.has(key)) return;
  addingIds.value.add(key);
  const payload = {
    id: player.id ?? player.playerId,
    name: player.name,
    cccd: player.cccd,
    phoneNumber: player.phoneNumber,
    shirt_number: player.shirt_number ?? player.shirtNumber,
  };
  try {
    await $api.post(`/tournaments/${tournamentId}/teams/${teamId}/members`, payload);
    // refresh to reflect canonical server state
    await fetchAll();
    toast?.success?.({ message: 'Thêm thành viên vào đội trong giải đấu thành công', position: 'topRight' });
  } catch (e: any) {
    console.error('addMember error', e);
    toast?.error?.({ message: e?.message || 'Thêm thành viên thất bại', position: 'topRight' });
  } finally {
    addingIds.value.delete(key);
  }
}

async function removeMember(player: any) {
  const playerId = player.id ?? player.playerId;
  if (!playerId) return;
  if (!confirm(`Xác nhận xóa ${player.name} khỏi danh sách ra sân của giải?`)) return;
  const key = idKey(player);
  if (removingIds.value.has(key)) return;
  removingIds.value.add(key);
  try {
    await $api.delete(`/tournaments/${tournamentId}/teams/${teamId}/members/${playerId}`);
    await fetchAll();
    toast?.success?.({ message: 'Xóa thành viên khỏi đội trong giải đấu thành công', position: 'topRight' });
  } catch (e: any) {
    console.error('removeMember error', e);
    toast?.error?.({ message: e?.message || 'Xóa thành viên thất bại', position: 'topRight' });
  } finally {
    removingIds.value.delete(key);
  }
}

async function addAllTeamMembers() {
  if (!teamPlayers.value?.length) {
    toast?.error?.({ message: 'Không có thành viên trong đội để thêm', position: 'topRight' });
    return;
  }
  if (!confirm('Bạn có chắc muốn thêm tất cả thành viên trong đội vào danh sách thi đấu của giải này không?')) return;
  addingAll.value = true;
  const added: string[] = [];
  const failed: string[] = [];
  for (const p of teamPlayers.value) {
    const key = p.id ?? p.playerId ?? p.cccd;
    if (!key) continue;
    addingIds.value.add(key);
    const payload = { id: p.id ?? p.playerId, name: p.name, cccd: p.cccd, phoneNumber: p.phoneNumber, shirt_number: p.shirt_number ?? p.shirtNumber };
    try {
      await $api.post(`/tournaments/${tournamentId}/teams/${teamId}/members`, payload);
      added.push(String(key));
    } catch (e) {
      failed.push(String(key));
    } finally {
      addingIds.value.delete(key);
    }
  }
  addingAll.value = false;
  if (added.length) toast?.success?.({ message: `Đã thêm ${added.length} thành viên vào giải.`, position: 'topRight' });
  if (failed.length) toast?.error?.({ message: `Thêm thất bại cho ${failed.length} thành viên.`, position: 'topRight' });
  noMembersInTournament.value = false;
  await fetchAll();
}
function onAddAllConfirm() { addAllTeamMembers(); }
</script>

<style scoped>
/* HERO background: full area gradient (no blank spaces) */
.page-hero{
  width:100%;
  min-height:160px; /* reduced height to remove large top gap */
  background: linear-gradient(135deg,#08103a 0%, #0f2a67 45%, #3b1e6f 100%);
  background-size:cover;
  background-position:center;
  position:relative;
  z-index:10;
  /* subtle overlay to increase contrast */
  box-shadow: inset 0 40px 80px rgba(3,7,18,0.25);
}

/* Content panel overlaps hero and gives a readable white canvas for controls and cards */
.page-content{
  max-width:1200px;
  margin: -80px auto 60px; /* smaller negative margin to pull panel up but reduce top gap */
  background: rgba(255,255,255,0.98);
  border-radius:12px;
  padding:24px;
  box-shadow: 0 18px 40px rgba(7,8,26,0.18);
  border: 1px solid rgba(15,23,42,0.06);
  position:relative;
  z-index:40;
}

/* Cards */
.card{
  transition: box-shadow .18s ease, transform .18s ease;
}
.card:hover{
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(7,8,26,0.12);
}

/* Avatar round */
.avatar img{ border-radius:9999px; }

/* Banner align */
.banner{ align-items:center; }

/* page sizing */
.players-page{ width:100vw; overflow-x:hidden; }

/* helper clamp (if needed elsewhere) */
.line-clamp-3{ display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; word-break:break-word; }
</style>