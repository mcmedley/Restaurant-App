import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
import Swal from "sweetalert2";
window.Swal = Swal;
import "./plugins/vuetify";
import VueCarousel from "vue-carousel";
import Vue2Filters from "vue2-filters";
import vuetify from "./plugins/vuetify";
import VueGeolocation from "vue-browser-geolocation";
Vue.use(VueCarousel);
Vue.use(Vue2Filters);
Vue.use(VueFirestore);

Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true, //  whether it is enumerable or not. Default is true.
});

// Vue.use(VueGeolocation);
// import * as VueGoogleMaps from "vue2-google-maps";
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyAw1hclYoTxMTLkhN6YzdJoC42s-OAMo8Q",
//   },
// });

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

window.Toast = Toast;

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("Hero", require("./components/Hero.vue").default);
Vue.component("ProductsList", require("./sections/ProductsList.vue").default);
Vue.component("Admin", require("./views/Admin.vue").default);
Vue.component("Admin2", require("./views/Admin2.vue").default);
Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
