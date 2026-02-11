<template>
  <popUpFull
    :open="openPopup"
    :width="800"
    :title="'Tạo trận đấu thủ công'"
    @toggle="$emit('toggle')"
    @success="fnCreateMatch()"
  >
    <div class="p-5">
      <div class="mb-6">
        <label class="block mb-2 font-medium">Vòng đấu</label>
        <select v-model="stage" class="nebula-dark-select w-full">
          <option value="">-- Chọn vòng đấu --</option>
          <option value="ROUND_OF_32">Vòng 1/32</option>
          <option value="ROUND_OF_16">Vòng 1/16</option>
          <option value="QUARTER_FINALS">Tứ kết</option>
          <option value="SEMI_FINALS">Bán kết</option>
          <option value="FINALS">Chung kết</option>
          <option value="GROUP_STAGE">Vòng bảng</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block mb-2 font-medium">Sân vận động</label>
        <input
          type="number"
          v-model.number="stadiumId"
          placeholder="ID Sân vận động"
          class="w-full p-3 border rounded-lg bg-transparent"
        />
      </div>

      <div class="mb-4 flex justify-between items-center">
        <h3 class="font-medium text-lg">Danh sách trận đấu</h3>
        <button
          @click="addPair"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          + Thêm trận
        </button>
      </div>

      <div class="space-y-4 max-h-[400px] overflow-y-auto">
        <div
          v-for="(pair, index) in pairs"
          :key="index"
          class="p-4 border rounded-lg relative"
        >
          <button
            v-if="pairs.length > 1"
            @click="removePair(index)"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label class="block mb-1 text-sm">Đội nhà</label>
              <select v-model="pair.homeTeamId" class="nebula-dark-select w-full">
                <option value="">-- Chọn đội nhà --</option>
                <option v-for="team in teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-sm">Đội khách</label>
              <select v-model="pair.awayTeamId" class="nebula-dark-select w-full">
                <option value="">-- Chọn đội khách --</option>
                <option v-for="team in teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm">Thời gian thi đấu</label>
            <input
              type="datetime-local"
              v-model="pair.matchDateTime"
              class="w-full p-2 border rounded-lg bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  </popUpFull>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, type Ref, type PropType } from "vue";
import popUpFull from "../../library/popupFull/index.vue";
import { useMatchStore } from "../../../store/matchManger";

interface Team {
  id: number;
  name: string;
}

interface Pair {
  homeTeamId: number | string;
  awayTeamId: number | string;
  matchDateTime: string;
}

export default defineComponent({
  components: {
    popUpFull,
  },
  props: {
    openPopup: Boolean,
    tournamentId: {
      type: [Number, String],
      required: true,
    },
    teams: {
      type: Array as PropType<Team[]>,
      default: () => [],
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { openPopup, tournamentId, teams } = toRefs(props);
    const MatchStore = useMatchStore();
    const toast = useToast();

    const stage = ref<string>("");
    const stadiumId = ref<number>(0);
    const pairs = ref<Pair[]>([
      {
        homeTeamId: "",
        awayTeamId: "",
        matchDateTime: "",
      },
    ]);

    watch(openPopup, (newVal) => {
      if (newVal) {
        resetForm();
      }
    });

    const addPair = () => {
      pairs.value.push({
        homeTeamId: "",
        awayTeamId: "",
        matchDateTime: "",
      });
    };

    const removePair = (index: number) => {
      pairs.value.splice(index, 1);
    };

    const resetForm = () => {
      stage.value = "";
      stadiumId.value = 0;
      pairs.value = [
        {
          homeTeamId: "",
          awayTeamId: "",
          matchDateTime: "",
        },
      ];
    };

    const fnCreateMatch = () => {
      // Validate
      if (!stage.value) {
        toast.error({
          message: "Vui lòng chọn vòng đấu",
          position: "topRight",
        });
        return;
      }

      const validPairs = pairs.value.filter(
        (p) => p.homeTeamId && p.awayTeamId && p.matchDateTime
      );

      if (validPairs.length === 0) {
        toast.error({
          message: "Vui lòng nhập đầy đủ thông tin ít nhất 1 trận đấu",
          position: "topRight",
        });
        return;
      }

      const payload = {
        stage: stage.value,
        pairs: validPairs.map((p) => ({
          homeTeamId: Number(p.homeTeamId),
          awayTeamId: Number(p.awayTeamId),
          matchDateTime: new Date(p.matchDateTime).toISOString(),
        })),
        stadiumId: stadiumId.value,
      };

      console.log("========== CREATE MANUAL MATCH ==========");
      console.log("Tournament ID:", tournamentId.value);
      console.log("Payload:", JSON.stringify(payload, null, 2));
      console.log("=========================================");

      MatchStore.fnCreateManualMatch(Number(tournamentId.value), payload)
        .then((res) => {
          toast.success({
            message: "Tạo trận đấu thành công",
            position: "topRight",
          });
          ctx.emit("toggle");
          ctx.emit("success");
        })
        .catch((err) => {
          console.error("Error:", err);
          toast.error({
            message: "Tạo trận đấu thất bại: " + (err?.response?.data?.message || err?.message || err),
            position: "topRight",
          });
        });
    };

    return {
      stage,
      stadiumId,
      pairs,
      addPair,
      removePair,
      fnCreateMatch,
    };
  },
});
</script>

<style scoped>
.nebula-dark-select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: transparent;
}
</style>