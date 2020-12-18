import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/inicio-jornada",
    name: "InicioJornada",
    component: () => import("../views/InicioJornada.vue")
  },
  {
    path: "/turnos-partidos",
    name: "TurnosPartidos",
    component: () => import("../views/InicioJornada.vue")
  },
  {
    path: "/absentismos-programados",
    name: "AbsentismosProgramados",
    component: () => import("../views/AbsentismosProgramados.vue")
  },
  {
    path: "/horas-extra",
    name: "HorasExtra",
    component: () => import("../views/HorasExtra.vue")
  },
  {
    path: "/horas-extra",
    name: "HorasExtra",
    component: () => import("../views/HorasExtra.vue")
  },
  {
    path: "/inicio-con-absentismo-programado",
    name: "InicioConAbsentismoProgramado",
    component: () => import("../views/InicioConAbsentismoProgramado.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
