import { defineStore } from "pinia";

export const useNewStore = defineStore("Import", {
  state: () => ({
    getNew: {
      url: "/news",
      methods: "POST",
    },
    getNewHighlight: {
      url: "/news/highlights",
      methods: "GET",
    },
    getNewDetail: {
      url: "/news/detail/:id",
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
