<template>
  <HeaderDoibong :stt="5">
    <!-- Controls Bar -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 mb-6">
      <!-- Search -->
      <div class="search w-full md:max-w-[409px] h-[50px] rounded-2xl relative order-2 md:order-2">
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

      <!-- Add Member Button -->
      <button
        class="w-full md:w-auto order-1 md:order-1 px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
      >
        <Icon name="mdi:account-plus" class="text-[24px]" />
        Thêm thành viên
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
            <th class="px-4 py-2 rounded-tr-lg rounded-br-lg text-white">Thao tác</th>
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
              <div class="flex justify-center gap-2">
                <button
                  class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-all"
                  title="Chỉnh sửa"
                >
                  <Icon
                    name="solar:pen-bold"
                    width="18"
                    height="18"
                    class="text-green-600"
                  />
                </button>
                <button
                  @click="fnDel(item.playerId)"
                  class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-all"
                  title="Xóa khỏi đội"
                >
                  <Icon
                    name="material-symbols:delete-outline"
                    width="18"
                    height="18"
                    class="text-red-600"
                  />
                </button>
              </div>
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
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-all active:scale-95"
              title="Chỉnh sửa"
            >
              <Icon
                name="solar:pen-bold"
                width="20"
                height="20"
                class="text-green-600"
              />
            </button>
            <button
              @click="fnDel(item.playerId)"
              class="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-all active:scale-95"
              title="Xóa"
            >
              <Icon
                name="material-symbols:delete-outline"
                width="20"
                height="20"
                class="text-red-600"
              />
            </button>
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

    <!-- Alert Dialog -->
    <AlertMessage
      :open="openDel"
      :title="'Xác nhận xóa thành viên'"
      :alertmsg="`Bạn có chắc chắn muốn xóa thành viên này khỏi đội?`"
      @success="fnDelPlayer()"
      @toggle="openDel = false"
    />
  </HeaderDoibong>
</template>

<script lang="ts">
import HeaderDoibong from "../../../component/detaildoibong/index.vue";
import { useTeamStore } from "../../../store/team";
import AlertMessage from "../../../component/library/alertMessage/index.vue";

export default defineComponent({
  components: {
    HeaderDoibong,
    AlertMessage,
  },
  setup() {
    const TeamStore = useTeamStore();
    const listPlayer: Ref<any[]> = ref([]);
    const route = useRoute();
    const toast = useToast();
    const openDel: Ref<boolean> = ref(false);
    const loading = ref(false);
    const idParams = route.params.teamId;
    const playerId: Ref<number | undefined> = ref();
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const keyword: Ref<string> = ref("");

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

    const fnDel = (item: number) => {
      openDel.value = true;
      playerId.value = item;
    };

    const fnDelPlayer = () => {
      const params = [];
      if (idParams && playerId.value) {
        params.push(`playerId=${playerId.value}`);
        params.push(`teamId=${idParams}`);
      }

      const url = params.length > 0 ? `?${params.join("&")}` : "";
      TeamStore.fnDelTeam(url)
        .then((res) => {
          toast.success({
            message: res || "Đã xóa thành viên khỏi đội thành công!",
            position: "topRight",
          });
          openDel.value = false;
          fnGetListPlayer();
        })
        .catch((err) => {
          toast.error({
            message: err || "Có lỗi xảy ra, vui lòng thử lại",
            position: "topRight",
          });
        });
    };

    return {
      openDel,
      listPlayer,
      offset,
      keyword,
      fnDel,
      fnDelPlayer,
      loading,
      limit,
      displayPages,
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
</style>