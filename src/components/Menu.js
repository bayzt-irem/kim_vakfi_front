export const Menu = [
  {
    name: "Anasayfa",
    path: "home",
    fullPath: "home",
    selectedMenu: "Home",
    component: () => import("../pages/Home.vue"),
    icon: "home",
  },
  {
    name: "Reklamlar",
    icon: "expand_more",
    children: [
      {
        name: "Satın Alınan Planlar",
        path: "advert/purchases/special",
        fullPath: "/advert/purchases/:type",
        selectedMenu: "Purchases",
        icon: "campaign",
      },
      {
        name: "Restoran Kuponları",
        path: "advert/restaurant-coupons",
        fullPath: "/advert/restaurant-coupons",
        selectedMenu: "RestaurantCoupons",
        icon: "campaign",
      },
      {
        name: "Planlar",
        path: "advert/plans/prominence",
        fullPath: "/advert/plans/:type",
        selectedMenu: "Plans",
        icon: "campaign",
      },
    ],
  },
];
