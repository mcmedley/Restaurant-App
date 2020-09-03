<template>
  <div class="hero">
    <div class="container h-100">
      <div class="row h-10 justify-content-center align-items-center">
        <div class="col-5">
          <div class="hero-content">
            <h1 class="title">Eat Whatever, Eat Whenever.</h1>
            <p class="title2">
              Get started in signing up with Eat24! Either sign up to be a
              customer or to be a participating restaurant.
            </p>
            <div class="hero-btn mt-5">
              <button
                class="btn custom-btn btn-info mr-4"
                data-toggle="modal"
                data-target="#login2"
              >
                Order
              </button>
              <button
                class="btn custom-btn btn-outline-secondary"
                data-toggle="modal"
                data-target="#login"
              >
                Deliver
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="graphic">
            <img src="/img/logo.png" class="eat" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.hero {
  padding-top: 7rem;
  width: 100%;
  height: 650px;
  text-align: left;
  background-image: url("/img/yur.jpg");
  background-size: cover;
}
</style>

<style scope lang="scss">
.eat {
  width: 600px;
  height: 385px;
}
</style>

<style scope lang="scss">
.title {
  font-weight: 850;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>

<style scope lang="scss">
.title2 {
  color: white;
  font-weight: 600;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
