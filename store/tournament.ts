import { defineStore } from "pinia";

export const useTournamentStore = defineStore("taogiaidau", {
  state: () => ({
    list_tournament: {
      url: "/tournaments",
      methods: "GET",
    },

    search_tournament: {
      url: "/tournaments/search",
      methods: "GET",
    },
    add_tournament: {
      url: "/tournaments",
      methods: "POST",
    },
    listTeam_tournament: {
      url: "/tournaments/:id/teams",
      methods: "GET",
    },
    AddTeam_tournament: {
      url: "/tournaments/:tournamentId/teams",
      methods: "POST",
    },
    delTeam_tournament: {
      url: "/tournaments/:tournamentId/teams/:teamId",
      methods: "DELETE",
    },
    del_tournament: {
      url: "/tournaments/:id",
      methods: "DELETE",
    },
    detail_tournament: {
      url: "/tournaments/:id",
      methods: "GET",
    },
    update_tournament: {
      url: "/tournaments/:id",
      methods: "PUT",
    },
    create_league: {
      url: "/tournaments/:tournamentId/create-leagues/batch",
      methods: "POST",
    },
    batch_team: {
      url: "/tournaments/:tournamentId/teams/batch",
      methods: "POST",
    },
    league_tournament: {
      url: "/leagues/tournament/:tournamentId",
      methods: "GET",
    },
    league_matches: {
      url: "/tournaments/tournaments/:id/matches",
      methods: "GET",
    },
    add_matchesLeague: {
      url: "/tournaments/:id/generate-matches",
      methods: "POST",
    },
    listOnGoing: {
      url: "/tournaments/ongoing",
      methods: "GET",
    },
    listFeartured: {
      url: "/tournaments/featured",
      methods: "GET",
    },
    listUpcoming: {
      url: "/tournaments/upcoming",
      methods: "GET",
    },
    listCompleted: {
      url: "/tournaments/completed",
      methods: "GET",
    },

    // fees endpoints
    fees_tournament: {
      url: "/fees/tournament/:tournamentId",
      methods: "GET",
    },
    fees_balance: {
      url: "/fees/tournament/:tournamentId/balance",
      methods: "GET",
    },
    create_fee: {
      url: "/fees",
      methods: "POST",
    },
  }),
  actions: {
    async fnGetTournament(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.list_tournament.url}${url}`);
    },
    async fnGetOngoing(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.listOnGoing.url}${url}`);
    },
    async fnGetFeartured(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.listFeartured.url}${url}`);
    },
    async fnGetUpcoming(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.listUpcoming.url}${url}`);
    },
    async fnGetCompleted(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.listCompleted.url}${url}`);
    },

    // fees: list for tournament (GET /api/fees/tournament/{id})
    async fnGetFeesTournament(tournamentId: string | number) {
      const { $api } = useNuxtApp();
      const url = this.fees_tournament.url.replaceAll(":tournamentId", String(tournamentId));
      return await $api.get(url);
    },

    // balance: GET /api/fees/tournament/{id}/balance
    async fnGetFeesBalance(tournamentId: string | number) {
      const { $api } = useNuxtApp();
      const url = this.fees_balance.url.replaceAll(":tournamentId", String(tournamentId));
      return await $api.get(url);
    },

    // create fee: POST /api/fees
    async fnCreateFee(payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(this.create_fee.url, payload);
    },

    async fnGetTeamsTournament(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.listTeam_tournament.url.replaceAll(":id", String(id))
      );
    },
    async fnGetTournamentSearch(url: any) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.search_tournament.url}${url}`);
    },
    async fnGetLeagueMatches(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.league_matches.url.replaceAll(":id", String(id))
      );
    },
    async fnAddTournament(payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(this.add_tournament.url, payload);
    },
    async fnCreatedLeague(id: any, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(
        this.create_league.url.replaceAll(":tournamentId", String(id)),
        payload
      );
    },
    async fnAddBatchTeam(id: any, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(
        this.batch_team.url.replaceAll(":tournamentId", String(id)),
        payload
      );
    },
    async fnAddTeamsTournament(id: any, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(
        this.AddTeam_tournament.url.replaceAll(":tournamentId", String(id)),
        payload
      );
    },
    async fnDelTeamTournament(idTeam: any, idTour: any) {
      const { $api } = useNuxtApp();
      const url = this.delTeam_tournament.url
        .replace(":tournamentId", String(idTour))
        .replace(":teamId", String(idTeam));
      return await $api.delete(url);
    },
    async fnDelTournament(id: number) {
      const { $api } = useNuxtApp();
      return await $api.delete(
        this.del_tournament.url.replaceAll(":id", String(id))
      );
    },
    async fnAddLeagueMatches(id: any) {
      const { $api } = useNuxtApp();
      return await $api.post(
        this.add_matchesLeague.url.replaceAll(":id", String(id))
      );
    },
  },
});