import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { ifAuthenticated } from "@/firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/new",
    name: "new_post",
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { needAuth: true },
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
