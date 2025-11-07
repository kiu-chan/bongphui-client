<template>
  <TournamentHeader :stt="2">
    <div
      style="font-size: 35px; margin-top: 30px; margin-bottom: 30px"
      class="font-medium flex justify-center"
    >
      VÒNG LOẠI TRỰC TIẾP
    </div>
    <div style="width: 100%">
      <img class="w-full h-full" :src="bangthidau" alt="" />
    </div>
  </TournamentHeader>
</template>

<script lang="ts">
import TournamentHeader from "../../../component/taogiaidau/tournamentHeader.vue";
import bangthidau from "../../../assets/img/bangthidau.png";
// import { useLeagueStore } from "../../../store/league";
interface Team {
  teamId: number;
  teamName: string;
  teamLogoUrl: string;
  points: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
interface League {
  leagueId: number;
  leagueName: string;
  tournamentId: number;
  teams: Team[];
}

export default defineComponent({
  components: {
    TournamentHeader,
  },

  setup() {
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

    return {
      players,
      bangdau,
      bangthidau,
    };
  },
});
</script>

<style scoped>
.bangxephang {
  border: 1px solid var(--textsport);
}
.rowHover:hover {
  color: var(--textsport);
}
</style>
