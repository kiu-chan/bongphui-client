// store/background.ts
import { defineStore } from "pinia";

export const useBackgroundStore = defineStore("background", {
  state: () => ({
    tournament_export: {
      url: "/api/export/tournaments",
      method: "GET",
    },
  }),
  actions: {
    async fnGetTournamentExport(tournamentId: string) {
      const { $api } = useNuxtApp();
      try {
        const url = `${this.tournament_export.url}?tournamentId=${encodeURIComponent(tournamentId)}`;
        const data = await $api.get(url);
        
        // Parse response based on structure
        let tournament: any = null;
        
        if (Array.isArray(data)) {
          tournament = data.find((x: any) => String(x.id) === String(tournamentId)) || data[0] || null;
        } else if (data && typeof data === "object") {
          // Check if wrapped in data property
          if (data.data) {
            if (Array.isArray(data.data)) {
              tournament = data.data.find((x: any) => String(x.id) === String(tournamentId)) || data.data[0] || null;
            } else {
              tournament = data.data;
            }
          } else {
            tournament = data;
          }
        }
        
        if (!tournament) {
          throw new Error("Không tìm thấy dữ liệu giải đấu từ API");
        }
        
        return tournament;
      } catch (err: any) {
        console.error("fnGetTournamentExport error:", err);
        let message = "Lỗi khi tải dữ liệu giải đấu";
        if (err?.response?.data?.message) message = err.response.data.message;
        else if (err?.message) message = err.message;
        throw new Error(message);
      }
    },
  },
});