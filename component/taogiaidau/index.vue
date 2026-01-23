<template>
  <div class="background-quanlydoibong flex justify-center">
    <div class="container app-container mt-4">
      <div>
        <div class="flex justify-between items-center cursor-pointer">
          <NuxtLink to="/giaidau">
            <div class="flex justify-between items-center gap-2">
              <div
                style="background: rgba(245, 245, 245, 1)"
                class="w-[54px] h-[54px] rounded-full flex justify-center items-center"
              >
                <Icon
                  class="text-[20px]"
                  name="ci:chevron-left"
                  width="40"
                  height="40"
                />
              </div>
              <h3>Quay lại</h3>
            </div>
          </NuxtLink>
          <div
            style="background: rgba(245, 245, 245, 1)"
            class="w-[54px] h-[54px] rounded-full flex justify-center items-center"
          >
            <Icon
              class="text-[20px]"
              name="hugeicons:settings-01"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
      <div class="h-[408px] w-full rounded-[40px] overflow-hidden mt-4">
        <img class="h-full w-full object-cover" :src="championLeague" alt="" />
      </div>
      <div class="mt-[70px] flex justify-center">
        <div class="w-[1207px]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from "vue-router";
import championLeague from "../../assets/img/championLeague (2).png";
import { headerLeague } from "../../utils/headerLeague";

const { stt } = defineProps<{ stt: number }>();
onMounted(() => {});
// const route = useRoute();
</script>

<style scoped>
.background-quanlydoibong {
  background: rgba(255, 255, 255, 1);
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
</style>
