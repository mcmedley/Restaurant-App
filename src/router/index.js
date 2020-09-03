import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Admin2 from "../views/Admin2.vue";
import Location from "../views/Location.vue";
import Products from "../views/Products.vue";
import Profile from "../views/Profile.vue";
import Menu from "../views/Menu.vue";
import Orders from "../views/Orders.vue";
import Last from "../views/Last.vue";
import { fb } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "location",
        name: "location",
        component: Location,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
    ],
  },
  {
    path: "/admin2",
    name: "admin2",
    component: Admin2,
    meta: { requiresAuth: true },
    children: [
      {
        path: "location",
        name: "location",
        component: Location,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
	  {
        path: "menu",
        name: "menu",
        component: Menu,
      },
	  {
        path: "orders",
        name: "orders",
        component: Orders,
      },
	  {
        path: "last",
        name: "last",
        component: Last,
      },
	  
    ],
  },
  {
    path: "/menu",
    name: "Menu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Menu.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
