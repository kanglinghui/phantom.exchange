const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "控制台",
      head: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/index.vue"),
  },
  {
    path: "/marketSimulation",
    name: "marketSimulation",
    meta: {
      head: true,
      title: "行情模拟",
      exit: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/market_simulation/index.vue"
      ),
  },
];
export default routes;
