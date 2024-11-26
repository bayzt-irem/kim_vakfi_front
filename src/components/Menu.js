export const Menu = [
  {
    name: "Anasayfa",
    path: "home",
    fullPath: "home",
    selectedMenu: "home",
    component: () => import("../pages/Home.vue"),
    icon: "home",
  },
  {
    name: "Kullanıcılar",
    path: "users",
    fullPath: "users",
    selectedMenu: "users",
    component: () => import("../pages/Users.vue"),
    icon: "people",
  },
  {
    name: "Konumlar",
    path: "all-places",
    fullPath: "all-places",
    selectedMenu: "AllPlaces",
    component: () => import("../pages/AllPlaces.vue"),
    icon: "location_on",
  },
];
