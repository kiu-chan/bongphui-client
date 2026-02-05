<template>
  <popUpModal
    :open="openPopup"
    :width="1200"
    :height="700"
    :title="'Thêm đội trong hệ thống'"
    @toggle="$emit('toggle')"
    @success="fnAddBatchTeams"
  >
    <div
      style="overflow: auto"
      :style="{
        height: 550 + 'px',
      }"
    >
      <div class="p-5 max-h-[60vh] grid grid-cols-1 gap-8">
        <inputNebula
          :placeholder="'tìm kiếm'"
          :name="'Tìm kiếm đội bóng'"
          v-model="keyword"
        />
      </div>
      <div
        class="app-container container place-items-center mx-auto mt-[58px] px-4 sm:px-6 md:mt-16 grid w-full gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div v-for="(item, index) in listData" :key="index" class="cardGiaidau w-full">
          <div
            class="cardAbsolute flex flex-col relative justify-between items-center p-[16px]"
          >
            <input
              type="checkbox"
              :value="item.id"
              v-model="selectedIds"
              class="checkbox absolute top-[20px] left-[10px] w-[18px] h-[18px]"
            />
            <div class="max-w-[110px] h-[130px]">
              <img 
                class="w-full h-full object-contain" 
                :src="item?.logoUrl || '/img/imglg.png'" 
                alt="" 
                @error="$event.target.src = '/img/imglg.png'"
              />
            </div>
            <div class="text-center">
              <h2 style="width: 160px" class="font-medium text-[18px] mx-auto">
                {{ item.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popUpModal>
</template>

<script lang="ts">
import popUpModal from "../../library/popupModal/index.vue";
import inputNebula from "../../library/input/index.vue";
import { useTournamentStore } from "~/store/tournament";
import { useTeamStore } from "../../../store/team";
export default defineComponent({
  components: {
    popUpModal,
    inputNebula,
  },
  props: {
    openPopup: {
      type: Boolean,
      required: true,
    },
    lstTeam: {
      type: Array as PropType<Array<{ id: number; name: string }>>,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, id } = toRefs(props);
    const TournamentStore = useTournamentStore();
    const TeamStore = useTeamStore();
    const name: Ref<string> = ref("");
    const selectedIds = ref<number[]>([]);
    const listData: Ref<any[]> = ref([]);
    const toast = useToast();
    const keyword: Ref<string> = ref("");
    watch(openPopup, (_new) => {
      if (_new) {
        fnReset();
        fnGetFillteam();
      }
    });
    watch(keyword, (_new) => {
      if (_new) {
        fnGetFillteam();
      }
    });

    const fnGetFillteam = () => {
      const params = [];
      if (keyword.value) {
        params.push(`keyword=${keyword.value}`);
      }
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      TeamStore.fnGetTeamfilter(url)
        .then((res) => {
          listData.value = res;
        })
        .catch((err) => {
          console.log(err, "chính");
        });
    };
    const fnAddBatchTeams = () => {
      TournamentStore.fnAddBatchTeam(id.value, selectedIds.value)
        .then((res: any) => {
          toast.success({
            message: res,
            position: "topRight",
          });
          ctx.emit("toggle");
          ctx.emit("success");
        })
        .catch((err) => {
          toast.error({
            message: err,
            position: "topRight",
          });
        });
    };
    const fnReset = () => {
      name.value = "";
      selectedIds.value = [];
    };
    return {
      keyword,
      name,
      selectedIds,
      listData,
      fnAddBatchTeams,
    };
  },
});
</script>
<style scoped>
/* Thu nhỏ card để vừa hàng - GIỐNG TRANG ĐỘI BÓNG */
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

.cardGiaidau:hover {
  background: linear-gradient(
    180deg,
    #f17a3c 0%,
    #131b77 100%
  ); /* border gradient */
}

.cardGiaidau-noclick {
  background: linear-gradient(
    180deg,
    #b0aeac 0%,
    #b1aeac 100%
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

.cardAbsolute-noclick {
  background: linear-gradient(180deg, #fffefe 0%, #eeeae8 100%);
}
</style>