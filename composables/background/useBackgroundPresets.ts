// composables/background/useBackgroundPresets.ts
import { ref } from 'vue';

export function useBackgroundPresets() {
  const presetsKey = "tournament_bg_presets";
  const presetsList = ref<any[]>([]);
  const presetName = ref("");
  const selectedPreset = ref("");

  function refreshPresets() {
    try {
      const raw = localStorage.getItem(presetsKey);
      presetsList.value = raw ? JSON.parse(raw) : [];
    } catch {
      presetsList.value = [];
    }
  }

  function savePreset(state: any, name?: string) {
    const useName = name || presetName.value;
    if (!useName) return;
    
    const p = {
      name: useName,
      value: state,
    };
    
    const list = JSON.parse(localStorage.getItem(presetsKey) || "[]");
    const idx = list.findIndex((x: any) => x.name === p.name);
    
    if (idx >= 0) list[idx] = p;
    else list.push(p);
    
    localStorage.setItem(presetsKey, JSON.stringify(list));
    refreshPresets();
    presetName.value = "";
  }

  function loadPreset(name: string) {
    if (!name) return null;
    const list = JSON.parse(localStorage.getItem(presetsKey) || "[]");
    const p = list.find((x: any) => x.name === name);
    return p ? p.value : null;
  }

  function clearPresets() {
    if (!confirm("Xóa tất cả preset background?")) return;
    localStorage.removeItem(presetsKey);
    refreshPresets();
    selectedPreset.value = "";
  }

  return {
    presetsList,
    presetName,
    selectedPreset,
    refreshPresets,
    savePreset,
    loadPreset,
    clearPresets,
  };
}