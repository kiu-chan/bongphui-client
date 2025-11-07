import { defineStore } from "pinia";

export const useMatchStore = defineStore("Match", {
  state: () => ({
    match_score: {
      url: "/matches/:id/scores",
      methods: "PUT",
    },
    match_status: {
      url: "/matches/:id/status",
      methods: "PUT",
    },
    match_player: {
      url: "/matches/:matchId/player/:playerId/statistic",
      methods: "GET",
    },
    player_Manager: {
      url: "/matches/:id/players",
      methods: "GET",
    },
    match_UpdatePlayer: {
      url: "/matches/:matchId/player/player/update-statistic",
      methods: "PUT",
    },
    match_update: {
      url: "/matches/:id/update",
      methods: "PUT",
    },
    match_new: {
      url: "/matches/newest",
      methods: "GET",
    },
    matches_newTeam: {
      url: "/matches/team/:teamId/newest",
      methods: "GET",
    },
    matches_Schedule: {
      url: "/matches/:id/schedule",
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
    async fnUpdateMatches(id: any, payload: any) {
      const { $api } = useNuxtApp();
      const url = this.match_UpdatePlayer.url.replace(":matchId", String(id));
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
