// composables/background/useBackgroundDrag.ts
import { ref } from 'vue';

export function useBackgroundDrag(positions: Record<string, { x: number; y: number }>) {
  const dragEnabled = ref(false);
  
  // SỬA LẠI PHẦN NÀY - thay dấu ; thành ,
  const dragging = ref<{
    key: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    el: HTMLElement | null;
    pointerId: number;
  } | null>(null);

  function startDrag(payload: any) {
    if (!dragEnabled.value) return;
    const e: PointerEvent = payload?.originalEvent;
    const key: string = payload?.key;
    if (!e || !key) return;

    const el = (e.currentTarget as HTMLElement) || null;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (!positions[key]) positions[key] = { x: 0, y: 0 };

    dragging.value = {
      key,
      startX: clientX,
      startY: clientY,
      origX: positions[key].x,
      origY: positions[key].y,
      el,
      pointerId: e.pointerId,
    };

    try {
      if (el && el.setPointerCapture) el.setPointerCapture(e.pointerId);
    } catch (_) {
      /* ignore */
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    document.body.style.userSelect = "none";
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging.value) return;
    if (e.pointerId != null && dragging.value.pointerId != null && e.pointerId !== dragging.value.pointerId) return;
    e.preventDefault();
    
    const dx = e.clientX - dragging.value.startX;
    const dy = e.clientY - dragging.value.startY;
    const key = dragging.value.key;
    
    positions[key].x = Math.round(dragging.value.origX + dx);
    positions[key].y = Math.round(dragging.value.origY + dy);
  }

  function endDrag() {
    if (!dragging.value) return;
    const el = dragging.value.el;
    const pid = dragging.value.pointerId;
    
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
    
    try {
      if (el && pid != null && el.releasePointerCapture) el.releasePointerCapture(pid);
    } catch (_) {
      /* ignore */
    }
    
    dragging.value = null;
    document.body.style.userSelect = "";
  }

  return {
    dragEnabled,
    startDrag,
  };
}