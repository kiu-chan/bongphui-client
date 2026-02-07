// composables/background/useBackgroundData.ts
import { ref, reactive } from 'vue';
import { useBackgroundStore } from '~/store/background';

const fallbackSvgDataUri =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#374151"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="2">No Image</text>
    </svg>`
  );

export function useBackgroundData() {
  const backgroundStore = useBackgroundStore();
  
  const loading = ref(true);
  const error = ref<string | null>(null);
  const tournament = ref<any | null>(null);
  const teams = ref<Array<{ name: string; logoEmbedded: string }>>([]);

  const positions = reactive<Record<string, { x: number; y: number }>>({
    organizer: { x: 0, y: 0 },
    center: { x: 0, y: 0 },
    teamsGroup: { x: 0, y: 0 },
  });

  const editableTexts = reactive<Record<string, string>>({
    title: "Tên Giải đấu",
    subtitle: "",
    organizerText: "ĐƠN VỊ TỔ CHỨC",
  });

  const editingState = reactive<Record<string, boolean>>({});

  // Helper: fetch remote images and convert to data URL
  async function fetchImageAsDataUrl(url?: string | null, timeoutMs = 9000): Promise<string> {
    if (!url) return fallbackSvgDataUri;
    const u = String(url).trim();
    if (u.startsWith("data:")) return u;
    
    try {
      const controller = new AbortController();
      const idTimeout = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(u, { mode: "cors", signal: controller.signal });
      clearTimeout(idTimeout);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => {
          reader.abort();
          reject(new Error("FileReader error"));
        };
        reader.onload = () => {
          const r = reader.result as string | null;
          if (!r) reject(new Error("Empty result from FileReader"));
          else resolve(r);
        };
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.warn("fetchImageAsDataUrl failed for", url, err);
      return fallbackSvgDataUri;
    }
  }

  // Embed tournament & team logos as data URLs
  async function embedAllImages(t: any, bgImg: string) {
    // Embed tournament logo
    t.logoEmbedded = await fetchImageAsDataUrl(t.logoUrl);
    
    const list: Array<{ name: string; logoEmbedded: string }> = [];
    
    // Embed team logos
    if (Array.isArray(t.teams)) {
      const ps = t.teams.map(async (tm: any) => {
        const name = tm.name ?? "Đội bóng";
        const logoEmbedded = await fetchImageAsDataUrl(tm.logoUrl);
        return { name, logoEmbedded };
      });
      const resolved = await Promise.all(ps);
      for (const r of resolved) list.push(r);
    }

    // Embed background image
    const bgEmbedded = await fetchImageAsDataUrl(bgImg);

    // Set editable texts
    editableTexts.title = t.tournamentName || t.name || editableTexts.title;
    editableTexts.subtitle = (t.location ? t.location : "") + (t.startDate ? " " + t.startDate : "");
    editableTexts.organizerText = editableTexts.organizerText || "ĐƠN VỊ TỔ CHỨC";

    // Set team names and positions
    list.forEach((tm, i) => {
      editableTexts[`team-${i}`] = tm.name || `Đội ${i + 1}`;
      if (!positions[`team-${i}`]) positions[`team-${i}`] = { x: 0, y: 0 };
    });

    teams.value = list;
    return { tournamentWithLogo: t, teamList: list, bgEmbedded };
  }

  // Fetch tournament data using store
  async function fetchTournament(tournamentId: string, bgImg: string) {
    loading.value = true;
    error.value = null;
    tournament.value = null;
    teams.value = [];
    
    try {
      // Use store action instead of direct fetch
      const t = await backgroundStore.fnGetTournamentExport(tournamentId);
      
      if (!t) {
        throw new Error("Không tìm thấy dữ liệu từ API");
      }
      
      const result = await embedAllImages(t, bgImg);
      tournament.value = t;
      return result.bgEmbedded;
    } catch (err: any) {
      console.error("fetchTournament error:", err);
      error.value = err?.message ? String(err.message) : String(err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Add team
  function addTeam() {
    const idx = teams.value.length;
    const name = `Đội ${idx + 1}`;
    teams.value.push({ name, logoEmbedded: fallbackSvgDataUri });
    editableTexts[`team-${idx}`] = name;
    positions[`team-${idx}`] = { x: 0, y: 0 };
  }

  // Remove team by index
  function removeTeamByIndex(idx: number) {
    if (idx < 0 || idx >= teams.value.length) return;
    const oldTeams = teams.value.slice();
    oldTeams.splice(idx, 1);
    teams.value = oldTeams;

    // Rebuild positions for team-*
    Object.keys(positions).forEach((k) => {
      if (k.startsWith("team-")) delete positions[k];
    });
    for (let i = 0; i < teams.value.length; i++) {
      positions[`team-${i}`] = { x: 0, y: 0 };
    }

    // Rebuild editableTexts team entries
    Object.keys(editableTexts).forEach((k) => {
      if (k.startsWith("team-")) delete editableTexts[k];
    });
    teams.value.forEach((tm, i) => {
      editableTexts[`team-${i}`] = tm.name || `Đội ${i + 1}`;
    });
  }

  // Reset all positions
  function resetAllPositions() {
    Object.keys(positions).forEach((k) => {
      positions[k].x = 0;
      positions[k].y = 0;
    });
  }

  return {
    loading,
    error,
    tournament,
    teams,
    positions,
    editableTexts,
    editingState,
    fallbackSvgDataUri,
    fetchTournament,
    addTeam,
    removeTeamByIndex,
    resetAllPositions,
  };
}