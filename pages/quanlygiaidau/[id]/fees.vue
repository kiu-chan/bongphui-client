<template>
  <main>
    <div>
      <SliderBanner />

      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto py-10 px-4 lg:px-8">

            <!-- header with extra top spacing -->
            <div class="mb-6 mt-8 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 fee-header">
              <div>
                <h1 class="text-3xl md:text-4xl font-semibold">Thu / Chi — Giải đấu #{{ tournamentId }}</h1>
                <p class="text-sm text-gray-300 mt-1">Danh sách khoản thu/chí liên quan đến giải đấu</p>
              </div>

              <div class="flex items-center gap-3">
                <NuxtLink
                  to="/quanlygiaidau"
                  class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
                  title="Quay lại trang quản lý giải đấu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Quay lại
                </NuxtLink>

                <button
                  @click="fetchFees"
                  :disabled="loading"
                  class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4v5h.582A5 5 0 1110 15v-1a4 4 0 10-3.464-6H4z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Làm mới
                </button>

                <!-- add fee button toggles form -->
                <button
                  @click="showForm = !showForm"
                  :class="['inline-flex items-center gap-2 px-4 py-2 rounded-lg transition', showForm ? 'bg-gray-100 text-gray-800' : 'bg-green-600 text-white hover:bg-green-700']"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                  </svg>
                  {{ showForm ? 'Đóng' : 'Thêm khoản' }}
                </button>
              </div>
            </div>

            <!-- Add fee form (shows when showForm true) -->
            <div v-if="showForm" class="bg-white p-4 rounded-lg shadow mb-6 border">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div class="md:col-span-1">
                  <label class="text-sm text-gray-600">Loại</label>
                  <select v-model="form.status" class="mt-1 w-full border rounded px-3 py-2">
                    <option :value="1">Thu (teamId có giá trị)</option>
                    <option :value="2">Chi (teamId để trống)</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm text-gray-600">Số tiền</label>
                  <input type="number" v-model.number="form.totalFee" class="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label class="text-sm text-gray-600">Đội (teamId)</label>
                  <input type="number" v-model="form.teamId" placeholder="Để trống nếu là Chi" class="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label class="text-sm text-gray-600">Ghi chú</label>
                  <input type="text" v-model="form.description" class="mt-1 w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div class="mt-4 flex items-center gap-3">
                <button @click="submitCreate" :disabled="creating" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60">
                  <span v-if="!creating">Lưu</span>
                  <span v-else>Đang lưu...</span>
                </button>
                <button @click="resetForm" class="px-4 py-2 border rounded">Hủy</button>
                <div v-if="formError" class="text-sm text-red-600 ml-4">{{ formError }}</div>
              </div>
            </div>

            <!-- Summary cards -->
            <section class="grid sm:grid-cols-3 gap-4 mb-8">
              <div class="bg-white rounded-xl shadow p-5 flex flex-col border">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-500">Tổng thu (Thu)</div>
                  <div class="text-xs text-gray-400">(+)</div>
                </div>
                <div class="mt-3 text-2xl font-semibold text-green-600">{{ formatCurrency(incomeSum) }}</div>
                <div class="text-sm text-gray-400 mt-2">Số khoản: {{ incomeCount }}</div>
              </div>

              <div class="bg-white rounded-xl shadow p-5 flex flex-col border">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-500">Tổng chi (Chi)</div>
                  <div class="text-xs text-gray-400">(-)</div>
                </div>
                <div class="mt-3 text-2xl font-semibold text-red-600">-{{ formatCurrency(expenseSum) }}</div>
                <div class="text-sm text-gray-400 mt-2">Số khoản: {{ expenseCount }}</div>
              </div>

              <div class="bg-white rounded-xl shadow p-5 flex flex-col border">
                <div class="flex items-center justify-between">
                  <div class="text-sm font-medium text-gray-500">Số dư</div>
                  <div class="text-xs text-gray-400">(theo server)</div>
                </div>
                <div :class="['mt-3 text-2xl font-semibold', displayedBalance >= 0 ? 'text-green-700' : 'text-red-700']">
                  {{ displayedBalance === null ? '-' : formatCurrency(displayedBalance) }}
                </div>
                <div class="text-sm text-gray-400 mt-2">Tổng khoản: {{ items.length }}</div>
              </div>
            </section>

            <!-- Main table / list -->
            <section class="bg-white rounded-xl shadow overflow-hidden border">
              <div class="p-4 border-b flex items-center justify-between">
                <div class="font-medium">Danh sách khoản thu/chi</div>
                <div class="text-sm text-gray-500">API: /api/fees/tournament/{{ tournamentId }}</div>
              </div>

              <div class="p-4">
                <!-- loading skeleton -->
                <div v-if="loading" class="space-y-3">
                  <div v-for="n in 5" :key="n" class="animate-pulse flex gap-4 items-center">
                    <div class="h-10 w-10 bg-gray-200 rounded"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <!-- error -->
                <div v-else-if="error" class="p-6 text-center text-red-700">
                  <div class="mb-3">{{ error }}</div>
                  <button @click="fetchFees" class="px-4 py-2 bg-blue-600 text-white rounded">Thử lại</button>
                </div>

                <!-- empty -->
                <div v-else-if="items.length === 0" class="p-8 text-center text-gray-500">
                  <svg class="mx-auto mb-4 h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v18H3V3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="text-lg font-medium">Chưa có khoản thu/chi</div>
                  <div class="mt-2">Vui lòng kiểm tra lại hoặc thêm khoản thu/chi trong hệ thống.</div>
                </div>

                <!-- table -->
                <div v-else class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-100">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đội</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                      <tr v-for="fee in items" :key="fee.feesId">
                        <td class="px-4 py-4 text-sm text-gray-700">{{ fee.feesId }}</td>
                        <td class="px-4 py-4 text-sm">
                          <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                            :class="feeBadgeClass(fee.status)"
                          >
                            <svg v-if="Number(fee.status) === 1" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
                            {{ typeLabel(fee) }}
                          </span>
                        </td>
                        <td class="px-4 py-4 text-sm text-right font-medium" :class="Number(fee.status) === 1 ? 'text-green-600' : 'text-red-600'">
                          <span v-if="Number(fee.status) === 1">{{ formatCurrency(fee.totalFee) }}</span>
                          <span v-else>-{{ formatCurrency(fee.totalFee) }}</span>
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-600">{{ formatDate(fee.createdDate) }}</td>
                        <td class="px-4 py-4 text-sm text-gray-700">{{ fee.teamId ?? '-' }}</td>
                        <td class="px-4 py-4 text-sm text-gray-700">{{ fee.description ?? '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <footer class="mt-6 text-right text-sm text-gray-300">
              Dữ liệu được lấy từ API khi trang tải hoặc nhấn "Làm mới".
            </footer>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import SliderBanner from "~/component/library/sliderBanner/index.vue";
import { useRoute } from "vue-router";
import { useTournamentStore } from "~/store/tournament";

export default defineComponent({
  components: { SliderBanner },
  setup() {
    const route = useRoute();
    const tournamentId = String(route.params.id ?? "");

    const TournamentStore = useTournamentStore();
    const items = ref<any[]>([]);
    const loading = ref(false);
    const error = ref("");

    // server-provided balance
    const serverBalance = ref<number | null>(null);
    const loadingBalance = ref(false);

    // form for creating fee
    const showForm = ref(false);
    const creating = ref(false);
    const formError = ref("");
    const form = ref({
      totalFee: 0,
      description: "",
      teamId: "" as string | number | null,
      status: 1, // 1 = thu, 2 = chi
    });

    const fetchFees = async () => {
      if (!tournamentId) {
        error.value = "Thiếu tournamentId trong route.";
        items.value = [];
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        const res: any = await TournamentStore.fnGetFeesTournament(tournamentId);

        let data: any[] = [];
        if (Array.isArray(res)) data = res;
        else if (res && Array.isArray(res.data)) data = res.data;
        else if (res && Array.isArray(res.data?.items)) data = res.data.items;
        else if (Array.isArray(res.items)) data = res.items;
        else data = [];

        items.value = Array.isArray(data)
          ? data.map((d: any) => ({
              feesId: d.feesId,
              totalFee: Number(d.totalFee ?? 0),
              createdDate: d.createdDate,
              description: d.description,
              tournamentId: d.tournamentId,
              teamId: d.teamId,
              status: d.status,
              statusDescription: d.statusDescription,
            }))
          : [];
      } catch (err: any) {
        console.error("Lỗi khi lấy fees:", err);
        error.value = "Lỗi khi tải dữ liệu thu/chi. Vui lòng thử lại.";
        items.value = [];
      } finally {
        loading.value = false;
      }
    };

    const fetchBalance = async () => {
      if (!tournamentId) {
        serverBalance.value = null;
        return;
      }
      loadingBalance.value = true;
      try {
        const res: any = await TournamentStore.fnGetFeesBalance(tournamentId);
        // API sample returns a number like: 800000
        // support variations: direct number, res.data (number), res.data.value, etc.
        let val: number | null = null;
        if (typeof res === "number") val = res;
        else if (res && typeof res.data === "number") val = res.data;
        else if (res && typeof res.data?.balance === "number") val = res.data.balance;
        else if (res && !isNaN(Number(res))) val = Number(res);
        else val = null;

        serverBalance.value = val;
      } catch (err) {
        console.error("Lỗi khi lấy balance:", err);
        serverBalance.value = null;
      } finally {
        loadingBalance.value = false;
      }
    };

    const submitCreate = async () => {
      formError.value = "";
      if (!tournamentId) {
        formError.value = "Thiếu tournamentId.";
        return;
      }
      if (!form.value.totalFee || Number(form.value.totalFee) <= 0) {
        formError.value = "Vui lòng nhập số tiền hợp lệ (> 0).";
        return;
      }
      creating.value = true;
      try {
        const payload: any = {
          feesId: 0,
          totalFee: Number(form.value.totalFee),
          createdDate: new Date().toISOString(),
          description: form.value.description || "",
          tournamentId: Number(tournamentId),
          // if teamId is empty string or null -> send null (chi), otherwise number (thu)
          teamId:
            form.value.teamId === "" || form.value.teamId === null
              ? null
              : Number(form.value.teamId),
          status: Number(form.value.status),
        };

        const res: any = await TournamentStore.fnCreateFee(payload);

        // On success: either push returned item or refetch list & balance
        // try to read returned object
        let created: any = null;
        if (res && res.data && typeof res.data === "object") created = res.data;
        else if (res && typeof res === "object" && res.feesId != null) created = res;
        else created = null;

        // prefer to refetch entire list to keep consistent paging/sorting
        await fetchFees();
        await fetchBalance();

        // reset form if succeeded
        form.value.totalFee = 0;
        form.value.description = "";
        form.value.teamId = "";
        form.value.status = 1;
        showForm.value = false;
      } catch (err: any) {
        console.error("Lỗi tạo khoản thu/chi:", err);
        formError.value = err?.message ?? "Lỗi khi tạo khoản thu/chi.";
      } finally {
        creating.value = false;
      }
    };

    const resetForm = () => {
      formError.value = "";
      form.value.totalFee = 0;
      form.value.description = "";
      form.value.teamId = "";
      form.value.status = 1;
      showForm.value = false;
    };

    onMounted(() => {
      fetchFees();
      fetchBalance();
    });

    // Aggregations: status 1 => Thu (income), status 2 => Chi (expense)
    const incomeSum = computed(() => items.value.reduce((s, f) => s + (Number(f.status) === 1 ? Number(f.totalFee || 0) : 0), 0));
    const expenseSum = computed(() => items.value.reduce((s, f) => s + (Number(f.status) === 2 ? Number(f.totalFee || 0) : 0), 0));
    const incomeCount = computed(() => items.value.filter((f) => Number(f.status) === 1).length);
    const expenseCount = computed(() => items.value.filter((f) => Number(f.status) === 2).length);

    // displayedBalance uses server balance if available, otherwise falls back to client compute
    const clientBalance = computed(() => incomeSum.value - expenseSum.value);
    const displayedBalance = computed(() => {
      return serverBalance.value !== null ? serverBalance.value : clientBalance.value;
    });

    const formatCurrency = (v: number | null) => {
      if (v == null || Number.isNaN(Number(v))) return "-";
      try {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(v));
      } catch {
        return String(v);
      }
    };

    const formatDate = (d: string) => {
      if (!d) return "-";
      try {
        const dt = new Date(d);
        return dt.toLocaleString("vi-VN");
      } catch {
        return d;
      }
    };

    const feeBadgeClass = (status: number | string) => {
      if (Number(status) === 1) return "bg-green-100 text-green-800";
      if (Number(status) === 2) return "bg-red-100 text-red-800";
      return "bg-gray-100 text-gray-800";
    };

    const typeLabel = (fee: any) => {
      if (Number(fee.status) === 1) return fee.statusDescription ?? "Thu";
      if (Number(fee.status) === 2) return fee.statusDescription ?? "Chi";
      return fee.statusDescription ?? ("Trạng thái #" + fee.status);
    };

    return {
      tournamentId,
      items,
      loading,
      error,
      fetchFees,
      fetchBalance,
      serverBalance,
      loadingBalance,
      // form
      showForm,
      form,
      creating,
      formError,
      submitCreate,
      resetForm,
      // aggregations and helpers
      incomeSum,
      expenseSum,
      incomeCount,
      expenseCount,
      displayedBalance,
      formatCurrency,
      formatDate,
      feeBadgeClass,
      typeLabel,
    };
  },
});
</script>

<style scoped>
.app-container {
  position: relative;
  z-index: 2;
}

/* header spacing */
.fee-header {
  padding-top: 6px;
}

/* subtle table row hover */
tbody tr:hover {
  background-color: #fbfbfb;
}

/* ensure white cards contrast */
.bg-white {
  background-color: #ffffff;
}

/* borders/shadows for cards */
section > .border {
  border-color: #e6e6e6;
}

/* small responsive tweaks */
@media (max-width: 640px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>