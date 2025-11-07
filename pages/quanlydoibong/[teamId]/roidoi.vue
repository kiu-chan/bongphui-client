<template>
  <HeaderDoibong :stt="2">
    <div class="flex justify-end mt-[28px] mb-[28px] gap-4">
      <div
        style="
          width: 213px;
          height: 50px;
          border: 1px solid rgba(4, 184, 10, 1);
          color: rgba(4, 184, 10, 1);
          border-radius: 10px;
        "
        class="flex justify-center items-center font-medium text-[20px]"
      >
        Thêm thành viên
      </div>
      <div class="search max-w-[409px] h-[50px] rounded-2xl relative">
        <input
          class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]"
          type="text"
          placeholder="Tìm kiếm"
          v-model="keyword"
        />
        <Icon
          class="absolute IconSearch"
          name="hugeicons:search-02"
          width="24"
          height="24"
        />
      </div>
    </div>
    <div
      style="
        overflow-x: auto;
        background: rgba(250, 249, 249, 1);
        padding: 12px;
      "
      class="w-full rounded-lg overflow-hidden"
    >
      <table
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
            <th class="px-4 py-2 text-white">Họ tên</th>
            <th class="px-4 py-2 text-white">Ngày sinh</th>
            <th class="px-4 py-2 text-white">Số điện thoại</th>
            <th class="px-4 py-2 text-white">Email</th>
            <th class="px-4 py-2 text-white">Ngày vào đội</th>
            <th class="px-4 py-2 rounded-tr-lg rounded-br-lg text-white">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in listPlayer"
            :key="index"
            class="hover:bg-gray-100 rowHover transition-colors"
          >
            <td
              class="px-4 py-4 w-12 sticky left-0 font-semibold z-10 lg:static lg:left-auto lg:z-auto"
            >
              {{ index + 1 }}
            </td>
            <td
              class="px-4 py-4 w-48 sticky left-12 flex items-center gap-2 z-10 lg:static lg:left-auto lg:z-auto"
            >
              {{ item.name }}
            </td>
            <td class="px-4 py-4">{{ item.birthdate }}</td>
            <td class="px-4 py-4">{{ item.phone }}</td>
            <td class="px-4 py-4">{{ item.email }}</td>
            <td class="px-4 py-4 font-bold">
              {{ item.dateJoin }}
            </td>
            <td class="px-4 py-4 flex justify-center gap-2">
              <div
                style="
                  width: 26px;
                  height: 26px;
                  border-radius: 26px;
                  background: rgba(4, 184, 10, 0.18);
                "
                class="flex justify-center items-center"
              >
                <Icon
                  name="solar:pen-bold"
                  width="24"
                  height="24"
                  style="color: #3cc718"
                />
              </div>
              <div
                class="flex justify-center items-center"
                style="
                  width: 26px;
                  height: 26px;
                  border-radius: 26px;
                  background: rgba(238, 52, 73, 0.12);
                "
              >
                <Icon
                  name="material-symbols:delete-outline"
                  width="24"
                  height="24"
                  style="color: #c71838"
                  @click="fnDel(item.playerId)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-[40px] mb-[40px]">
      <div class="flex justify-between gap-4 items-center">
        <div
          class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
          style="
            border: 1.5px solid rgba(247, 163, 39, 1);
            color: rgba(247, 163, 39, 1);
          "
          @click="offset > 1 ? offset-- : offset"
        >
          <Icon
            class="text-[20px]"
            name="ci:chevron-left"
            width="40"
            height="40"
          />
        </div>
        <div class="flex gap-2">
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
          <Icon
            class="dotCirCle"
            name="octicon:dot-fill-16"
            width="16"
            height="16"
          />
        </div>
        <div
          class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
          style="
            background-color: rgba(247, 163, 39, 1);
            color: rgba(255, 255, 255, 1);
          "
          @click="offset++"
        >
          <Icon
            class="text-[20px]"
            name="ci:chevron-right"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
    <AlertMessage
      :open="openDel"
      :title="'Rời đội'"
      :alertmsg="'bạn có chắc chắn muốn rời đội chứ'"
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
    const idParams = route.params.teamId;
    const playerId: Ref<number | undefined> = ref();
    const limit = 10;
    const offset: Ref<number> = ref(1);
    const keyword: Ref<string> = ref("");
    onMounted(() => {
      fnGetListPlayer();
    });
    watch([offset, keyword], (_new) => {
      if (_new) {
        fnGetListPlayer();
      }
    });
    const fnGetListPlayer = () => {
      const params = [
        keyword.value.toString() && `keyword=${keyword.value}`,
        idParams && `teamId=${idParams}`,
        limit && `limit=${limit}`,
        offset.value && `offset=${offset.value}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      TeamStore.fnGetListPlayer(idParams, url)
        .then((res) => {
          listPlayer.value = res;
        })
        .catch((err) => {
          console.log(err);
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
            message: res,
            position: "topRight",
          });
          openDel.value = false;
          fnGetListPlayer();
        })
        .catch((err) => {
          toast.error({
            message: err,
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
    };
  },
});
</script>
<style scoped>
th {
  font-weight: 500;
  font-size: 16px;
}
td {
  font-weight: 500;
  font-size: 16px;
}
</style>
