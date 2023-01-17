import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Strona główna",
    },
  },
  {
    path: "/account/login",
    name: "login",
  component: () => import("../views/account/Login.vue"),
    meta: {
      title: "Zaloguj się",
    },
  },
  {
    path: "/account/register",
    name: "register",
    component: () => import("../views/account/Register.vue"),
    meta: {
      title: "Rejestracja",
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/users/List.vue"),
    meta: {
      title: "Użytkownicy",
    },
  },
  {
    path: "/users/addEdit",
    name: "addEdit",
    component: () => import("../views/users/AddEdit.vue"),
    meta: {
      title: "Dodaj/Edytuj",
    },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/calendar/Calendar.vue"),
    meta: {
      title: "Kalendarz",
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = "fitbea" + (to.meta.title ? " - " + to.meta.title : "");
  next();
});

export default router;