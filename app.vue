<template>
    <div class="home-root">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
</template>

<style>
.home-root {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Mobile specific */
@media (max-width:  768px) {
  .home-root {
    width: 100vw;
  }
}
</style>