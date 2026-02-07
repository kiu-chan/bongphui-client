<template>
  <main>
    <div>
      <SliderBanner />
      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto px-4 md:px-6 pt-[30px] md:pt-[50px] pb-12">
            <!-- Component Đội bóng -->
            <TeamList 
              :teams="listDataTeam" 
              :is-authenticated="isAuthenticated"
              :current-page="offset"
              @prev-page="handlePrevPage"
              @next-page="handleNextPage"
            />

            <!-- Component Lịch thi đấu -->
            <LatestMatches :matches="matchesTeam" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import SliderBanner from "../component/library/sliderBanner/index.vue";
import TeamList from "../component/team/TeamList.vue";
import LatestMatches from "../component/match/LatestMatches.vue";
import { useTeamStore } from "../store/team";
import { useMatchStore } from "../store/matchManger";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const TeamStore = useTeamStore();
const MatchStore = useMatchStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const limit = 10;
const offset = ref(1);
const keyword = ref("");
const listDataTeam = ref([]);
const matchesTeam = ref([]);

onMounted(() => {
  fnGetListData();
  fnGetListNewEst();
});

watch([offset, keyword], () => {
  fnGetListData();
});

const fnGetListData = () => {
  const params = [
    keyword.value.toString() && `keyword=${keyword.value}`,
    limit && `limit=${limit}`,
    offset.value && `offset=${offset.value}`,
  ].filter(Boolean);
  const url = params.length > 0 ? `?${params.join("&")}` : "";
  
  TeamStore.fnGetTeam(url)
    .then((res) => {
      listDataTeam.value = res;
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

const fnGetListNewEst = () => {
  MatchStore.fnGetMatchNewEst(1)
    .then((res) => {
      matchesTeam.value = res;
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

const handlePrevPage = () => {
  if (offset.value > 1) {
    offset.value--;
  }
};

const handleNextPage = () => {
  offset.value++;
};
</script>

<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 1);
}

.bg2 {
  background: linear-gradient(
    180deg,
    rgba(232, 243, 248, 1) 0%,
    rgba(255, 255, 255, 1) 99.98%
  );
}
</style>