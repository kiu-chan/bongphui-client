<template>
  <div class="p-4 rounded-lg shadow">
    <table class="w-full text-sm text-left rounded-lg">
      <thead class="">
        <tr>
          <th rowspan="2" class="px-6 py-3">#</th>
          <th rowspan="2" class="px-6 py-3 text-xl">Đội</th>
          <th rowspan="2" class="px-6 py-3 text-center">
            <span class="text-green-600 font-bold">T</span> -
            <span class="text-blue-600 font-bold">H</span> -
            <span class="text-red-600 font-bold">B</span>
          </th>
          <th colspan="2" class="px-6 py-3 text-center">Bàn Thắng</th>
          <th colspan="2" class="px-6 py-3 text-center">Bàn Thua</th>
          <th colspan="2" class="px-6 py-3 text-center">Phản Lưới Nhà</th>
          <th colspan="2" class="px-6 py-3 text-center">Thẻ Vàng</th>
          <th colspan="2" class="px-6 py-3 text-center">Thẻ Đỏ</th>
          <th rowspan="2" class="px-6 py-3 text-center">Tham Gia</th>
        </tr>
        <tr class="col-slpt2">
          <th>Số lượng</th>
          <th>%</th>
          <th>Số lượng</th>
          <th>%</th>
          <th>Số lượng</th>
          <th>%</th>
          <th>Số lượng</th>
          <th>%</th>
          <th>Số lượng</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-6 py-3 font-semibold">1</td>
          <td class="px-6 py-3 text-center gap-2">Thiên Khôi FC</td>
          <td class="px-6 py-3 text-center">0 - 0- 0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center font-bold">0</td>
        </tr>
        <tr>
          <td class="px-6 py-3 font-semibold">2</td>
          <td class="px-6 py-3 text-center gap-2">SHB FC</td>
          <td class="px-6 py-3 text-center">0 - 0- 0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center font-bold">0</td>
        </tr>
        <tr>
          <td class="px-6 py-3 font-semibold">3</td>
          <td class="px-6 py-3 text-center gap-2">HG La Giang</td>
          <td class="px-6 py-3 text-center">0 - 0- 0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center font-bold">0</td>
        </tr>
        <tr>
          <td class="px-6 py-3 font-semibold">4</td>
          <td class="px-6 py-3 text-center gap-2">TIG FC</td>
          <td class="px-6 py-3 text-center">0 - 0- 0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center">0</td>
          <td class="px-6 py-3 text-center font-bold">0</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useImportStore } from "../../store/import";
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const { id } = toRefs(props);
    const ImportStore = useImportStore();
    onMounted(() => {
      fnListTk();
    });
    const fnListTk = () => {
      ImportStore.fnGetImportTournament(id.value)
        .then((res: any) => {})
        .catch((err) => {
          console.log(err);
        });
    };
  },
});
</script>

<style scoped>
th,
td {
  padding: 20px 20px;
  text-align: center;
}
table,
th,
td {
  border: 1px solid var(--textsport4);
  border-collapse: collapse;
}
</style>
