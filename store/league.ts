import { defineStore } from "pinia";

export const useLeagueStore = defineStore("League", {
  state: () => ({
    list_league: {
      url: "/leagues/tournament/:tournamentId",
      methods: "GET",
    },
    list_leagueMatchs: {
      url: "/leagues/:id/matches",
      methods: "GET",
    },
  }),
  actions: {
    async fnGetLeague(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.list_league.url.replaceAll(":tournamentId", String(id))
      );
    },
    async fnGetLeagueMatches(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.list_leagueMatchs.url.replaceAll(":id", String(id))
      );
    },
  },
});
