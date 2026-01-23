import { defineStore } from "pinia";

export const useNewStore = defineStore("Import", {
  state: () => ({
    getNew: {
      url: "/api/news",
      methods: "POST",
    },
    getNewHighlight: {
      url: "/api/news/highlights",
      methods: "GET",
    },
    getNewDetail: {
      url: "/api/news/detail/:id",
      methods: "GET",
    },
  }),
  actions: {
    async fnGetNew() {
      const { $api } = useNuxtApp();
      return await $api.get(this.getNew.url);
    },
    async fnGetNewHightlight() {
      const { $api } = useNuxtApp();
      return await $api.get(this.getNewHighlight.url);
    },
    async fnGetDetail(id: string) {
      const { $api } = useNuxtApp();
      return await $api.get(
        this.getNewDetail.url.replaceAll(":id", String(id))
      );
    },
  },
});
