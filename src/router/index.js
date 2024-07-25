// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Start from "@/components/routes/Start.vue";
import ErrorPage from "@/components/routes/ErrorPage.vue";
import Profile from "@/components/routes/Profile.vue";
import Admin from "@/components/routes/Admin.vue";
import Register from "@/components/routes/Register.vue";
import Login from "@/components/routes/Login.vue";

const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Start,
  },
  {
    path: "/start",
    name: "start",
    component: Start,
  },
  {
    path: "/feed",
    name: "following",
    component: Start,
  },
  {
    path: "/profile/:userId",
    name: "profile",
    component: Profile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "adminPage",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
