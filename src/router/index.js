import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../pages/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../pages/Register.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("../pages/Users.vue"),
      },
      {
        path: "/all-places",
        name: "AllPlaces",
        component: () => import("../pages/AllPlaces.vue"),
      },
      {
        path: "/place/:id",
        name: "Place",
        component: () => import("../pages/Place.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
  mode: "history",
});

export default router;
