// composables/background/useBackgroundExport.ts
import { ref, nextTick } from 'vue';

export function useBackgroundExport() {
  const downloading = ref(false);

  function applyExportSafeStyles(): Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }> {
    const changed: Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }> = [];
    
    const teamNames = document.querySelectorAll<HTMLElement>(".team-name");
    teamNames.forEach((el) => {
      const prev: Partial<CSSStyleDeclaration> = {
        display: el.style.display,
        WebkitLineClamp: (el.style as any).WebkitLineClamp,
        WebkitBoxOrient: (el.style as any).WebkitBoxOrient,
        overflow: el.style.overflow,
        textOverflow: el.style.textOverflow,
        whiteSpace: el.style.whiteSpace,
        maxHeight: el.style.maxHeight,
      };
      
      el.style.display = "block";
      (el.style as any).WebkitLineClamp = "unset";
      (el.style as any).WebkitBoxOrient = "initial";
      el.style.overflow = "visible";
      el.style.textOverflow = "initial";
      el.style.whiteSpace = "normal";
      el.style.maxHeight = "none";
      changed.push({ el, prev });
    });

    const teamEls = document.querySelectorAll<HTMLElement>(".team");
    teamEls.forEach((pel) => {
      const prev: Partial<CSSStyleDeclaration> = {
        overflow: pel.style.overflow,
        maxHeight: pel.style.maxHeight,
      };
      pel.style.overflow = "visible";
      pel.style.maxHeight = "none";
      changed.push({ el: pel, prev });
    });

    const rows = document.querySelectorAll<HTMLElement>(".teams-row, .container");
    rows.forEach((r) => {
      const prev: Partial<CSSStyleDeclaration> = { overflow: r.style.overflow };
      if (r.style.overflow === "hidden") r.style.overflow = "visible";
      changed.push({ el: r, prev });
    });

    return changed;
  }

  function restoreExportSafeStyles(changes: Array<{ el: HTMLElement; prev: Partial<CSSStyleDeclaration> }>) {
    changes.forEach(({ el, prev }) => {
      try {
        if (prev.display !== undefined) el.style.display = prev.display as string;
        if (prev.WebkitLineClamp !== undefined) (el.style as any).WebkitLineClamp = prev.WebkitLineClamp;
        if (prev.WebkitBoxOrient !== undefined) (el.style as any).WebkitBoxOrient = prev.WebkitBoxOrient;
        if (prev.overflow !== undefined) el.style.overflow = prev.overflow as string;
        if (prev.textOverflow !== undefined) el.style.textOverflow = prev.textOverflow as string;
        if (prev.whiteSpace !== undefined) el.style.whiteSpace = prev.whiteSpace as string;
        if (prev.maxHeight !== undefined) el.style.maxHeight = prev.maxHeight as string;
      } catch (_) {
        // ignore restore errors
      }
    });
  }

  async function downloadImage(captureRoot: HTMLElement | null, editableTexts: any, overlayOpacity: number) {
    downloading.value = true;
    
    try {
      if (!captureRoot) throw new Error("Không tìm thấy phần tử để chụp.");

      // Apply export mode + hide controls
      captureRoot.classList.add("export-mode");
      const nodes = document.querySelectorAll<HTMLElement>("[data-no-export]");
      nodes.forEach((n) => {
        n.dataset.prevDisplay = n.style.display || "";
        n.style.display = "none";
      });

      // Inline style fixes
      const inlineChanges = applyExportSafeStyles();

      await nextTick();
      await new Promise((r) => setTimeout(r, 260));

      // Ensure html2canvas
      let html2canvas: any = null;
      try {
        const mod = await import("html2canvas");
        html2canvas = (mod && (mod as any).default) || mod;
      } catch {
        const cdn = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
        );
        html2canvas = (cdn && (cdn as any).default) || (window as any).html2canvas;
      }
      
      if (!html2canvas) throw new Error("html2canvas không sẵn có");

      // Temporary overlay
      const overlayEl = document.querySelector(".overlay") as HTMLElement | null;
      const prevOverlayBg = overlayEl?.style.background;
      if (overlayEl) overlayEl.style.background = `rgba(0,0,0,${overlayOpacity})`;

      const canvas: HTMLCanvasElement = await html2canvas(captureRoot as HTMLElement, {
        useCORS: false,
        allowTaint: false,
        backgroundColor: null,
        scale: Math.min(3, Math.max(1, window.devicePixelRatio || 1)),
      });

      if (overlayEl) overlayEl.style.background = prevOverlayBg ?? "";

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Không thể tạo ảnh"));
            return;
          }
          
          const safeName = (editableTexts.title || "tournament").replace(/\s+/g, "_");
          const filename = `${safeName}.png`;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1500);
          resolve();
        }, "image/png");
      });

      // Restore inline styles and UI
      restoreExportSafeStyles(inlineChanges);
      nodes.forEach((n) => {
        n.style.display = n.dataset.prevDisplay ?? "";
        delete n.dataset.prevDisplay;
      });
      captureRoot.classList.remove("export-mode");
    } catch (err: any) {
      console.error(err);
      alert("Lỗi khi xuất ảnh: " + (err?.message || err));
    } finally {
      downloading.value = false;
    }
  }

  return {
    downloading,
    downloadImage,
  };
}