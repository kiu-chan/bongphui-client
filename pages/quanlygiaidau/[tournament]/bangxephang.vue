<template>
  <TournamentHeader :stt="2">
    <div
      style="
        background: linear-gradient(180deg, #e2705a 0%, #b953b0 100%);
        height: 80px;
      "
      class="p-4 rounded-lg my-6 relative"
    >
      <div class="Thongke">
        <div>
          <h1
            class="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-wider mb-1"
          >
            THỐNG KÊ GIẢI ĐẤU
          </h1>
          <p class="text-sm text-gray-500 space-x-1">
            <span>Trang chủ</span>
            <span class="text-gray-400">/</span>
            <span>Cầu thủ</span>
            <span class="text-gray-400">/</span>
            <span>Đội</span>
            <span class="text-gray-400">/</span>
            <span>Bảng</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Export Button -->
    <div v-if="!isLoading && dataLeague && dataLeague.length > 0" class="flex justify-end mb-4">
      <button 
        @click="exportToExcel"
        :disabled="isExporting"
        :class="[
          'ButtonColor px-4 py-2 rounded-lg transition-all flex items-center gap-2',
          isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 hover:scale-105'
        ]"
      >
        <Icon
          v-if="!isExporting"
          name="mdi:file-excel"
          class="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
        />
        <Icon
          v-else
          name="mdi:loading"
          class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] animate-spin"
        />
        <span class="hidden md:inline text-sm font-medium">
          {{ isExporting ? 'Đang xuất...' : 'Xuất Excel' }}
        </span>
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="!dataLeague || dataLeague.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
      <div class="mb-4">
        <Icon name="mdi:table" class="text-gray-300" width="80" height="80" />
      </div>
      <h3 class="text-xl font-medium text-gray-600 mb-2">Chưa có bảng xếp hạng</h3>
      <p class="text-gray-500">Bảng xếp hạng sẽ được cập nhật sau khi chia bảng và có kết quả thi đấu</p>
    </div>
    
    <!-- Data Display -->
    <div v-else>
      <div
        v-for="(item, index) in dataLeague"
        :key="index"
        style="
          overflow-x: auto;
          background: rgba(250, 249, 249, 1);
          padding: 8px;
          margin-bottom: 40px;
        "
        class="w-full rounded-lg overflow-hidden"
      >
        <div class="flex gap-8 mt-[20px] mb-[20px]">
          <p class="font-medium text-[20px]">Bảng {{ item.leagueName }}</p>
        </div>
        
        <!-- Empty League State -->
        <div v-if="!item.teams || item.teams.length === 0" class="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg">
          <Icon name="mdi:account-group-outline" class="text-gray-300 mb-3" width="60" height="60" />
          <p class="text-gray-500">Bảng {{ item.leagueName }} chưa có đội tham gia</p>
        </div>
        
        <!-- League Table -->
        <table
          v-else
          class="text-sm text-left rounded-lg w-full border-separate border-spacing-0"
        >
          <thead
            class="h-[50px] rounded-lg"
            style="background: linear-gradient(90deg, #e57257 0%, #b34fba 100%)"
          >
            <tr>
              <th class="px-4 py-2 rounded-tl-lg rounded-bl-lg text-white">
                STT
              </th>
              <th class="px-4 py-2 text-white">Tên đội</th>
              <th class="px-4 py-2 text-white text-center">Trận</th>
              <th class="px-4 py-2 text-white text-center">Thắng</th>
              <th class="px-4 py-2 text-white text-center">Hòa</th>
              <th class="px-4 py-2 text-white text-center">Thua</th>
              <th class="px-4 py-2 text-white text-center">Hiệu số</th>
              <th class="px-4 py-2 text-white text-center">Điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item2, teamIndex) in item.teams"
              :key="teamIndex"
              class="hover:bg-gray-100 rowHover transition-colors"
            >
              <td
                class="px-4 py-4 w-12 sticky left-0 font-semibold z-10 lg:static lg:left-auto lg:z-auto bg-inherit"
              >
                {{ teamIndex + 1 }}
              </td>
              <td
                class="px-4 py-4 w-48 sticky left-12 flex items-center gap-2 z-10 lg:static lg:left-auto lg:z-auto bg-inherit"
              >
                {{ item2.teamName }}
              </td>
              <td class="px-4 py-4 text-center">{{ item2.matchesPlayed || 0 }}</td>
              <td class="px-4 py-4 text-center">{{ item2.wins || 0 }}</td>
              <td class="px-4 py-4 text-center">{{ item2.draws || 0 }}</td>
              <td class="px-4 py-4 font-bold text-center">
                {{ item2.losses || 0 }}
              </td>
              <td class="px-4 py-4 font-bold text-center">
                {{ calculateGoalDifference(item2) }}
              </td>
              <td class="px-4 py-4 text-center font-bold text-orange-600">
                {{ item2.points || 0 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </TournamentHeader>
</template>

<script lang="ts">
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
import { useLeagueStore } from "../../../store/league";
import * as XLSX from 'xlsx';

export default defineComponent({
  components: {
    TournamentHeader,
  },

  setup() {
    const route = useRoute();
    const id = route.params.tournament;
    const LeagueStore = useLeagueStore();
    const dataLeague: Ref<any[]> = ref([]);
    const isLoading = ref(true);
    const isExporting = ref(false);
    const toast = useToast();
    
    onMounted(() => {
      fnGetListLeguage();
    });
    
    const fnGetListLeguage = async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const [res] = await Promise.all([
          LeagueStore.fnGetLeague(id),
          delay
        ]);
        
        if (Array.isArray(res)) {
          dataLeague.value = res;
        } else {
          dataLeague.value = [];
        }
      } catch (err) {
        console.log(err, "err");
        dataLeague.value = [];
        toast.error({
          message: "Không thể tải bảng xếp hạng",
          position: "topRight",
        });
      } finally {
        isLoading.value = false;
      }
    };
    
    // Calculate goal difference
    const calculateGoalDifference = (team: any) => {
      const goalsFor = team.goalsFor || 0;
      const goalsAgainst = team.goalsAgainst || 0;
      const diff = goalsFor - goalsAgainst;
      
      if (diff > 0) return `+${diff}`;
      if (diff === 0) return '0';
      return diff.toString();
    };

    // Export to Excel
    const exportToExcel = () => {
      if (!dataLeague.value || dataLeague.value.length === 0) {
        toast.warning({
          message: "Không có dữ liệu để xuất",
          position: "topRight",
        });
        return;
      }

      isExporting.value = true;

      try {
        const wb = XLSX.utils.book_new();
        wb.Props = {
          Title: "Bảng xếp hạng giải đấu",
          Subject: "Bảng xếp hạng",
          Author: "Hệ thống quản lý giải đấu",
          CreatedDate: new Date()
        };

        // Common header style
        const headerStyle = {
          font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: 'E57257' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } }
          }
        };

        const titleStyle = {
          font: { bold: true, sz: 16, color: { rgb: 'E57257' } },
          alignment: { horizontal: 'center', vertical: 'center' }
        };

        const centerStyle = {
          alignment: { horizontal: 'center', vertical: 'center' }
        };

        const boldCenterStyle = {
          font: { bold: true, color: { rgb: 'E57257' } },
          alignment: { horizontal: 'center', vertical: 'center' }
        };

        // Helper function to apply borders
        const applyBorders = (ws: any, range: string) => {
          const decoded = XLSX.utils.decode_range(range);
          const border = {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } }
          };

          for (let R = decoded.s.r; R <= decoded.e.r; ++R) {
            for (let C = decoded.s.c; C <= decoded.e.c; ++C) {
              const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
              if (!ws[cellAddress]) continue;
              if (!ws[cellAddress].s) ws[cellAddress].s = {};
              ws[cellAddress].s.border = border;
            }
          }
        };

        const setCellStyle = (ws: any, cell: string, style: any) => {
          if (!ws[cell]) return;
          ws[cell].s = style;
        };

        // Create a sheet for each league
        dataLeague.value.forEach((league) => {
          if (!league.teams || league.teams.length === 0) return;

          // Calculate statistics
          const totalMatches = league.teams.reduce((sum: number, team: any) => sum + (team.matchesPlayed || 0), 0);
          const totalGoals = league.teams.reduce((sum: number, team: any) => sum + (team.goalsFor || 0), 0);
          const avgGoalsPerMatch = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : '0';

          const sheetData = [
            [`BẢNG XẾP HẠNG - BẢNG ${league.leagueName}`],
            [],
            ['STT', 'Tên đội', 'Trận', 'Thắng', 'Hòa', 'Thua', 'Hiệu số', 'Điểm'],
            ...league.teams.map((team: any, index: number) => [
              index + 1,
              team.teamName,
              team.matchesPlayed || 0,
              team.wins || 0,
              team.draws || 0,
              team.losses || 0,
              calculateGoalDifference(team),
              team.points || 0,
            ]),
            [],
            ['THỐNG KÊ'],
            ['Tổng số trận đã đấu:', totalMatches],
            ['Tổng số bàn thắng:', totalGoals],
            ['Trung bình bàn thắng/trận:', avgGoalsPerMatch],
          ];

          const ws = XLSX.utils.aoa_to_sheet(sheetData);

          // Merge title
          ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }
          ];

          // Column widths
          ws['!cols'] = [
            { wch: 8 },  // STT
            { wch: 25 }, // Tên đội
            { wch: 10 }, // Trận
            { wch: 10 }, // Thắng
            { wch: 10 }, // Hòa
            { wch: 10 }, // Thua
            { wch: 12 }, // Hiệu số
            { wch: 10 }, // Điểm
          ];

          // Row heights
          ws['!rows'] = [
            { hpt: 30 }, // Title
            { hpt: 10 }, // Empty
            { hpt: 25 }, // Header
          ];

          // Apply styles
          setCellStyle(ws, 'A1', titleStyle);

          // Header styles
          ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'].forEach(cell => {
            setCellStyle(ws, cell, headerStyle);
          });

          // Data borders
          const dataRange = `A3:H${3 + league.teams.length}`;
          applyBorders(ws, dataRange);

          // Center align all data
          for (let i = 4; i <= 3 + league.teams.length; i++) {
            ['A', 'C', 'D', 'E', 'F', 'G'].forEach(col => {
              setCellStyle(ws, `${col}${i}`, centerStyle);
            });
            // Bold points column
            setCellStyle(ws, `H${i}`, boldCenterStyle);
          }

          // Statistics section
          const statsStartRow = 5 + league.teams.length;
          setCellStyle(ws, `A${statsStartRow}`, {
            font: { bold: true, sz: 12 },
            fill: { fgColor: { rgb: 'FFF3E0' } }
          });

          XLSX.utils.book_append_sheet(wb, ws, `Bảng ${league.leagueName}`);
        });

        // Create summary sheet
        const summaryData = [
          ['TỔNG HỢP BẢNG XẾP HẠNG'],
          [],
          ['Bảng', 'Số đội', 'Đội dẫn đầu', 'Điểm cao nhất'],
          ...dataLeague.value.map((league: any) => {
            const topTeam = league.teams && league.teams.length > 0 ? league.teams[0] : null;
            return [
              league.leagueName,
              league.teams?.length || 0,
              topTeam?.teamName || '-',
              topTeam?.points || 0,
            ];
          }),
        ];

        const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
        summaryWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
        summaryWs['!cols'] = [{ wch: 15 }, { wch: 12 }, { wch: 25 }, { wch: 15 }];
        
        setCellStyle(summaryWs, 'A1', titleStyle);
        ['A3', 'B3', 'C3', 'D3'].forEach(cell => {
          setCellStyle(summaryWs, cell, headerStyle);
        });

        XLSX.utils.book_append_sheet(wb, summaryWs, 'Tổng hợp');

        // Generate filename
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `Bang-xep-hang_${dateStr}_${timeStr}.xlsx`;

        // Save file
        XLSX.writeFile(wb, filename, { 
          bookType: 'xlsx', 
          cellStyles: true 
        });

        toast.success({
          message: "Xuất file Excel thành công",
          position: "topRight",
        });
      } catch (error) {
        console.error('Export error:', error);
        toast.error({
          message: "Có lỗi xảy ra khi xuất file",
          position: "topRight",
        });
      } finally {
        isExporting.value = false;
      }
    };
    
    return {
      dataLeague,
      fnGetListLeguage,
      isLoading,
      isExporting,
      calculateGoalDifference,
      exportToExcel,
    };
  },
});
</script>

<style scoped>
.Thongke {
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(250, 249, 249, 1);
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.bangxephang {
  border: 1px solid var(--textsport);
}
.rowHover:hover {
  color: var(--textsport);
}

/* Ensure sticky columns have proper background on hover */
.rowHover:hover td.bg-inherit {
  background-color: rgb(243 244 246);
}
</style>