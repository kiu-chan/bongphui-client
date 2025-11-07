import { ref } from "vue";

export function useDH(players: any[], formation: number[], title: string) {
  // formation = ví dụ [4,4,2] hoặc [3,5,2]
  const dhRows = ref<{ class: string; cols: any[] }[]>([]);
  const dhDubi = ref<any[]>([]);

  // Tạo sẵn hàng trống theo formation
  dhRows.value = formation.map(() => ({
    class: title,
    cols: [],
  }));

  // Tính ranh giới (boundary) cho từng hàng theo formation
  const boundaries: number[] = [];
  formation.reduce((acc, num) => {
    const next = acc + num;
    boundaries.push(next);
    return next;
  }, 0);

  // Phân loại cầu thủ dựa vào positionNumber
  players.forEach((p) => {
    let added = false;
    for (let i = 0; i < boundaries.length; i++) {
      if (p.positionNumber <= boundaries[i]) {
        dhRows.value[i].cols.push(p);
        added = true;
        break;
      }
    }

    if (!added) {
      dhDubi.value.push(p);
    }
  });

  return {
    dhRows,
    dhDubi,
  };
}
