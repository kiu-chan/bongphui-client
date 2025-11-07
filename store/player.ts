import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    list_PlayerMatch: {
      url: "/players/by-match/:matchId",
      methods: "GET",
    },
  }),
  actions: {
    async fnGetPlayerMatch(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.list_PlayerMatch.url.replaceAll(":matchId", String(id))
      );
    },
  },
});
