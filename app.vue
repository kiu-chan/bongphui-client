<template>
  <div class="home-root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initAuth();
});
</script>

<style>
.home-root {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Mobile specific */
@media (max-width: 768px) {
  .home-root {
    width: 100vw;
  }
}
</style>