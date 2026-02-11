<template>
  <HeaderDoibong :stt="4">
    <!-- Payment Section -->
    <div class="w-full bg-[#f8f2f0] rounded-3xl p-3 md:p-6 mb-6">
      <!-- Bank/Wallet Selection -->
      <div class="mb-6">
        <p class="font-semibold text-lg md:text-2xl text-gray-900 mb-4">
          Chọn ngân hàng/ Ví điện tử:
        </p>
        <div class="flex gap-3 md:gap-4 overflow-x-auto pb-2 hide-scrollbar">
          <div
            v-for="(item, index) in bankTech"
            :key="index"
            class="flex-shrink-0 bg-white rounded-xl p-3 md:p-4 w-32 h-20 md:w-48 md:h-24 flex items-center justify-center hover:shadow-lg transition-all cursor-pointer"
          >
            <img
              class="w-20 h-12 md:w-28 md:h-14 object-contain"
              :src="item.img"
              alt="Bank logo"
            />
          </div>
        </div>
      </div>

      <!-- QR & Transfer Info -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <!-- QR Code Section -->
        <div class="lg:col-span-2">
          <div class="bg-gradient-to-r from-[#dd6c67] to-[#c158a0] rounded-3xl overflow-hidden">
            <div class="py-4 text-center">
              <h3 class="font-semibold text-xl md:text-2xl text-white">Mã QR</h3>
            </div>
            <div class="bg-white mx-3 mb-3 rounded-3xl p-4 md:p-6">
              <div class="flex flex-col items-center">
                <div class="w-full max-w-[280px] md:max-w-[350px] aspect-square mb-4">
                  <img
                    class="w-full h-full object-contain"
                    src="../../../assets/img/maQR.png"
                    alt="QR Code"
                  />
                </div>
                <div class="w-full max-w-[280px] md:max-w-[300px] h-14 md:h-16">
                  <img
                    class="w-full h-full object-contain"
                    src="../../../assets/img/bankVisa.png"
                    alt="Bank logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transfer Information -->
        <div class="lg:col-span-3 bg-white rounded-3xl p-4 md:p-6">
          <h2 class="font-bold text-lg md:text-xl text-gray-900 mb-4 md:mb-6 border-b pb-2">
            THÔNG TIN CHUYỂN KHOẢN
          </h2>
          
          <div class="space-y-3 md:space-y-4">
            <div class="flex flex-col md:flex-row md:items-center">
              <span class="font-semibold text-gray-700 md:w-48">Ngân hàng:</span>
              <span class="text-gray-900">TMCP Công Thương Việt Nam</span>
            </div>
            
            <div class="flex flex-col md:flex-row md:items-center">
              <span class="font-semibold text-gray-700 md:w-48">Số tài khoản:</span>
              <span class="text-gray-900 font-mono">323234324</span>
            </div>
            
            <div class="flex flex-col md:flex-row md:items-center">
              <span class="font-semibold text-gray-700 md:w-48">Chủ tài khoản:</span>
              <span class="text-gray-900">Nguyễn Văn A</span>
            </div>
            
            <div class="flex flex-col md:flex-row md:items-center">
              <span class="font-semibold text-gray-700 md:w-48">Số tiền:</span>
              <span class="text-orange-600 font-bold text-lg">100.000 VNĐ</span>
            </div>
            
            <div class="flex flex-col md:flex-row md:items-start">
              <span class="font-semibold text-gray-700 md:w-48">Nội dung:</span>
              <span class="text-gray-900 font-mono">QUYTHANG123</span>
            </div>
          </div>

          <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6 rounded-lg">
            <div class="flex items-start gap-2">
              <Icon name="mdi:information" class="text-orange-600 text-[24px] flex-shrink-0" />
              <p class="text-sm text-gray-700">
                Vui lòng chuyển khoản <span class="font-bold">đúng nội dung: QUYTHANG123</span> để kích hoạt đơn hàng
              </p>
            </div>
          </div>

          <button
            class="w-full md:w-auto mt-6 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="mdi:plus-circle" class="text-[24px]" />
            Tạo giao dịch mới
          </button>
        </div>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="w-full bg-[#f8f2f0] rounded-3xl p-3 md:p-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 class="font-bold text-xl md:text-2xl text-gray-900">
          Danh sách giao dịch & thống kê thu chi
        </h2>
        <button
          @click="exportToExcel"
          :disabled="isExporting"
          class="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-all border border-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon 
            :name="isExporting ? 'mdi:loading' : 'mdi:download'" 
            :class="['w-5 h-5', isExporting ? 'animate-spin' : '']" 
          />
          <span class="font-medium text-gray-700">{{ isExporting ? 'Đang tải...' : 'Tải Excel' }}</span>
        </button>
      </div>

      <!-- Desktop: Table View -->
      <div class="hidden md:block overflow-x-auto bg-gray-50 rounded-lg p-2">
        <table class="text-sm text-left rounded-lg w-full border-separate border-spacing-0">
          <thead
            class="h-[50px] rounded-lg"
            style="background: linear-gradient(90deg, #e57257 0%, #b34fba 100%)"
          >
            <tr>
              <th class="px-4 py-2 rounded-tl-lg rounded-bl-lg text-white">STT</th>
              <th class="px-4 py-2 text-white">Họ tên</th>
              <th class="px-4 py-2 text-white">Ngày chuyển khoản</th>
              <th class="px-4 py-2 text-white">Chuyển khoản qua</th>
              <th class="px-4 py-2 text-white">Số tiền</th>
              <th class="px-4 py-2 rounded-tr-lg rounded-br-lg text-white">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in players"
              :key="index"
              class="bg-white hover:bg-orange-50 transition-colors"
            >
              <td class="px-4 py-4 font-semibold text-gray-700">{{ item.stt }}</td>
              <td class="px-4 py-4 font-medium text-gray-900">{{ item.name }}</td>
              <td class="px-4 py-4 text-gray-600">{{ item.dob }}</td>
              <td class="px-4 py-4 text-gray-600">{{ item.phone }}</td>
              <td class="px-4 py-4 font-semibold text-orange-600">{{ item.email }}</td>
              <td class="px-4 py-4">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="getStatusClass(item.status)"
                >
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
          v-for="(item, index) in players"
          :key="index"
          class="bg-white rounded-xl shadow-md p-4 border border-gray-100"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {{ item.stt }}
              </div>
              <div>
                <h3 class="font-bold text-gray-900">{{ item.name }}</h3>
                <span 
                  class="px-2 py-1 rounded-full text-xs font-semibold mt-1 inline-block"
                  :class="getStatusClass(item.status)"
                >
                  {{ item.status }}
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon name="mdi:calendar" class="text-orange-500 flex-shrink-0" />
              <span class="text-gray-600">{{ item.dob }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:bank" class="text-orange-500 flex-shrink-0" />
              <span class="text-gray-600">{{ item.phone }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:cash" class="text-orange-500 flex-shrink-0" />
              <span class="text-orange-600 font-semibold">{{ item.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="players.length === 0" class="text-center py-16">
        <Icon name="mdi:cash-multiple" class="text-gray-300 text-[64px] mb-4" />
        <h3 class="text-xl font-bold text-gray-700 mb-2">Chưa có giao dịch</h3>
        <p class="text-gray-500">Danh sách giao dịch sẽ hiển thị ở đây</p>
      </div>
    </div>
  </HeaderDoibong>
</template>

<script lang="ts">
import HeaderDoibong from "../../../component/detaildoibong/index.vue";
import vib from "../../../assets/img/vib.png";
import * as XLSX from 'xlsx';

export default defineComponent({
  components: {
    HeaderDoibong,
  },
  setup() {
    const toast = useToast();
    const isExporting = ref(false);

    const players = [
      {
        stt: 1,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "VietinBank",
        email: "100.000 VNĐ",
        status: "Thành công",
      },
      {
        stt: 2,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "MB Bank",
        email: "200.000 VNĐ",
        status: "Thành công",
      },
      {
        stt: 3,
        name: "Trần Thị C",
        dob: "15/03/1998",
        phone: "Techcombank",
        email: "150.000 VNĐ",
        status: "Đang xử lý",
      },
      {
        stt: 4,
        name: "Lê Văn D",
        dob: "10/08/2001",
        phone: "BIDV",
        email: "300.000 VNĐ",
        status: "Thành công",
      },
      {
        stt: 5,
        name: "Phạm Minh E",
        dob: "05/12/1999",
        phone: "Vietcombank",
        email: "250.000 VNĐ",
        status: "Thất bại",
      },
    ];

    const bankTech = [
      { id: 1, img: vib, name: "VIB" },
      { id: 2, img: vib, name: "Techcombank" },
      { id: 3, img: vib, name: "MB Bank" },
      { id: 4, img: vib, name: "VietinBank" },
    ];

    const getStatusClass = (status: string) => {
      const classes = {
        'Thành công': 'bg-green-100 text-green-800',
        'Đang xử lý': 'bg-yellow-100 text-yellow-800',
        'Thất bại': 'bg-red-100 text-red-800',
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    };

    const exportToExcel = () => {
      if (!players.length) return;

      try {
        isExporting.value = true;

        // Prepare data with headers
        const headers = ['STT', 'Họ và tên', 'Ngày chuyển khoản', 'Chuyển khoản qua', 'Số tiền', 'Trạng thái'];
        const data = players.map(item => [
          item.stt,
          item.name,
          item.dob,
          item.phone,
          item.email,
          item.status,
        ]);

        // Create workbook and worksheet
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

        // Set column widths
        const columnWidths = [
          { wch: 8 },   // STT
          { wch: 25 },  // Họ và tên
          { wch: 20 },  // Ngày chuyển khoản
          { wch: 20 },  // Chuyển khoản qua
          { wch: 18 },  // Số tiền
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

            // Base style for all cells
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

            // Special styling for status column (last column)
            if (C === range.e.c) {
              const status = ws[address].v;
              let bgColor = "E5E7EB"; // Gray default
              let textColor = "374151";

              if (status === "Thành công") {
                bgColor = "D1FAE5";
                textColor = "065F46";
              } else if (status === "Đang xử lý") {
                bgColor = "FEF3C7";
                textColor = "92400E";
              } else if (status === "Thất bại") {
                bgColor = "FEE2E2";
                textColor = "991B1B";
              }

              ws[address].s.fill = { fgColor: { rgb: bgColor } };
              ws[address].s.font = { color: { rgb: textColor }, bold: true };
              ws[address].s.alignment.horizontal = "center";
            }

            // Bold styling for amount column
            if (C === range.e.c - 1) {
              ws[address].s.font = { bold: true, color: { rgb: "EA580C" } };
            }
          }
        }

        // Set row heights
        const rowHeights = new Array(range.e.r + 1).fill({ hpt: 25 });
        rowHeights[0] = { hpt: 35 }; // Header row height
        ws['!rows'] = rowHeights;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Giao dịch quỹ đội");

        // Generate filename with timestamp
        const now = new Date();
        const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
        const filename = `GiaoDichQuyDoi_${timestamp}.xlsx`;

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
      players,
      bankTech,
      exportToExcel,
      isExporting,
      getStatusClass,
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

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>