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
/* .absoluteMain {
  transform: translateY(-400px);
} */

/* Base styles */
.background-chinh {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-image: url(../assets/img/anh_12.png);
  background-size: cover;
  background-position: center;
  width: 100%;
  max-height: 1080px;
}
</style>
