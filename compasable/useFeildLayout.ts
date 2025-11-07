// composables/useSquad.ts
import { ref } from "vue";
export interface PositionRow {
  cols: (string | number)[];
  justify: string;
}
export interface Card {
  id: number;
  ct: string;
  class: string;
  isActive: boolean;
  dh: PositionRow[];
}
export function useSquad() {
  const defaultLayouts: Record<"1" | "2" | "3", PositionRow[]> = {
    "1": [
      { cols: [1], justify: "justify-center" },
      { cols: [1, 2], justify: "gap-5 justify-around" },
      { cols: [1], justify: "justify-center" },
      { cols: [1], justify: "justify-center" },
    ],
    "2": [
      { cols: [1], justify: "justify-center" },
      { cols: [1, 2], justify: "gap-5 justify-center" },
      { cols: [1, 2], justify: "justify-around" },
      { cols: [1], justify: "justify-center" },
      { cols: [1], justify: "justify-center" },
    ],
    "3": [
      { cols: [1], justify: "justify-center" },
      { cols: [1, 2, 3, 4], justify: "gap-5 justify-center" },
      { cols: [1, 2, 3, 4, 5], justify: "justify-center gap-10" },
      { cols: [1], justify: "justify-center" },
    ],
  };
  //list đội hình (5,7,11)
  const fieldselectCards: Record<"1" | "2" | "3", Card[]> = {
    "1": [
      // Sân 5 người
      {
        id: 1,
        ct: "1-2-1",
        class: "position",
        dh: [
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 2,
        ct: "2-2",
        class: "position",
        dh: [
          { cols: [1, 2], justify: "gap-5 justify-center" },
          { cols: [1, 2], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 3,
        ct: "1-1-2",
        class: "position",
        dh: [
          { cols: [1], justify: "justify-center" },
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: " justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
    ],

    "2": [
      // Sân 7 người
      {
        id: 1,
        ct: "1-2-2-1",
        class: "position",
        dh: [
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: "gap-5 justify-center" },
          { cols: [1, 2], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 2,
        ct: "3-2-1",
        class: "position",
        dh: [
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: "gap-5 justify-center" },
          { cols: [1, 2, 3], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 3,
        ct: "2-1-3",
        class: "position7-213",
        dh: [
          { cols: [1, 2, 3], justify: "gap-5 justify-center" },
          { cols: [1], justify: "gap-5 justify-center" },
          { cols: [1, 2], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 4,
        ct: "2-1-2-1",
        class: "position3",
        dh: [
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: "gap-5 justify-center" },
          { cols: [1], justify: "justify-center" },
          { cols: [1, 2], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
    ],

    "3": [
      // Sân 11 người
      {
        id: 1,
        ct: "4-4-2",
        class: "position11-442",
        dh: [
          { cols: [1, 2], justify: "gap-5 justify-center" },
          { cols: [1, 2, 3, 4], justify: "gap-5 justify-center" },
          { cols: [1, 2, 3, 4], justify: "gap-10 justify-center" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 2,
        ct: "4-3-3",
        class: "position11-433",
        dh: [
          { cols: [1, 2, 3], justify: "gap-5 justify-center" },
          { cols: [1, 2, 3], justify: "gap-10 justify-center" },
          { cols: [1, 2, 3, 4], justify: "justify-around" },
          { cols: [1], justify: "justify-center" },
        ],
        isActive: false,
      },
      {
        id: 3,
        ct: "3-5-2",
        class: "position11-352",
        dh: [
          { cols: [1, 2], justify: "gap-5 justify-center" }, // tiền đạo
          { cols: [1, 2, 3, 4, 5], justify: "gap-6 justify-center" }, // tiền vệ
          { cols: [1, 2, 3], justify: "justify-around" }, // hậu vệ
          { cols: [1], justify: "justify-center" }, // thủ môn
        ],
        isActive: false,
      },
    ],
  };

  // Deep clone object
  const fieldLayout = ref(JSON.parse(JSON.stringify(defaultLayouts)));
  const fieldselectCard = ref(JSON.parse(JSON.stringify(fieldselectCards)));
  const resetLayouts = () => {
    fieldLayout.value = JSON.parse(JSON.stringify(defaultLayouts));
    fieldselectCard.value = JSON.parse(JSON.stringify(fieldselectCards));
  };

  return {
    fieldselectCard,
    fieldLayout,
    resetLayouts,
  };
}
