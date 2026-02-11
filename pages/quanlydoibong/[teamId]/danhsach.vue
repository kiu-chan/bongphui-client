<template>
  <HeaderDoibong :stt="1">
    <!-- Controls Bar -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 mb-6">
      <!-- Search -->
      <div class="search w-full md:max-w-[409px] h-[50px] rounded-2xl relative">
        <input
          class="w-full h-full focus:outline-none focus:ring-2 focus:ring-orange-500 pl-12 pr-4 font-normal text-base md:text-[20px] border-2 border-gray-200 rounded-2xl"
          type="text"
          placeholder="Tìm kiếm thành viên..."
          v-model="keyword"
        />
        <Icon
          class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          name="hugeicons:search-02"
          width="24"
          height="24"
        />
      </div>

      <!-- Export Button -->
      <button
        @click="exportToExcel"
        :disabled="!listPlayer.length || isExporting"
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon 
          :name="isExporting ? 'mdi:loading' : 'mdi:download'" 
          :class="['text-[24px]', isExporting ? 'animate-spin' : '']" 
        />
        <span class="hidden sm:inline">{{ isExporting ? 'Đang tải...' : 'Tải xuống' }}</span>
        <span class="sm:hidden">{{ isExporting ? '...' : 'Tải' }}</span>
      </button>
    </div>

    <!-- Desktop: Table View -->
    <div class="hidden md:block overflow-x-auto bg-gray-50 rounded-lg p-2 shadow-inner">
      <table
        v-if="listPlayer.length > 0"
        class="text-sm text-left rounded-lg w-full border-separate border-spacing-0"
      >
        <thead
          class="h-[50px] rounded-lg"
          style="background: linear-gradient(90deg, #e57257 0%, #b34fba 100%)"
        >
          <tr>
            <th class="px-4 py-2 rounded-tl-lg rounded-bl-lg text-white">STT</th>
            <th class="px-4 py-2 text-white">Họ tên</th>
            <th class="px-4 py-2 text-white">Ngày sinh</th>
            <th class="px-4 py-2 text-white">Số điện thoại</th>
            <th class="px-4 py-2 text-white">Email</th>
            <th class="px-4 py-2 text-white">Ngày vào đội</th>
            <th class="px-4 py-2 rounded-tr-lg rounded-br-lg text-white">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in listPlayer"
            :key="index"
            class="bg-white hover:bg-orange-50 transition-colors"
          >
            <td class="px-4 py-4 font-semibold text-gray-700">
              {{ (offset - 1) * limit + index + 1 }}
            </td>
            <td class="px-4 py-4 font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-4 py-4 text-gray-600">{{ item.birthdate || '—' }}</td>
            <td class="px-4 py-4 text-gray-600">{{ item.phone || '—' }}</td>
            <td class="px-4 py-4 text-gray-600">{{ item.email || '—' }}</td>
            <td class="px-4 py-4 font-semibold text-gray-900">{{ item.dateJoin || '—' }}</td>
            <td class="px-4 py-4">
              <span v-if="item.status" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile: Card View -->
    <div class="md:hidden space-y-4">
      <div
        v-for="(item, index) in listPlayer"
        :key="index"
        class="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ (offset - 1) * limit + index + 1 }}
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-lg">{{ item.name }}</h3>
              <p v-if="item.status" class="text-xs text-green-600 font-semibold mt-1">{{ item.status }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <Icon name="mdi:cake-variant" class="text-orange-500 flex-shrink-0" />
            <span class="text-gray-600">{{ item.birthdate || 'Chưa cập nhật' }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="mdi:phone" class="text-orange-500 flex-shrink-0" />
            <span class="text-gray-600">{{ item.phone || 'Chưa cập nhật' }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="mdi:email" class="text-orange-500 flex-shrink-0" />
            <span class="text-gray-600 truncate">{{ item.email || 'Chưa cập nhật' }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="mdi:calendar-check" class="text-orange-500 flex-shrink-0" />
            <span class="text-gray-600">Tham gia: {{ item.dateJoin || 'Chưa cập nhật' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && listPlayer.length === 0" class="text-center py-16">
      <div class="inline-block w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name="mdi:account-off" class="text-gray-400 text-[48px]" />
      </div>
      <h3 class="text-xl font-bold text-gray-700 mb-2">Không có thành viên nào</h3>
      <p class="text-gray-500 mb-6">
        {{ keyword ? 'Không tìm thấy kết quả phù hợp với từ khóa tìm kiếm' : 'Đội bóng chưa có thành viên nào' }}
      </p>
      <button
        v-if="keyword"
        @click="keyword = ''"
        class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
      >
        Xóa bộ lọc
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Đang tải dữ liệu...</p>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && listPlayer.length > 0" class="flex justify-center mt-8 mb-8">
      <div class="flex items-center gap-3">
        <button
          @click="offset > 1 ? offset-- : null"
          :disabled="offset === 1"
          class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all"
          :class="offset === 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-orange-500 text-orange-500 hover:bg-orange-50'"
        >
          <Icon name="ci:chevron-left" width="24" height="24" />
        </button>

        <div class="flex gap-2">
          <div
            v-for="page in displayPages"
            :key="page"
            @click="offset = page"
            class="w-10 h-10 rounded-full flex items-center justify-center font-semibold cursor-pointer transition-all"
            :class="offset === page 
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md' 
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300'"
          >
            {{ page }}
          </div>
        </div>

        <button
          @click="offset++"
          :disabled="listPlayer.length < limit"
          class="flex items-center justify-center w-10 h-10 rounded-full transition-all"
          :class="listPlayer.length < limit 
            ? 'border-2 border-gray-300 text-gray-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg'"
        >
          <Icon name="ci:chevron-right" width="24" height="24" />
        </button>
      </div>
    </div>
  </HeaderDoibong>
</template>

<script lang="ts">
import HeaderDoibong from "../../../component/detaildoibong/index.vue";
import { useTeamStore } from "../../../store/team";
import * as XLSX from 'xlsx';

export default defineComponent({
  components: {
    HeaderDoibong,
  },
  setup() {
    const keyword: Ref<string> = ref("");
    const TeamStore = useTeamStore();
    const listPlayer: Ref<any[]> = ref([]);
    const loading = ref(false);
    const isExporting = ref(false);
    const route = useRoute();
    const idParams = route.params.teamId;
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const toast = useToast();

    // Computed for pagination display
    const displayPages = computed(() => {
      const pages = [];
      const maxDisplay = 5;
      const start = Math.max(1, offset.value - 2);
      const end = start + maxDisplay - 1;
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    onMounted(() => {
      fnGetListPlayer();
    });

    watch([offset, keyword], () => {
      fnGetListPlayer();
    });

    const fnGetListPlayer = () => {
      loading.value = true;
      const params = [
        keyword.value.toString() && `keyword=${keyword.value}`,
        idParams && `teamId=${idParams}`,
        limit && `limit=${limit}`,
        offset.value && `offset=${offset.value}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      
      TeamStore.fnGetListPlayer(idParams, url)
        .then((res) => {
          listPlayer.value = res || [];
        })
        .catch((err) => {
          console.error('Error loading players:', err);
          listPlayer.value = [];
          toast.error({
            message: "Không thể tải danh sách thành viên",
            position: "topRight",
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const exportToExcel = () => {
      if (!listPlayer.value.length) return;

      try {
        isExporting.value = true;

        // Prepare data with headers
        const headers = ['STT', 'Họ và tên', 'Ngày sinh', 'Số điện thoại', 'Email', 'Ngày vào đội', 'Trạng thái'];
        const data = listPlayer.value.map((item, index) => [
          (offset.value - 1) * limit + index + 1,
          item.name || '',
          item.birthdate || '',
          item.phone || '',
          item.email || '',
          item.dateJoin || '',
          item.status || '',
        ]);

        // Create workbook and worksheet
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

        // Set column widths
        const columnWidths = [
          { wch: 6 },   // STT
          { wch: 25 },  // Họ và tên
          { wch: 15 },  // Ngày sinh
          { wch: 18 },  // Số điện thoại
          { wch: 30 },  // Email
          { wch: 15 },  // Ngày vào đội
          { wch: 15 },  // Trạng thái
        ];
        ws['!cols'] = columnWidths;

        // Style the header row
        const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
        
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_col(C) + "1";
          if (!ws[address]) continue;
          
          ws[address].s = {
            font: {
              bold: true,
              color: { rgb: "FFFFFF" },
              sz: 12,
            },
            fill: {
              fgColor: { rgb: "E87451" }
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            }
          };
        }

        // Style data rows
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_col(C) + (R + 1);
            if (!ws[address]) continue;

            ws[address].s = {
              alignment: {
                horizontal: C === 0 ? "center" : "left",
                vertical: "center",
                wrapText: true,
              },
              border: {
                top: { style: "thin", color: { rgb: "CCCCCC" } },
                bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                left: { style: "thin", color: { rgb: "CCCCCC" } },
                right: { style: "thin", color: { rgb: "CCCCCC" } },
              },
              fill: {
                fgColor: { rgb: R % 2 === 0 ? "FFFFFF" : "F9FAFB" }
              }
            };
          }
        }

        // Set row heights
        const rowHeights = new Array(range.e.r + 1).fill({ hpt: 25 });
        rowHeights[0] = { hpt: 35 }; // Header row height
        ws['!rows'] = rowHeights;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách thành viên");

        // Generate filename with timestamp
        const now = new Date();
        const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
        const filename = `DanhSachThanhVien_${timestamp}.xlsx`;

        // Write file
        XLSX.writeFile(wb, filename, { 
          bookType: 'xlsx',
          cellStyles: true,
        });

        toast.success({
          message: "Đã tải xuống file Excel thành công!",
          position: "topRight",
        });
      } catch (error) {
        console.error('Export error:', error);
        toast.error({
          message: "Không thể xuất file Excel. Vui lòng thử lại!",
          position: "topRight",
        });
      } finally {
        isExporting.value = false;
      }
    };

    return {
      listPlayer,
      offset,
      keyword,
      loading,
      limit,
      displayPages,
      exportToExcel,
      isExporting,
    };
  },
});
</script>

<style scoped>
th {
  font-weight: 600;
  font-size: 15px;
}
td {
  font-weight: 500;
  font-size: 15px;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>