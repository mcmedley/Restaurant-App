<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          style="max-width:100px; margin-top: -7px;"
          src="/img/public_img_logo.png"
          alt=""
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/menu" class="nav-link">Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link ">My Account</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <!-- <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />-->
          <a
            class="btn btn-outline-success my-2 my-sm-0"
            data-toggle="modal"
            data-target="#choice"
            >Get Started</a
          >
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
