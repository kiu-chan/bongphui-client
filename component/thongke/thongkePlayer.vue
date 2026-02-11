<template>
  <div>
    <!-- Export Button - Responsive -->
    <div class="mt-4 md:mt-[58px] flex justify-end mb-4">
      <button 
        @click="exportToExcel"
        :disabled="isExporting || isAllEmpty"
        :class="[
          'ButtonColor px-4 py-2 rounded-lg transition-all flex items-center gap-2',
          isExporting || isAllEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 hover:scale-105'
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
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="isAllEmpty" class="flex flex-col items-center justify-center py-20 text-center">
      <div class="mb-4">
        <Icon name="mdi:chart-box-outline" class="text-gray-300" width="80" height="80" />
      </div>
      <h3 class="text-xl font-medium text-gray-600 mb-2">Chưa có dữ liệu thống kê</h3>
      <p class="text-gray-500">Dữ liệu sẽ được cập nhật sau khi có trận đấu</p>
    </div>

    <!-- Mobile Tabs -->
    <div v-else class="block md:hidden">
      <!-- Tab Navigation -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-shrink-0 px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2',
            activeTab === tab.id
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
              : 'bg-white border-2 border-gray-200 text-gray-600'
          ]"
        >
          <Icon :name="tab.icon" class="text-xl" />
          <span>{{ tab.label }}</span>
          <span v-if="getTabCount(tab.id) > 0" 
            :class="[
              'ml-1 px-2 py-0.5 rounded-full text-xs font-bold',
              activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-gray-100'
            ]">
            {{ getTabCount(tab.id) }}
          </span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="space-y-3">
        <!-- GOAL Tab -->
        <div v-show="activeTab === 'goals'">
          <div v-if="dataPlayer.length === 0" class="text-center text-gray-500 italic py-12 bg-white rounded-xl">
            <Icon name="mdi:soccer" class="text-gray-300 mx-auto mb-2" width="48" height="48" />
            <p>Chưa có dữ liệu bàn thắng</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(item, index) in dataPlayer"
              :key="index"
              class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500"
            >
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {{ index + 1 }}
                </div>
                
                <div class="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-3 border-orange-200 shadow-md bg-gray-100">
                  <img
                    :src="item.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 
                    :class="[
                      'font-bold text-gray-800 leading-tight mb-1',
                      item.playerName.length > 20 ? 'text-sm' : 'text-base'
                    ]"
                    :style="{ 
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }"
                  >
                    {{ item.playerName }}
                  </h3>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="mdi:trophy" class="text-orange-500" width="14" height="14" />
                    <span class="truncate">{{ item.tournamentName }}</span>
                  </p>
                </div>
                
                <div class="flex-shrink-0 text-right ml-2">
                  <div class="flex items-center gap-1 bg-orange-50 px-3 py-2 rounded-lg">
                    <Icon name="mdi:soccer" class="text-orange-500" width="20" height="20" />
                    <span class="text-2xl font-bold text-orange-600">{{ item.totalGoals }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ASSISTS Tab -->
        <div v-show="activeTab === 'assists'">
          <div v-if="dataAssits.length === 0" class="text-center text-gray-500 italic py-12 bg-white rounded-xl">
            <Icon name="mdi:hand-pointing-right" class="text-gray-300 mx-auto mb-2" width="48" height="48" />
            <p>Chưa có dữ liệu kiến tạo</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(item, index) in dataAssits"
              :key="index"
              class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {{ index + 1 }}
                </div>
                
                <div class="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-3 border-blue-200 shadow-md bg-gray-100">
                  <img
                    :src="item.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 
                    :class="[
                      'font-bold text-gray-800 leading-tight mb-1',
                      item.playerName.length > 20 ? 'text-sm' : 'text-base'
                    ]"
                    :style="{ 
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }"
                  >
                    {{ item.playerName }}
                  </h3>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="mdi:trophy" class="text-blue-500" width="14" height="14" />
                    <span class="truncate">{{ item.tournamentName }}</span>
                  </p>
                </div>
                
                <div class="flex-shrink-0 text-right ml-2">
                  <div class="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg">
                    <Icon name="mdi:hand-pointing-right" class="text-blue-500" width="20" height="20" />
                    <span class="text-2xl font-bold text-blue-600">{{ item.totalAssists }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CARDS Tab -->
        <div v-show="activeTab === 'cards'">
          <div v-if="dataCard.length === 0" class="text-center text-gray-500 italic py-12 bg-white rounded-xl">
            <Icon name="mdi:card" class="text-gray-300 mx-auto mb-2" width="48" height="48" />
            <p>Chưa có dữ liệu thẻ phạt</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(item, index) in dataCard"
              :key="index"
              class="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500"
            >
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {{ index + 1 }}
                </div>
                
                <div class="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-3 border-yellow-200 shadow-md bg-gray-100">
                  <img
                    :src="item.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 
                    :class="[
                      'font-bold text-gray-800 leading-tight mb-1',
                      item.playerName.length > 20 ? 'text-sm' : 'text-base'
                    ]"
                    :style="{ 
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }"
                  >
                    {{ item.playerName }}
                  </h3>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="mdi:trophy" class="text-yellow-500" width="14" height="14" />
                    <span class="truncate">{{ item.tournamentName }}</span>
                  </p>
                </div>
                
                <div class="flex-shrink-0 text-right ml-2">
                  <div class="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                    <Icon name="mdi:card" class="text-yellow-500" width="20" height="20" />
                    <span class="text-2xl font-bold text-yellow-600">{{ item.yellowCards }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Grid -->
    <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-[20px]">
      <!-- GOAL Section -->
      <div class="w-full rounded-xl borderPlayer p-4">
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:soccer" class="text-orange-500" width="28" height="28" />
          <h2 class="text-xl md:text-2xl textGoal font-semibold">BÀN THẮNG</h2>
        </div>
        
        <div v-if="dataPlayer.length === 0" class="text-center text-gray-500 italic py-8">
          Chưa có dữ liệu
        </div>
        
        <div v-else v-for="(item2, index2) in dataPlayer" :key="index2">
          <div class="mb-4 hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div class="flex gap-2 md:gap-[12px] items-center">
              <span class="min-w-[24px] md:min-w-[28px] h-[24px] md:h-[28px] text-center flex items-center justify-center text-sm md:text-base textGoal font-bold bg-orange-100 rounded-full">
                {{ index2 + 1 }}
              </span>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-lg overflow-hidden flex justify-center flex-shrink-0 bg-gray-100">
                  <img
                    :src="item2.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <h2 class="text-base md:text-lg font-medium truncate">{{ item2.playerName }}</h2>
                  <span class="text-xs md:text-sm font-light textTitlePlayer truncate block">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-lg md:text-xl font-semibold text-orange-600 flex-shrink-0">
                {{ item2.totalGoals }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSISTS Section -->
      <div class="w-full rounded-xl borderPlayer p-4">
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:hand-pointing-right" class="text-blue-500" width="28" height="28" />
          <h2 class="text-xl md:text-2xl textGoal font-semibold">KIẾN TẠO</h2>
        </div>
        
        <div v-if="dataAssits.length === 0" class="text-center text-gray-500 italic py-8">
          Chưa có dữ liệu
        </div>
        
        <div v-else v-for="(item2, index2) in dataAssits" :key="index2">
          <div class="mb-4 hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div class="flex gap-2 md:gap-[12px] items-center">
              <span class="min-w-[24px] md:min-w-[28px] h-[24px] md:h-[28px] text-center flex items-center justify-center text-sm md:text-base textGoal font-bold bg-blue-100 rounded-full">
                {{ index2 + 1 }}
              </span>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-lg overflow-hidden flex justify-center flex-shrink-0 bg-gray-100">
                  <img
                    :src="item2.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <h2 class="text-base md:text-lg font-medium truncate">{{ item2.playerName }}</h2>
                  <span class="text-xs md:text-sm font-light textTitlePlayer truncate block">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-lg md:text-xl font-semibold text-blue-600 flex-shrink-0">
                {{ item2.totalAssists }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CARD Section -->
      <div class="w-full rounded-xl borderPlayer p-4">
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:card" class="text-yellow-500" width="28" height="28" />
          <h2 class="text-xl md:text-2xl textGoal font-semibold">THẺ PHẠT</h2>
        </div>
        
        <div v-if="dataCard.length === 0" class="text-center text-gray-500 italic py-8">
          Chưa có dữ liệu
        </div>
        
        <div v-else v-for="(item2, index2) in dataCard" :key="index2">
          <div class="mb-4 hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div class="flex gap-2 md:gap-[12px] items-center">
              <span class="min-w-[24px] md:min-w-[28px] h-[24px] md:h-[28px] text-center flex items-center justify-center text-sm md:text-base textGoal font-bold bg-yellow-100 rounded-full">
                {{ index2 + 1 }}
              </span>
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-lg overflow-hidden flex justify-center flex-shrink-0 bg-gray-100">
                  <img
                    :src="item2.imageUrl || '/img/imglg.png'"
                    @error="$event.target.src = '/img/imglg.png'"
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <h2 class="text-base md:text-lg font-medium truncate">{{ item2.playerName }}</h2>
                  <span class="text-xs md:text-sm font-light textTitlePlayer truncate block">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-lg md:text-xl font-semibold text-yellow-600 flex-shrink-0">
                {{ item2.yellowCards }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useImportStore } from "../../store/import";
import * as XLSX from 'xlsx';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props);

    const dataPlayer: Ref<Array<any>> = ref([]);
    const dataAssits: Ref<Array<any>> = ref([]);
    const dataCard: Ref<Array<any>> = ref([]);
    const isLoading = ref(true);
    const isExporting = ref(false);
    const activeTab = ref('goals');
    const ImportStore = useImportStore();
    const toast = useToast();
    
    const tabs = [
      { id: 'goals', label: 'Bàn thắng', icon: 'mdi:soccer' },
      { id: 'assists', label: 'Kiến tạo', icon: 'mdi:hand-pointing-right' },
      { id: 'cards', label: 'Thẻ phạt', icon: 'mdi:card' },
    ];
    
    onMounted(() => {
      fetchAllData();
    });

    const fetchAllData = async () => {
      isLoading.value = true;
      try {
        await Promise.all([
          fnListTk(),
          fnListtkAssits(),
          fnListtkCard(),
        ]);
      } finally {
        isLoading.value = false;
      }
    };

    const fnListTk = () => {
      return ImportStore.fnGetImportTournament(id.value)
        .then((res: any) => {
          dataPlayer.value = Array.isArray(res) ? res : [];
        })
        .catch((err) => {
          console.log(err);
          dataPlayer.value = [];
        });
    };

    const fnListtkAssits = () => {
      return ImportStore.fnGetImportTournamentAssists(id.value)
        .then((res: any) => {
          dataAssits.value = Array.isArray(res) ? res : [];
        })
        .catch((err) => {
          console.log(err);
          dataAssits.value = [];
        });
    };

    const fnListtkCard = () => {
      return ImportStore.fnGetImportTournamentCard(id.value)
        .then((res: any) => {
          dataCard.value = Array.isArray(res) ? res : [];
        })
        .catch((err) => {
          console.log(err);
          dataCard.value = [];
        });
    };

    const isAllEmpty = computed(() => {
      return dataPlayer.value.length === 0 && 
             dataAssits.value.length === 0 && 
             dataCard.value.length === 0;
    });

    const getTabCount = (tabId: string) => {
      switch(tabId) {
        case 'goals': return dataPlayer.value.length;
        case 'assists': return dataAssits.value.length;
        case 'cards': return dataCard.value.length;
        default: return 0;
      }
    };

    const exportToExcel = () => {
      if (isAllEmpty.value) {
        toast.warning({
          message: "Không có dữ liệu để xuất",
          position: "topRight",
        });
        return;
      }

      isExporting.value = true;

      try {
        const wb = XLSX.utils.book_new();

        // Sheet 1: Bàn thắng
        if (dataPlayer.value.length > 0) {
          const totalGoals = dataPlayer.value.reduce((sum, item) => sum + (item.totalGoals || 0), 0);
          const avgGoals = (totalGoals / dataPlayer.value.length).toFixed(2);
          const maxGoals = Math.max(...dataPlayer.value.map(item => item.totalGoals || 0));

          const goalsData = [
            ['THỐNG KÊ BÀN THẮNG'],
            [],
            ['Hạng', 'Tên cầu thủ', 'Giải đấu', 'Số bàn thắng'],
            ...dataPlayer.value.map((item, index) => [
              index + 1,
              item.playerName,
              item.tournamentName,
              item.totalGoals,
            ]),
            [],
            ['', '', 'TỔNG CỘNG:', totalGoals],
            ['', '', 'TRUNG BÌNH:', avgGoals],
            ['', '', 'CAO NHẤT:', maxGoals],
          ];

          const ws1 = XLSX.utils.aoa_to_sheet(goalsData);
          ws1['!cols'] = [{ wch: 8 }, { wch: 30 }, { wch: 35 }, { wch: 15 }];
          XLSX.utils.book_append_sheet(wb, ws1, 'Bàn thắng');
        }

        // Sheet 2: Kiến tạo
        if (dataAssits.value.length > 0) {
          const totalAssists = dataAssits.value.reduce((sum, item) => sum + (item.totalAssists || 0), 0);
          const avgAssists = (totalAssists / dataAssits.value.length).toFixed(2);
          const maxAssists = Math.max(...dataAssits.value.map(item => item.totalAssists || 0));

          const assistsData = [
            ['THỐNG KÊ KIẾN TẠO'],
            [],
            ['Hạng', 'Tên cầu thủ', 'Giải đấu', 'Số kiến tạo'],
            ...dataAssits.value.map((item, index) => [
              index + 1,
              item.playerName,
              item.tournamentName,
              item.totalAssists,
            ]),
            [],
            ['', '', 'TỔNG CỘNG:', totalAssists],
            ['', '', 'TRUNG BÌNH:', avgAssists],
            ['', '', 'CAO NHẤT:', maxAssists],
          ];

          const ws2 = XLSX.utils.aoa_to_sheet(assistsData);
          ws2['!cols'] = [{ wch: 8 }, { wch: 30 }, { wch: 35 }, { wch: 15 }];
          XLSX.utils.book_append_sheet(wb, ws2, 'Kiến tạo');
        }

        // Sheet 3: Thẻ phạt
        if (dataCard.value.length > 0) {
          const totalCards = dataCard.value.reduce((sum, item) => sum + (item.yellowCards || 0), 0);
          const avgCards = (totalCards / dataCard.value.length).toFixed(2);
          const maxCards = Math.max(...dataCard.value.map(item => item.yellowCards || 0));

          const cardsData = [
            ['THỐNG KÊ THẺ PHẠT'],
            [],
            ['Hạng', 'Tên cầu thủ', 'Giải đấu', 'Số thẻ vàng'],
            ...dataCard.value.map((item, index) => [
              index + 1,
              item.playerName,
              item.tournamentName,
              item.yellowCards,
            ]),
            [],
            ['', '', 'TỔNG CỘNG:', totalCards],
            ['', '', 'TRUNG BÌNH:', avgCards],
            ['', '', 'CAO NHẤT:', maxCards],
          ];

          const ws3 = XLSX.utils.aoa_to_sheet(cardsData);
          ws3['!cols'] = [{ wch: 8 }, { wch: 30 }, { wch: 35 }, { wch: 15 }];
          XLSX.utils.book_append_sheet(wb, ws3, 'Thẻ phạt');
        }

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `Thong-ke-giai-dau_${dateStr}_${timeStr}.xlsx`;

        XLSX.writeFile(wb, filename);

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
      dataPlayer,
      dataAssits,
      dataCard,
      isLoading,
      isExporting,
      isAllEmpty,
      activeTab,
      tabs,
      getTabCount,
      exportToExcel,
    };
  },
});
</script>

<style scoped>
.backgroundPlayer {
  background-color: red;
}
.textGoal {
  /* color: var(--textPrimary); */
}
.borderPlayer {
  border: 1px solid var(--textsport);
}
.textTitlePlayer {
  color: #787676;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>