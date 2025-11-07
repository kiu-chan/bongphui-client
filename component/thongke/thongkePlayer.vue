<template>
  <div>
    <div class="mt-[58px] flex justify-end">
      <button class="ButtonColor px-3 py-2 rounded-lg transition-colors">
        <Icon
          name="material-symbols-light:file-present"
          width="12"
          height="12"
          class="w-[30px] h-[30px]"
        />
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-[20px]">
      <div class="w-[340px] rounded-xl borderPlayer p-4">
        <h2 class="mb-5 text-2xl textGoal font-semibold">GOAL ></h2>
        <div v-for="(item2, index2) in dataPlayer" :key="index2">
          <div class="mb-4">
            <div class="flex gap-[12px] items-center">
              <span
                class="min-w-[18px] text-center items-center text-base textGoal"
                >{{ item2.playerId }}</span
              >
              <div class="flex items-center gap-2 flex-1">
                <div
                  class="w-[54px] h-[54px] rounded-lg overflow-hidden flex justify-center"
                >
                  <img
                    :src="
                      item2.imageUrl ||
                      'https://lh3.googleusercontent.com/d/1WcpKPHOK59wUKC_quRqeJgKO3gsIuS0k=w800'
                    "
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div>
                  <h2 class="text-lg font-medium">{{ item2.playerName }}</h2>
                  <span class="text-sm font-light textTitlePlayer">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-xl font-semibold">
                {{ item2.totalGoals }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[340px] rounded-xl borderPlayer p-4">
        <h2 class="mb-5 text-2xl textGoal font-semibold">ASSISTS ></h2>
        <div v-for="(item2, index2) in dataAssits" :key="index2">
          <div class="mb-4">
            <div class="flex gap-[12px] items-center">
              <span
                class="min-w-[18px] text-center items-center text-base textGoal"
                >{{ item2.playerId }}</span
              >
              <div class="flex items-center gap-2 flex-1">
                <div
                  class="w-[54px] h-[54px] rounded-lg overflow-hidden flex justify-center"
                >
                  <img
                    :src="
                      item2.imageUrl ||
                      'https://lh3.googleusercontent.com/d/1WcpKPHOK59wUKC_quRqeJgKO3gsIuS0k=w800'
                    "
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div>
                  <h2 class="text-lg font-medium">{{ item2.playerName }}</h2>
                  <span class="text-sm font-light textTitlePlayer">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-xl font-semibold">
                {{ item2.totalAssists }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[340px] rounded-xl borderPlayer p-4">
        <h2 class="mb-5 text-2xl textGoal font-semibold">CARD ></h2>
        <div v-for="(item2, index2) in dataCard" :key="index2">
          <div class="mb-4">
            <div class="flex gap-[12px] items-center">
              <span
                class="min-w-[18px] text-center items-center text-base textGoal"
                >{{ item2.playerId }}</span
              >
              <div class="flex items-center gap-2 flex-1">
                <div
                  class="w-[54px] h-[54px] rounded-lg overflow-hidden flex justify-center"
                >
                  <img
                    :src="
                      item2.imageUrl ||
                      'https://lh3.googleusercontent.com/d/1WcpKPHOK59wUKC_quRqeJgKO3gsIuS0k=w800'
                    "
                    alt=""
                    class="object-cover w-full rounded-xl"
                  />
                </div>
                <div>
                  <h2 class="text-lg font-medium">{{ item2.playerName }}</h2>
                  <span class="text-sm font-light textTitlePlayer">
                    {{ item2.tournamentName }}
                  </span>
                </div>
              </div>
              <span class="text-xl font-semibold">
                {{ item2.yellowCards }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useImportStore } from "../../store/import";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props);

    const dataPlayer: Ref<Array<any>> = ref([]);
    const dataAssits: Ref<Array<any>> = ref([]);
    const dataCard: Ref<Array<any>> = ref([]);
    const ImportStore = useImportStore();
    onMounted(() => {
      fnListTk();
      fnListtkAssits();
      fnListtkCard();
    });
    const fnListTk = () => {
      ImportStore.fnGetImportTournament(id.value)
        .then((res: any) => {
          dataPlayer.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fnListtkAssits = () => {
      ImportStore.fnGetImportTournamentAssists(id.value)
        .then((res: any) => {
          dataAssits.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fnListtkCard = () => {
      ImportStore.fnGetImportTournamentCard(id.value)
        .then((res: any) => {
          dataCard.value = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      dataPlayer,
      dataAssits,
      dataCard,
    };
  },
});
</script>

<style scoped>
.backgroundPlayer {
  background-color: red;
}
.textGoal {
  /* color: var(--textPrimary); */
}
.borderPlayer {
  border: 1px solid var(--textsport);
}
.textTitlePlayer {
  color: #787676;
}
</style>
