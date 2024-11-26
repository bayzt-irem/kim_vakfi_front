export const Menu = [
  {
    name: "Konumlar",
    path: "all-places",
    fullPath: "all-places",
    selectedMenu: "AllPlaces",
    component: () => import("../pages/AllPlaces.vue"),
    icon: "location_on",
  },
  {
    name: "Kullanıcılar",
    path: "users",
    fullPath: "users",
    selectedMenu: "users",
    component: () => import("../pages/Users.vue"),
    icon: "people",
  },
];
