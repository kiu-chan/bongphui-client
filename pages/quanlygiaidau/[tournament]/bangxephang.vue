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
    <div>
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
              <th class="px-4 py-2 text-white">Tên đội</th>
              <th class="px-4 py-2 text-white">Trận</th>
              <th class="px-4 py-2 text-white">Thắng</th>
              <th class="px-4 py-2 text-white">Hòa</th>
              <th class="px-4 py-2 text-white">Thua</th>
              <th class="px-4 py-2 text-white">Hiệu số</th>
              <th class="px-4 py-2 text-white">Điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item2, index) in item.teams"
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
                {{ item2.teamName }}
              </td>
              <td class="px-4 py-4">{{ item2.matchesPlayed }}</td>
              <td class="px-4 py-4">{{ item2.wins }}</td>
              <td class="px-4 py-4">{{ item.draws }}</td>
              <td class="px-4 py-4 font-bold">
                {{ item2.losses }}
              </td>
              <td class="px-4 py-4 font-bold">10</td>
              <td class="px-4 py-4">{{ item2.points }}</td>
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

export default defineComponent({
  components: {
    TournamentHeader,
  },

  setup() {
    const route = useRoute();
    const id = route.params.tournament;
    const LeagueStore = useLeagueStore();
    const dataLeague: Ref<any[]> = ref([]);
    onMounted(() => {
      fnGetListLeguage();
    });
    const bangdau = [
      {
        id: 1,
        tenbang: "BẢNG A",
      },
      {
        id: 2,
        tenbang: "BẢNG B",
      },
      {
        id: 3,
        tenbang: "BẢNG C",
      },
      {
        id: 4,
        tenbang: "BẢNG D",
      },
    ];

    const players = [
      {
        stt: 1,
        tenDoi: "Team A",
        tran: 3,
        thang: 3,
        hoa: 0,
        thua: 0,
        hieuSo: "+10",
        diem: 9,
      },
      {
        stt: 2,
        tenDoi: "Team B",
        tran: 3,
        thang: 2,
        hoa: 1,
        thua: 0,
        hieuSo: "+5",
        diem: 7,
      },
      {
        stt: 3,
        tenDoi: "Team C",
        tran: 3,
        thang: 1,
        hoa: 1,
        thua: 1,
        hieuSo: "+1",
        diem: 3,
      },
      {
        stt: 4,
        tenDoi: "Team D",
        tran: 3,
        thang: 0,
        hoa: 0,
        thua: 3,
        hieuSo: "-10",
        diem: 0,
      },
    ];
    const fnGetListLeguage = () => {
      LeagueStore.fnGetLeague(id)
        .then((res) => {
          dataLeague.value = res;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    };
    return {
      dataLeague,
      bangdau,
      players,
      fnGetListLeguage,
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
</style>
