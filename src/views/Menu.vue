<template>
  <div class="menu">
    <Productslist></Productslist>
    <login></login>
    <login2></login2>
    <choice></choice>
  </div>
</template>

<script>
// @ is an alias to /src
import Productslist from "@/sections/ProductsList.vue";
import Login from "@/components/Login.vue";
import Login2 from "@/components/Login2.vue";
import Choice from "@/components/Choice.vue";
export default {
  name: "Menu",
  components: {
    Productslist,
    Login,
    Login2,
    Choice,
  },
};
</script>

<style>
.menu {
  /* background: lightblue; */
  /* background-image: url("/img/bg.jpg"); */
  padding-bottom: 3rem;
}
</style>
