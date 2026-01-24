<script lang="ts">
import { ref, computed, type Ref } from "vue";
import { headerLeague } from "../utils/header";
import SideBar from "./SideBar.vue";
import defaultBanner from "../assets/img/2023.2.24-Crop-Football-Kid-An-2-copy-2 1.png";
import defaultBanner2 from "../assets/img/vietnam.png";
import { useAuthStore } from "~/store/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { SideBar },
  setup() {
    const Route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const openSideBar: Ref<boolean> = ref(false);
    const banner: Ref<string> = ref(defaultBanner);
    const item: { id: number; img: string }[] = [
      { id: 1, img: defaultBanner },
      { id: 2, img: defaultBanner2 },
      { id: 3, img: defaultBanner },
      { id: 4, img: defaultBanner2 },
    ];

    const isLoggedIn = computed(() => authStore.isAuthenticated);

    const handleLogout = () => {
      authStore.logout();
      router.push('/');
    };

    const handelRouter = (item) => {
      console.log(item, "item");
    };

    const handleClick = () => {
      openSideBar.value = true;
      document.body.classList.add("overflow-hidden");
    };

    const handelBaner = (ite: number) => {
      banner.value = item.find((i) => i.id == ite)?.img || "";
    };

    return {
      handleClick,
      headerLeague,
      openSideBar,
      item,
      Route,
      handelRouter,
      banner,
      handelBaner,
      isLoggedIn,
      handleLogout,
    };
  },
});
</script>

<template>
  <header class="headerNavbar w-full flex justify-center h-[120px]">
    <div
      class="flex justify-between app-container container items-center header-overlay"
    >
      <NuxtLink to="/">
        <div class="flex gap-2 items-center">
          <img
            class="logo"
            src="../assets/img/logo_giaudauviet.png"
            alt="FUTNext Logo"
          />
        </div>
      </NuxtLink>

      <ul class="flex gap-8 lg:flex">
        <li
          v-for="item in headerLeague"
          :key="item.title"
          class="text-header text-base font-medium"
        >
          <!-- Hiển thị nút Đăng nhập nếu chưa đăng nhập -->
          <NuxtLink v-if="item.id === 5 && !isLoggedIn" :to="item.router">
            <div
              class="flex h-[40px] items-center gap-[10px] pt-2 pr-4 pb-2 pl-2"
              :class="{ 'gap-[20px]': item.id === 4 }"
            >
              <Icon
                :name="item.iconName || ''"
                style="width: 42px; height: 42px; color: rgba(255, 255, 255, 1)"
                width="12"
                height="12"
              />
              <h2
                :style="{
                  color:
                    Route.path == item.router ? 'rgba(247, 163, 39, 1)' : '',
                }"
                @click="handelRouter(item)"
                class="text-title font-medium text-[20px]"
              >
                {{ item.title }}
              </h2>
            </div>
          </NuxtLink>

          <!-- Hiển thị nút Đăng xuất nếu đã đăng nhập -->
          <button v-else-if="item.id === 5 && isLoggedIn" @click="handleLogout">
            <div
              class="flex h-[40px] items-center gap-[10px] pt-2 pr-4 pb-2 pl-2"
            >
              <Icon
                name="mdi-light:logout"
                style="width: 42px; height: 42px; color: rgba(255, 255, 255, 1)"
                width="12"
                height="12"
              />
              <h2 class="text-title font-medium text-[20px]">
                Đăng xuất
              </h2>
            </div>
          </button>

          <!-- Các menu item khác -->
          <NuxtLink v-else-if="item.id !== 5" :to="item.router">
            <div
              class="flex h-[40px] items-center gap-[10px] pt-2 pr-4 pb-2 pl-2"
              :class="{ 'gap-[20px]': item.id === 4 }"
            >
              <h2
                :style="{
                  color:
                    Route.path == item.router ? 'rgba(247, 163, 39, 1)' : '',
                }"
                @click="handelRouter(item)"
                class="text-title font-medium text-[20px]"
              >
                {{ item.title }}
              </h2>

              <Icon
                v-if="item.id === 4"
                :name="item.iconName || ''"
                style="width: 40px; height: 40px; color: rgba(255, 255, 255, 1)"
                width="12"
                height="12"
              />
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>

  <SideBar :openSideBar="openSideBar" @close="openSideBar = false" />
</template>

<style scoped>
.header-overlay {
  background: transparent;
  width: 100%;
}
.idSlide {
  font-size: 25px !important;
  color: rgba(245, 245, 245, 1) !important;
  border-bottom: 2px solid rgba(247, 163, 39, 1);
}

.banner {
  position: relative;
  background-image: url(../assets/img/anh_12.png);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 1080px;
}
.bannerImg {
  animation: zoomIn 0.8s ease-out;
}
@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.text-title {
  color: rgba(255, 255, 255, 1);
}
</style>