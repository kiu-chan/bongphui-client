<template>
  <header class="headerNavbar w-full flex justify-center h-[120px]">
    <!-- Navbar -->
    <div
      class="flex justify-between app-container container items-center header-overlay"
    >
      <!-- Logo -->
      <NuxtLink to="/">
        <div class="flex gap-2 items-center">
          <img
            class="logo"
            src="../assets/img/logo_giaudauviet.png"
            alt="FUTNext Logo"
          />
        </div>
      </NuxtLink>

      <!-- Menu -->
      <ul class="flex gap-8 lg:flex">
        <li
          v-for="item in headerLeague"
          :key="item.title"
          class="text-header text-base font-medium"
        >
          <NuxtLink :to="item.router">
            <div
              class="flex h-[40px] items-center gap-[10px] pt-2 pr-4 pb-2 pl-2"
              :class="{ 'gap-[20px]': item.id === 4 }"
            >
              <!-- Icon trước nếu id === 5 -->
              <Icon
                v-if="item.id === 5"
                :name="item.iconName || ''"
                style="width: 42px; height: 42px; color: rgba(255, 255, 255, 1)"
                width="12"
                height="12"
              />

              <h2
                :style="{
                  color: idDefault === item.id ? 'rgba(247, 163, 39, 1)' : '',
                }"
                @click="idDefault = item.id"
                class="text-title font-medium text-[20px]"
              >
                {{ item.title }}
              </h2>

              <!-- Icon sau nếu id === 4 -->
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

      <!-- Actions -->
      <!-- <div class="flex items-center gap-4">
          <NuxtLink><p>Liên Hệ</p></NuxtLink>
          <NuxtLink to="/auth/login"><p>Đăng Nhập</p></NuxtLink>
          <div
            @click="handleClick"
            class="lg:hidden w-[40px] h-[40px] rounded-full flex justify-center items-center border border-[hsl(137_100%_21%)]"
          >
            <Icon
              class="w-[24px] h-[24px]"
              name="hugeicons:menu-07"
              width="48"
              height="48"
            />
          </div>
        </div> -->
    </div>

    <!-- Banner -->
    <!-- <div class="banner">
      <div class="grid grid-cols-10 absolute top-[76px]">
        <div class="col-span-4 mt-[136px]">
          <div class="flex items-center">
            <div class="w-[120px] flex justify-center">
              <ul>
                <template v-for="(ite, index) in item" :key="index">
                  <li
                    :class="[idDefault === ite.id ? 'idSlide' : '']"
                    style="
                      color: rgba(108, 127, 246, 1);
                      transition: all 0.4s ease;
                    "
                    class="font-medium text-[20px] mb-[4px] cursor-pointer flex justify-center"
                    @click="handelBaner(ite.id)"
                  >
                    0{{ ite.id }}
                  </li>
                </template>
              </ul>
            </div>
            <div>
              <h3
                style="color: rgba(247, 163, 39, 1)"
                class="font-medium text-[50px]"
              >
                Giải đấu việt
              </h3>
              <h1
                style="color: rgba(245, 245, 245, 1)"
                class="font-bold text-[70px]"
              >
                NÂNG TẦM <br />
                THỂ THAO VIỆT
              </h1>
            </div>
          </div>
        </div>
        <div class="col-span-6 max-w-[981px] max-h-[860px]">
          <img
            class="bannerImg w-full h-full contain"
            :key="banner"
            :src="banner"
            alt=""
          />
        </div>
      </div>
    </div> -->
  </header>

  <SideBar :openSideBar="openSideBar" @close="openSideBar = false" />
</template>

<script lang="ts">
import { ref, defineComponent, type Ref } from "vue";
import { headerLeague } from "../utils/header";
import SideBar from "./SideBar.vue";
import defaultBanner from "../assets/img/2023.2.24-Crop-Football-Kid-An-2-copy-2 1.png";
import defaultBanner2 from "../assets/img/vietnam.png";

export default defineComponent({
  components: { SideBar },
  setup() {
    const openSideBar: Ref<boolean> = ref(false);
    const idDefault: Ref<number> = ref(1);
    const banner: Ref<string> = ref(defaultBanner);
    const item: { id: number; img: string }[] = [
      {
        id: 1,
        img: defaultBanner,
      },
      {
        id: 2,
        img: defaultBanner2,
      },
      {
        id: 3,
        img: defaultBanner,
      },
      {
        id: 4,
        img: defaultBanner2,
      },
    ];
    const handleClick = () => {
      openSideBar.value = true;
      document.body.classList.add("overflow-hidden");
    };
    const handelBaner = (ite: number) => {
      idDefault.value = ite;
      banner.value = item.find((i) => i.id == ite)?.img || "";
    };
    return {
      handleClick,
      headerLeague,
      openSideBar,
      item,
      idDefault,
      banner,
      handelBaner,
    };
  },
});
</script>

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
/* .headerNavbar {
  background: linear-gradient(180deg, #121d7b 0%, #111167 100%);
} */
.text-title {
  color: rgba(255, 255, 255, 1);
}
</style>
