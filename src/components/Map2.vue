<template>
  <div class="map2">
    <Navbar></Navbar>
    <login></login>
    <login2></login2>
    <choice></choice>
    <Experiment></Experiment>
  </div>
</template>

<script>
// @ is an alias to /src
import Productslist from "@/sections/ProductsList.vue";
import Login from "@/components/Login.vue";
import Login2 from "@/components/Login2.vue";
import Choice from "@/components/Choice.vue";
import Experiment from "@/views/Experiment.vue";
export default {
  name: "Map2",
  components: {
    Productslist,
    Login,
    Login2,
    Choice,
    Experiment,
  },
};
</script>

<style></style>
