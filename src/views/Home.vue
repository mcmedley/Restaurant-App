<template>
  <div class="home">
    <Navbar></Navbar>
    <Hero />

    <Products></Products> -->
    <div class="container h-50">
      <!-- <div class="row p-5 h-100 justify-content-center align-items-center">
      </div> -->
    </div>
    <login></login>
    <login2></login2>
    <choice></choice>
    <Map></Map>
    <!-- <div class="row p-5 h-100 justify-content-center align-items-center"></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";
import Login2 from "@/components/Login2.vue";
import Choice from "@/components/Choice.vue";
import Map from "@/views/Map.vue";
export default {
  name: "home",
  components: {
    Hero,
    Products,
    Login,
    Login2,
    Choice,
    Map,
  },
};
</script>

<style>
.home {
  padding-bottom: 7rem;
}
</style>
