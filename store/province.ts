import { defineStore } from "pinia";

export const useProvinceStore = defineStore("province", {
  state: () => ({
    getProvince: {
      url: "/api/provinces/provinces",
      methods: "GET",
    },
    getProvinceWar: {
      url: "/api/provinces/wards/:id",
    },
  }),
  actions: {
    async fnGetProvince() {
      const { $api } = useNuxtApp();
      return await $api.get(this.getProvince.url);
    },
    async fnGetProvinceWar(id: any) {
      const { $api } = useNuxtApp();
      return await $api.get(this.getProvinceWar.url.replaceAll(":id", id));
    },
  },
});
