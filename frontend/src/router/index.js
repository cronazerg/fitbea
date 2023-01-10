import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/account/Login.vue";
import Register from "../views/account/Register.vue"

const routes = [
    {
        path: "/account/login",
        name: "login",
        component: Login,
        meta: {
            title: "Zaloguj się",
        },
    },
    {
        path: "/account/register",
        name: "register",
        component: Register,
        meta: {
            title: "Rejestracja",
        },
    },
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "Strona główna",
        },
    },
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