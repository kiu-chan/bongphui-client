<template>
  <div class="background-quanlydoibong flex justify-center">
    <div class="container app-container mt-4 px-4 md:px-6">
      <div>
        <div class="flex justify-between items-center cursor-pointer">
          <NuxtLink to="/giaidau">
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
      
      <!-- Banner Image - Responsive height -->
      <div class="h-[200px] sm:h-[300px] md:h-[408px] w-full rounded-[20px] md:rounded-[40px] overflow-hidden mt-4">
        <img class="h-full w-full object-cover" :src="championLeague" alt="Championship Banner" />
      </div>
      
      <!-- Navigation Tabs -->
      <div class="mt-8 md:mt-[70px] flex justify-center">
        <div class="w-full max-w-[1207px]">
          <!-- Mobile: Dropdown -->
          <div class="md:hidden relative" ref="dropdownRef">
            <div
              @click="toggleDropdown"
              :style="{
                background: 'linear-gradient(90deg, #E87451 0%, #AF4CC4 100%)',
              }"
              class="px-4 py-3 rounded-[10px] flex justify-between items-center cursor-pointer hover:opacity-90 transition-opacity"
            >
              <p class="font-medium text-[14px] text-white">
                {{ activeTab?.title || 'Chọn mục' }}
              </p>
              <Icon
                :name="isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="text-white w-5 h-5 transition-transform duration-200"
              />
            </div>
            
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
                class="absolute z-50 w-full mt-2 bg-white rounded-[10px] shadow-lg overflow-hidden border border-gray-100"
              >
                <div
                  v-for="(item, index) in headerLeague"
                  :key="index"
                  @click="selectTab(item)"
                  :class="[
                    'px-4 py-3 cursor-pointer transition-colors duration-150',
                    route.path.includes(item.router)
                      ? 'bg-gradient-to-r from-orange-50 to-purple-50 text-orange-500'
                      : 'hover:bg-gray-50'
                  ]"
                >
                  <NuxtLink :to="item.router" class="block">
                    <p class="font-medium text-[14px]">
                      {{ item.title }}
                    </p>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Desktop: Flex layout -->
          <div class="hidden md:flex justify-between gap-2 flex-wrap">
            <div
              v-for="(item, index) in headerLeague"
              :key="index"
              :style="
                route.path.includes(item.router)
                  ? {
                      background:
                        'linear-gradient(90deg, #E87451 0%, #AF4CC4 100%)',
                    }
                  : { background: 'rgba(255, 239, 234, 1)' }
              "
              class="px-4 lg:px-[20px] h-[50px] lg:h-[60px] rounded-[10px] flex justify-center items-center transition-all duration-200 hover:opacity-90"
            >
              <NuxtLink :to="item.router">
                <p
                  :style="
                    route.path.includes(item.router)
                      ? { color: 'rgba(255, 255, 255, 1)' }
                      : { color: 'rgba(0, 0, 0, 1)' }
                  "
                  class="font-medium text-[16px] lg:text-[20px] whitespace-nowrap"
                >
                  {{ item.title }}
                </p>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Slot Content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import championLeague from "../../assets/img/championLeague (2).png";
import { headerLeague } from "../../utils/headerLeague";

const { stt } = defineProps<{ stt: number }>();
const route = useRoute();
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const activeTab = computed(() => {
  return headerLeague.find(item => route.path.includes(item.router));
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectTab = (item: any) => {
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

// Close dropdown when route changes
watch(() => route.path, () => {
  isDropdownOpen.value = false;
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  console.log(route.path, "chính");
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.background-quanlydoibong {
  background: rgba(255, 255, 255, 1);
  min-height: 100vh;
}

.text-header::after {
  content: "";
  display: block;
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  height: 1px;
  width: 0;
  transition: all 0.3s ease;
}

.text-header:hover::after {
  width: 100%;
}

.text-gradient:hover {
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient2 {
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .app-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Tablet optimizations */
@media (min-width: 769px) and (max-width: 1024px) {
  .app-container {
    max-width: 100%;
  }
}
</style>