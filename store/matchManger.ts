import { defineStore } from "pinia";

export const useMatchStore = defineStore("Match", {
  state: () => ({
    match_score: {
      url: "/api/matches/scores/:id",
      methods: "PUT",
    },
    match_status: {
      url: "/api/matches/status/:id",
      methods: "PUT",
    },
    match_player: {
      url: "/api/matches/:matchId/player/:playerId/statistic",
      methods: "GET",
    },
    player_Manager: {
      url: "/api/matches/players/:id",
      methods: "GET",
    },
    match_UpdatePlayer: {
      url: "/api/matches/:matchId/player/player/update-statistic",
      methods: "PUT",
    },
    match_update: {
      url: "/api/matches/update/:id",
      methods: "PUT",
    },
    match_new: {
      url: "/api/matches/newest",
      methods: "GET",
    },
    matches_newTeam: {
      url: "/api/matches/team/newest/:teamId",
      methods: "GET",
    },
    matches_Schedule: {
      url: "/api/matches/schedule/:id",
      method: "GET",
    },
    matches_detail: {
      url: "/api/matches/:id",
      method: "GET",
    },
  }),
  actions: {
    async fnUpdateMatchScore(id: number, payload: any) {
      const { $api } = useNuxtApp();
      return await $api.put(
        this.match_score.url.replaceAll(":id", String(id)),
        payload
      );
    },
    async fnMatchDetail(id: number) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.matches_detail.url.replaceAll(":id", String(id))
      );
    },
    async fnUpdateMatches(id: any, payload: any) {
      const { $api } = useNuxtApp();
      const url = this.match_UpdatePlayer.url.replace(":matchId", String(id));
      return await $api.put(url, payload);
    },
    async fnUpdateMatchesTeam(id: any, payload: any) {
      const { $api } = useNuxtApp();
      const url = this.match_update.url.replace(":id", String(id));
      return await $api.put(url, payload);
    },
    async fnUpdateMatchStatus(id: number, url: string) {
      const { $api } = useNuxtApp();
      return await $api.put(
        `${this.match_status.url.replaceAll(":id", String(id))}${url}`
      );
    },
    async fnGetPlayer(matchId: any, playerId: any) {
      const { $api } = useNuxtApp();
      const url = this.match_player.url
        .replace(":matchId", String(matchId))
        .replace(":playerId", String(playerId));
      return await $api.get(url);
    },
    async fnUpdatePlayer(matchId: any, playerId: any, payload: any) {
      const { $api } = useNuxtApp();
      const url = this.match_UpdatePlayer.url
        .replace(":matchId", String(matchId))
        .replace(":playerId", String(playerId));
      return await $api.put(url, payload);
    },
    async fnGetPlayerManger(id: number) {
      const { $api } = useNuxtApp();
      const url = this.player_Manager.url.replace(":id", String(id));
      return await $api.get(url);
    },
    async fnGetMatchNew() {
      const { $api } = useNuxtApp();
      const url = this.match_new.url;
      return await $api.get(url);
    },
    async fnGetMatchNewTeam(id: any) {
      const { $api } = useNuxtApp();
      const url = this.match_player.url.replace(":teamId", String(id));
      return await $api.get(url);
    },
    async fnGetMatchNewEst(id: any, url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        `${this.matches_newTeam.url.replaceAll(":teamId", String(id))}${url}`
      );
    },
    async fnGetMatchSchedule(id: any) {
      const { $api } = useNuxtApp();
      const url = this.matches_Schedule.url.replace(":id", String(id));
      return await $api.get(url);
    },
  },
});
