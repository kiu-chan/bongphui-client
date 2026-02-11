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
    const isMobileMenuOpen: Ref<boolean> = ref(false);
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

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      if (isMobileMenuOpen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
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
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
</script>

<template>
  <header class="headerNavbar w-full flex justify-center lg:h-[120px] h-[70px]">
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

      <!-- Nút hamburger cho mobile -->
      <button @click="toggleMobileMenu" class="lg:hidden text-white relative z-50">
        <Icon name="mdi:menu" style="width: 32px; height: 32px;" />
      </button>

      <!-- Menu desktop -->
      <ul class="hidden lg:flex gap-8">
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

  <!-- Menu mobile với hiệu ứng slide -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
      <!-- Overlay với hiệu ứng fade -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isMobileMenuOpen"
          class="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          @click="toggleMobileMenu"
        ></div>
      </Transition>

      <!-- Menu sidebar -->
      <div class="absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-gradient-to-br from-orange-50 via-white to-purple-50 shadow-2xl" @click.stop>
        <!-- Header với gradient -->
        <div class="bg-gradient-to-r from-orange-400 to-purple-500 p-6 flex justify-between items-center">
          <h2 class="text-white font-bold text-xl">Menu</h2>
          <button 
            @click="toggleMobileMenu"
            class="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          >
            <Icon name="mdi:close" style="width: 28px; height: 28px;" />
          </button>
        </div>

        <!-- Menu items -->
        <ul class="flex flex-col px-2 py-4">
          <li 
            v-for="(item, index) in headerLeague" 
            :key="item.title" 
            class="mobile-menu-item"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <NuxtLink 
              v-if="item.id === 5 && !isLoggedIn" 
              :to="item.router" 
              @click="toggleMobileMenu"
              class="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-100 hover:to-purple-100 transition-all duration-300 group"
            >
              <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon :name="item.iconName || ''" style="width: 20px; height: 20px; color: white;" />
              </div>
              <h2 class="text-gray-800 font-medium text-[17px] group-hover:text-orange-600 transition-colors duration-300">
                {{ item.title }}
              </h2>
            </NuxtLink>
            
            <button 
              v-else-if="item.id === 5 && isLoggedIn" 
              @click="handleLogout(); toggleMobileMenu()" 
              class="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-100 hover:to-purple-100 transition-all duration-300 group"
            >
              <div class="bg-gradient-to-br from-orange-400 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon name="mdi-light:logout" style="width: 20px; height: 20px; color: white;" />
              </div>
              <h2 class="text-gray-800 font-medium text-[17px] group-hover:text-orange-600 transition-colors duration-300">
                Đăng xuất
              </h2>
            </button>
            
            <NuxtLink 
              v-else-if="item.id !== 5" 
              :to="item.router" 
              @click="toggleMobileMenu"
              class="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 group"
              :class="Route.path === item.router ? 'bg-gradient-to-r from-orange-100 to-purple-100' : 'hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50'"
            >
              <h2 
                class="font-medium text-[17px] group-hover:text-orange-600 transition-colors duration-300 flex-1"
                :class="Route.path === item.router ? 'text-orange-600' : 'text-gray-800'"
              >
                {{ item.title }}
              </h2>
              <Icon 
                v-if="item.id === 4" 
                :name="item.iconName || ''" 
                style="width: 24px; height: 24px;" 
                :class="Route.path === item.router ? 'text-orange-600' : 'text-gray-600'"
              />
            </NuxtLink>
          </li>
        </ul>

        <!-- Footer gradient -->
        <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-100/50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  </Transition>

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

/* Animation cho menu items */
.mobile-menu-item {
  animation: slideInFromRight 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>