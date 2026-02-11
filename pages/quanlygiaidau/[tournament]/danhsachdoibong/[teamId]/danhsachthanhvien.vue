<template>
  <main class="players-page min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
    <!-- Hero Header -->
    <section class="page-hero">
      <div class="hero-content">
        <div class="container mx-auto px-4">
          <button @click="goBack" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all mb-4 border border-white/20">
            <Icon name="mdi:arrow-left" class="text-[20px]" />
            <span class="font-medium">Quay lại</span>
          </button>
          
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">
            Danh sách thành viên
          </h1>
          <p class="text-white/90 text-lg">
            <span class="font-semibold">Giải đấu:</span> {{ tournamentId }} • <span class="font-semibold">Đội:</span> {{ teamId }}
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="page-content container mx-auto px-4">
      <!-- Controls Bar -->
      <div class="controls-bar bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="flex-1 w-full md:w-auto">
            <div class="relative">
              <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
              <input
                v-model="q"
                @input="onFilter"
                type="search"
                placeholder="Tìm thành viên theo tên, CCCD, số áo..."
                class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto">
            <select v-model="statusFilter" class="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all">
              <option value="">Tất cả trạng thái</option>
              <option value="raSan">Được ra sân</option>
              <option value="tuDo">Thành viên tự do</option>
              <option value="khongDK">Không đăng ký</option>
            </select>

            <button @click="refresh" class="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm hover:bg-gray-50 font-medium transition-all">
              <Icon name="mdi:refresh" class="text-[18px]" />
            </button>

            <button
              @click="openManualModal"
              title="Thêm thành viên thủ công"
              class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:scale-110 transition-all shadow-md"
            >
              <Icon name="mdi:plus" class="text-[24px]" />
            </button>
          </div>
        </div>
      </div>

      <!-- Warning Banner -->
      <div v-if="noMembersInTournament" class="warning-banner mb-6 p-5 rounded-xl border-l-4 border-orange-500 bg-orange-50 shadow-md">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Icon name="mdi:alert" class="text-white text-[24px]" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-orange-900 text-lg mb-1">Đội chưa có thành viên được đăng ký ra sân</h3>
            <p class="text-orange-800 mb-4">Nếu không thêm thành viên vào danh sách thi đấu, đội có thể bị loại khỏi giải đấu.</p>
            <div class="flex items-center gap-3">
              <button @click="onAddAllConfirm" :disabled="addingAll" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold transition-all shadow-md disabled:opacity-50">
                <span v-if="addingAll">
                  <Icon name="mdi:loading" class="animate-spin inline" /> Đang thêm...
                </span>
                <span v-else>Thêm tất cả thành viên vào giải</span>
              </button>
              <button @click="refresh" class="px-4 py-2.5 border-2 border-orange-300 rounded-lg bg-white hover:bg-orange-50 font-semibold text-orange-700 transition-all">
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error && !noMembersInTournament" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md flex items-center gap-3">
        <Icon name="mdi:alert-circle" class="text-[24px] flex-shrink-0" />
        <div>
          <p class="font-semibold">Lỗi khi lấy dữ liệu</p>
          <p class="text-sm">{{ error }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading py-20 text-center">
        <div class="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600 font-medium">Đang tải danh sách thành viên...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && membersFiltered.length === 0" class="empty-state py-20 text-center">
        <Icon name="mdi:account-search" class="text-gray-300 mx-auto mb-4" width="80" height="80" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy thành viên</h3>
        <p class="text-gray-500">Hãy thử điều chỉnh bộ lọc hoặc thêm thành viên mới</p>
      </div>

      <!-- Members Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="p in membersFiltered"
          :key="idKey(p)"
          class="member-card bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <!-- Card Header -->
          <div class="p-5 bg-gradient-to-r from-orange-50 to-pink-50">
            <div class="flex gap-4 items-center">
              <div class="avatar-wrapper flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md border-2 border-white">
                  <Icon v-if="!hasAvatar(p)" name="mdi:account" class="text-gray-400 text-[32px]" />
                  <img v-else :src="p.avatar" @error="$event.target.style.display = 'none'" :alt="p.name" class="w-full h-full object-cover"/>
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-lg text-gray-900 truncate mb-1">{{ p.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="mdi:card-account-details" class="text-[16px]" />
                  <span class="truncate">{{ p.cccd || 'Chưa có CCCD' }}</span>
                </div>
              </div>

              <div class="text-right flex-shrink-0">
                <div class="text-2xl font-bold text-orange-600">#{{ p.shirt_number ?? p.shirtNumber ?? '-' }}</div>
              </div>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-5">
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="mdi:phone" class="text-[16px]" />
                <span>{{ p.phoneNumber || 'Chưa có SĐT' }}</span>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  ID: {{ p.id ?? p.playerId ?? '-' }}
                </span>
                <span v-if="p.status === 'raSan'" class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 flex items-center gap-1">
                  <Icon name="mdi:check-circle" class="text-[14px]" />
                  Được ra sân
                </span>
                <span v-else-if="p.status === 'tuDo'" class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1">
                  <Icon name="mdi:account-clock" class="text-[14px]" />
                  Tự do
                </span>
                <span v-else class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                  <Icon name="mdi:close-circle" class="text-[14px]" />
                  Chưa đăng ký
                </span>
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-4 bg-gray-50 border-t flex items-center justify-end gap-2">
            <button @click="openPlayer(p)" class="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all font-medium">
              <Icon name="mdi:eye" class="inline text-[16px]" /> Xem
            </button>

            <button
              v-if="p.status !== 'raSan'"
              :disabled="addingIds.has(idKey(p))"
              @click="addMember(p)"
              class="px-4 py-2 text-sm border-2 rounded-lg font-medium transition-all"
              :class="addingIds.has(idKey(p)) ? 'bg-gray-200 text-gray-600 border-gray-300' : 'bg-white hover:bg-orange-50 border-orange-500 text-orange-600'"
            >
              <Icon v-if="addingIds.has(idKey(p))" name="mdi:loading" class="animate-spin inline" />
              <Icon v-else name="mdi:plus-circle" class="inline" />
              {{ addingIds.has(idKey(p)) ? 'Đang thêm...' : 'Thêm vào giải' }}
            </button>

            <button
              v-if="p.status === 'raSan'"
              :disabled="removingIds.has(idKey(p))"
              @click="removeMember(p)"
              class="px-4 py-2 text-sm border-2 border-red-500 rounded-lg bg-white hover:bg-red-50 text-red-600 font-medium transition-all"
            >
              <Icon v-if="removingIds.has(idKey(p))" name="mdi:loading" class="animate-spin inline" />
              <Icon v-else name="mdi:delete" class="inline" />
              {{ removingIds.has(idKey(p)) ? 'Đang xóa...' : 'Xóa' }}
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- Manual Add Modal -->
    <div v-if="manualModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        <!-- Modal Header -->
        <div class="p-6 border-b bg-gradient-to-r from-orange-500 to-pink-500 rounded-t-2xl">
          <h3 class="font-bold text-xl text-white flex items-center gap-2">
            <Icon name="mdi:account-plus" class="text-[24px]" />
            Thêm thành viên thủ công
          </h3>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:account" class="inline text-[16px]" /> Tên <span class="text-red-500">*</span>
            </label>
            <input v-model="manualForm.name" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Nguyễn Văn A" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:card-account-details" class="inline text-[16px]" /> CCCD <span class="text-red-500">*</span>
            </label>
            <input v-model="manualForm.cccd" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="001234567890" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:phone" class="inline text-[16px]" /> Số điện thoại
            </label>
            <input v-model="manualForm.phoneNumber" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="0912345678" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              <Icon name="mdi:tshirt-crew" class="inline text-[16px]" /> Số áo
            </label>
            <input v-model.number="manualForm.shirt_number" type="number" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="10" />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 bg-gray-50 border-t rounded-b-2xl flex justify-end gap-3">
          <button @click="closeManualModal" class="px-5 py-2.5 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Hủy
          </button>
          <button @click="addManualMember" :disabled="manualAdding" class="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50">
            <Icon v-if="manualAdding" name="mdi:loading" class="animate-spin inline" />
            {{ manualAdding ? 'Đang thêm...' : 'Thêm thành viên' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();

let toast: any = null;
try { toast = useToast(); } catch { /* ignore */ }

const tournamentId = Number(route.params.tournament || 0);
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

const manualModalOpen = ref(false);
const manualAdding = ref(false);
const manualForm = ref({
  name: '',
  cccd: '',
  phoneNumber: '',
  shirt_number: null as number | null,
});

const idKey = (p: any) => p?.id ?? p?.playerId ?? p?.cccd ?? `${(p?.name||'')}-${(p?.shirt_number ?? p?.shirtNumber ?? '')}`;

function extractArray(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.result)) return payload.result;
  if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
  if (payload.data && Array.isArray(payload.data.result)) return payload.data.result;
  for (const k of Object.keys(payload || {})) {
    if (Array.isArray(payload[k])) return payload[k];
  }
  return [];
}

async function fetchTeamPlayers(tid: number | string) {
  try {
    const res = await $api.get(`/api/players/by-team/${tid}`);
    responseRaw.value = responseRaw.value ?? {};
    responseRaw.value.teamPlayers = res;
    teamPlayers.value = extractArray(res);
  } catch (e) {
    teamPlayers.value = [];
  }
}

async function fetchTournamentMembers(tourId: number | string, tid: number | string) {
  try {
    const res = await $api.get(`/api/tournaments/${tourId}/teams/${tid}/members`);
    responseRaw.value = responseRaw.value ?? {};
    responseRaw.value.tournamentMembers = res;
    tournamentMembers.value = extractArray(res);
    noMembersInTournament.value = false;
  } catch (e: any) {
    const status = e?.response?.status ?? e?.status ?? (typeof e === 'string' && e.includes('500') ? 500 : undefined);
    responseRaw.value = responseRaw.value ?? {};
    responseRaw.value.tournamentMembersError = e?.response?.data ?? e?.message ?? String(e);
    if (status === 500) {
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
  const map = new Map<string, any>();

  const keyFor = (p: any) => {
    if (p == null) return null;
    if (p.id != null) return `id:${p.id}`;
    if (p.playerId != null) return `id:${p.playerId}`;
    if (p.cccd) return `cccd:${p.cccd}`;
    const name = (p.name || '').toString().trim().toLowerCase();
    const shirt = String(p.shirt_number ?? p.shirtNumber ?? '');
    return `ns:${name}|${shirt}`;
  };

  (tournamentMembers.value || []).forEach((m: any) => {
    const k = keyFor(m) || `tmp:${Math.random().toString(36).slice(2,9)}`;
    const entry = {
      ...m,
      id: m.id ?? m.playerId,
      name: m.name,
      cccd: m.cccd,
      phoneNumber: m.phoneNumber,
      shirt_number: m.shirt_number ?? m.shirtNumber,
      status: 'tuDo',
      source: 'Tournament only',
    };
    map.set(k, entry);
  });

  (teamPlayers.value || []).forEach((p: any) => {
    const k = keyFor(p) || `tmp:${Math.random().toString(36).slice(2,9)}`;
    const existing = map.get(k);
    if (existing) {
      map.set(k, {
        ...existing,
        ...p,
        id: existing.id ?? p.id ?? p.playerId,
        name: existing.name ?? p.name,
        cccd: existing.cccd ?? p.cccd,
        phoneNumber: existing.phoneNumber ?? p.phoneNumber,
        shirt_number: existing.shirt_number ?? p.shirt_number ?? p.shirtNumber,
        status: 'raSan',
        source: 'Team & Tournament',
      });
    } else {
      let foundKey: string | undefined;
      for (const [mk, mv] of map.entries()) {
        if (mv && ( (mv.id && (p.id && String(mv.id)===String(p.id))) || (mv.cccd && p.cccd && String(mv.cccd)===String(p.cccd)) )) {
          foundKey = mk;
          break;
        }
      }
      if (foundKey) {
        const existing2 = map.get(foundKey);
        map.set(foundKey, {
          ...existing2,
          ...p,
          id: existing2.id ?? p.id ?? p.playerId,
          name: existing2.name ?? p.name,
          cccd: existing2.cccd ?? p.cccd,
          phoneNumber: existing2.phoneNumber ?? p.phoneNumber,
          shirt_number: existing2.shirt_number ?? p.shirt_number ?? p.shirtNumber,
          status: 'raSan',
          source: 'Team & Tournament',
        });
      } else {
        map.set(k, {
          ...p,
          id: p.id ?? p.playerId,
          name: p.name,
          cccd: p.cccd,
          phoneNumber: p.phoneNumber,
          shirt_number: p.shirt_number ?? p.shirtNumber,
          status: 'khongDK',
          source: 'Team roster only',
        });
      }
    }
  });

  const arr = Array.from(map.values());
  arr.sort((a: any, b: any) => {
    const na = Number(a.shirt_number ?? a.shirtNumber ?? 999);
    const nb = Number(b.shirt_number ?? b.shirtNumber ?? 999);
    return na - nb;
  });

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
    buildCombined();
  } finally {
    loading.value = false;
  }
}

onMounted(() => { if (teamId) fetchAll(); });

watch(() => [route.params.tournament, route.params.teamId], ([newTour, newTeam]) => {
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

const hasAvatar = (p: any) => !!(p?.avatar && typeof p.avatar === 'string' && p.avatar.startsWith('http'));
const openPlayer = (p: any) => console.log('Open player', p);
const goBack = () => router.back();
const refresh = () => fetchAll();

async function addMember(player: any) {
  const key = idKey(player);
  if (!key) return;
  if (addingIds.value.has(key)) return;
  addingIds.value.add(key);

  const payload: any = {
    name: player.name,
    cccd: player.cccd,
    phoneNumber: player.phoneNumber ?? player.phone,
    shirt_number: player.shirt_number ?? player.shirtNumber,
  };

  try {
    await $api.post(`/api/tournaments/${tournamentId}/teams/${teamId}/members`, payload);
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
    await $api.delete(`/api/tournaments/${tournamentId}/teams/${teamId}/members/${playerId}`);
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
    const key = p.id ?? p.playerId ?? p.cccd ?? `${(p.name||'')}-${(p.shirt_number ?? p.shirtNumber ?? '')}`;
    if (!key) continue;
    addingIds.value.add(key);
    const payload = {
      name: p.name,
      cccd: p.cccd,
      phoneNumber: p.phoneNumber,
      shirt_number: p.shirt_number ?? p.shirtNumber,
    };
    try {
      await $api.post(`/api/tournaments/${tournamentId}/teams/${teamId}/members`, payload);
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

function openManualModal() {
  manualForm.value = { name: '', cccd: '', phoneNumber: '', shirt_number: null };
  manualModalOpen.value = true;
}
function closeManualModal() {
  manualModalOpen.value = false;
}
async function addManualMember() {
  if (!manualForm.value.name || !manualForm.value.cccd) {
    toast?.error?.({ message: 'Vui lòng nhập tên và CCCD', position: 'topRight' });
    return;
  }
  manualAdding.value = true;
  const payload = {
    name: manualForm.value.name,
    cccd: manualForm.value.cccd,
    phoneNumber: manualForm.value.phoneNumber || '',
    shirt_number: manualForm.value.shirt_number ?? undefined,
  };
  try {
    await $api.post(`/api/tournaments/${tournamentId}/teams/${teamId}/members`, payload);
    toast?.success?.({ message: 'Thêm thành viên vào đội trong giải đấu thành công', position: 'topRight' });
    manualModalOpen.value = false;
    await fetchAll();
  } catch (e: any) {
    console.error('addManualMember error', e);
    toast?.error?.({ message: e?.message || 'Thêm thành viên thất bại', position: 'topRight' });
  } finally {
    manualAdding.value = false;
  }
}
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #e2705a 0%, #b953b0 50%, #6366f1 100%);
  padding: 4rem 0 6rem;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  z-index: 10;
}

.page-content {
  margin-top: -3rem;
  position: relative;
  z-index: 20;
  padding-bottom: 4rem;
}

.member-card {
  position: relative;
  overflow: hidden;
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f97316 0%, #ec4899 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.member-card:hover::before {
  transform: scaleX(1);
}
</style>