<template>
  <div class="background-chinh">
    <Navbar class="header" />
    <NuxtPage class="absoluteMain w-full" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "../component/Navbar.vue";
import Footer from "../component/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
/* Base styles */
.background-chinh {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url(../assets/img/anh_12.png);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .background-chinh {
    background-size: cover;
    background-attachment: scroll;
  }
  
  .absoluteMain {
    width: 100%;
    padding: 0 1rem;
  }
}

@media (max-width: 390px) {
  .background-chinh {
    min-height: 100vh;
    width: 100vw;
  }
}
</style>