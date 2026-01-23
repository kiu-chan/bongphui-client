import { defineStore } from "pinia";

export const useImportStore = defineStore("Import", {
  state: () => ({
    import_logoTeam: {
      url: "/api/import/upload-image",
      methods: "POST",
    },
    import_Team: {
      url: "/api/import/import-players",
      methods: "POST",
    },
    import_tkgoals: {
      url: "/api/import/statistics/tournament/:tournamentId/goals",
      methods: "GET",
    },
    import_tkassists: {
      url: "/api/import/statistics/tournament/:tournamentId/assists",
      methods: "GET",
    },
    import_tkcard: {
      url: "/api/import/statistics/tournament/:tournamentId/card",
      methods: "GET",
    },
    import_TournamentFile: {
      url: "/api/import/upload-excel",
      methods: "POST",
    },
  }),
  actions: {
    async fnAddImportLogoTeam(str: string, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(`${this.import_logoTeam.url}${str}`, payload);
    },
    async fnAddImportTeam(str: string, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(`${this.import_Team.url}${str}`, payload);
    },
    async fnAddImportFile(str: string, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(
        `${this.import_TournamentFile.url}${str}`,
        payload
      );
    },
    async fnGetImportTournament(id: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.import_tkgoals.url.replaceAll(":tournamentId", String(id))
      );
    },
    async fnGetImportTournamentCard(id: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.import_tkcard.url.replaceAll(":tournamentId", String(id))
      );
    },
    async fnGetImportTournamentAssists(id: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.import_tkassists.url.replaceAll(":tournamentId", String(id))
      );
    },
  },
});
