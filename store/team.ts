import { defineStore } from "pinia";
import type { TeamType } from "../types/team";

export const useTeamStore = defineStore("Teams", {
  state: () => ({
    listPlayer: {
      url: "/teams/:teamId/players",
      methods: "GET",
    },
    list_team: {
      url: "/teams",
      methods: "GET",
    },
    list_teamName: {
      url: "/teams/names",
      methods: "GET",
    },
    add_team: {
      url: "/teams",
      methods: "POST",
    },
    del_team: {
      url: "/teams/:id",
      methods: "DELETE",
    },
    detail_team: {
      url: "/teams/:id",
      methods: "GET",
    },
    update_team: {
      url: "/teams/:id",
      methods: "PUT",
    },
    listLineup: {
      url: "/teams/:id/lineup",
      methods: "GET",
    },
    swapLineup: {
      url: "/teams/swap-position",
      methods: "POST",
    },
    filterTeam: {
      url: "/teams/filter",
      methods: "GET",
    },
    leaveTeam: {
      url: "/teams/leave",
      method: "POST",
    },
  }),
  actions: {
    async fnGetListPlayer(id: number, url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        `${this.listPlayer.url.replaceAll(":teamId", id)}${url}`
      );
    },
    async fnGetTeam(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.list_team.url}${url}`);
    },
    async fnGetTeamfilter(url: string) {
      const { $api } = useNuxtApp();
      return await $api.get(`${this.filterTeam.url}${url}`);
    },
    async fnGetTeamlineUp(id: number) {
      const { $api } = useNuxtApp();
      return await $api.get(this.listLineup.url.replaceAll(":id", String(id)));
    },
    async fnGetTeamName() {
      const { $api } = useNuxtApp();
      return await $api.get(this.list_teamName.url);
    },
    async fnAddTeam(payload: any) {
      const { $api } = useNuxtApp();
      return await $api.post(this.add_team.url, payload);
    },
    async fnDetailTeam(id: number) {
      const { $api } = useNuxtApp();

      return await $api.get(this.detail_team.url.replaceAll(":id", String(id)));
    },
    async fnSwaplineUp(url: string) {
      const { $api } = useNuxtApp();
      return await $api.post(`${this.swapLineup.url}${url}`);
    },
    async fnDelTeam(url: string) {
      const { $api } = useNuxtApp();
      return await $api.post(`${this.leaveTeam.url}${url}`);
    },
  },
});
