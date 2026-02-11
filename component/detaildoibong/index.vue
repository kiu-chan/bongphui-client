<template>
  <div class="background-quanlydoibong flex justify-center">
    <div class="container app-container mt-4 mb-4 px-4">
      <div>
        <div class="flex justify-between items-center cursor-pointer">
          <NuxtLink to="/doibong">
            <div class="flex justify-between items-center gap-2">
              <div
                style="background: rgba(245, 245, 245, 1)"
                class="w-[44px] h-[44px] md:w-[54px] md:h-[54px] rounded-full flex justify-center items-center"
              >
                <Icon
                  class="text-[16px] md:text-[20px]"
                  name="ci:chevron-left"
                  width="32"
                  height="32"
                />
              </div>
              <h3 class="text-sm md:text-base">Quay lại</h3>
            </div>
          </NuxtLink>
          <div
            style="background: rgba(245, 245, 245, 1)"
            class="w-[44px] h-[44px] md:w-[54px] md:h-[54px] rounded-full flex justify-center items-center"
          >
            <Icon
              class="text-[16px] md:text-[20px]"
              name="hugeicons:settings-01"
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>
      
      <div class="h-[250px] md:h-[408px] w-full rounded-[20px] md:rounded-[40px] overflow-hidden mt-4">
        <img class="h-full w-full object-cover" :src="hereWego" alt="" />
      </div>
      
      <div class="mt-8 md:mt-[70px]">
        <div class="max-w-[1207px] mx-auto">
          <!-- Mobile: Dropdown -->
          <div class="md:hidden relative mb-6" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="w-full px-4 py-3 bg-white border-2 border-orange-300 rounded-xl flex items-center justify-between shadow-md hover:shadow-lg transition-all"
              :class="isDropdownOpen ? 'ring-2 ring-orange-500 border-orange-500' : ''"
            >
              <div class="flex items-center gap-3">
                <Icon 
                  :name="activeTab?.icon || 'mdi:view-list'" 
                  class="text-orange-500 text-[24px]" 
                />
                <span class="font-semibold text-gray-800">
                  {{ activeTab?.title || 'Chọn mục' }}
                </span>
              </div>
              <Icon 
                name="mdi:chevron-down" 
                class="text-gray-400 transition-transform duration-300"
                :class="isDropdownOpen ? 'rotate-180' : ''"
              />
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="isDropdownOpen"
                class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100"
              >
                <NuxtLink
                  v-for="(item, index) in headerDoibong"
                  :key="index"
                  :to="`/quanlydoibong/${teamId}/${item.router}`"
                  @click="selectTab(item)"
                  class="block"
                >
                  <div
                    :class="[
                      'px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3',
                      isActive(item.router)
                        ? 'bg-gradient-to-r from-orange-50 to-purple-50 border-l-4 border-orange-500'
                        : 'hover:bg-gray-50'
                    ]"
                  >
                    <Icon 
                      :name="item.icon || 'mdi:circle-small'" 
                      :class="[
                        'text-[24px]',
                        isActive(item.router) ? 'text-orange-500' : 'text-gray-400'
                      ]"
                    />
                    <p 
                      :class="[
                        'font-medium text-[15px]',
                        isActive(item.router) ? 'text-orange-600' : 'text-gray-700'
                      ]"
                    >
                      {{ item.title }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Desktop: Tabs (NO ICONS) -->
          <div class="hidden md:flex justify-between gap-3 flex-wrap mb-6">
            <NuxtLink
              v-for="(item, index) in headerDoibong"
              :key="index"
              :to="`/quanlydoibong/${teamId}/${item.router}`"
              class="tab-button flex-1 min-w-[150px]"
            >
              <div
                :class="[
                  'px-6 h-[60px] rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg',
                  isActive(item.router) ? 'tab-active' : 'tab-inactive'
                ]"
              >
                <p
                  :class="[
                    'font-semibold text-[16px] lg:text-[18px] text-center whitespace-nowrap',
                    isActive(item.router) ? 'text-white' : 'text-gray-800'
                  ]"
                >
                  {{ item.title }}
                </p>
              </div>
            </NuxtLink>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import hereWego from "../../assets/img/hereWeGo.png";
import { headerDoibong } from "../../utils/headerLeague";

const { stt } = defineProps<{ stt: number }>();
const route = useRoute();
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Get teamId from route params
const teamId = computed(() => route.params.teamId);

// Get active tab
const activeTab = computed(() => {
  return headerDoibong.find(item => isActive(item.router));
});

// Check if a tab is active based on current route
const isActive = (router: string) => {
  return route.path.includes(`/${router}`);
};

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Select tab and close dropdown
const selectTab = (item: any) => {
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  console.log("Active tab stt:", stt);
  console.log("Current route:", route.path);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.background-quanlydoibong {
  background: rgba(255, 255, 255, 1);
}

.tab-button {
  text-decoration: none;
}

.tab-active {
  background: linear-gradient(90deg, #E87451 0%, #AF4CC4 100%);
  transform: translateY(-2px);
}

.tab-inactive {
  background: rgba(255, 239, 234, 1);
  border: 2px solid rgba(232, 116, 81, 0.2);
}

.tab-inactive:hover {
  background: rgba(255, 229, 220, 1);
  border-color: rgba(232, 116, 81, 0.4);
  transform: translateY(-1px);
}

/* Rotate animation for chevron */
.rotate-180 {
  transform: rotate(180deg);
}
</style>