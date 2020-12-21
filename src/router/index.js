import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/PageHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pie-chart",
    name: "PieChart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/PagePieChart.vue")
  },
  {
    path: "/inicio-jornada",
    name: "InicioJornada",
    component: () => import("../views/PageInicioJornada.vue")
  },
  {
    path: "/turnos-partidos",
    name: "TurnosPartidos",
    component: () => import("../views/PageTurnosPartidos.vue")
  },
  {
    path: "/absentismos-programados",
    name: "AbsentismosProgramados",
    component: () => import("../views/PageAbsentismosProgramados.vue")
  },
  {
    path: "/horas-extra",
    name: "HorasExtra",
    component: () => import("../views/PageHorasExtra.vue")
  },
  {
    path: "/horas-extra",
    name: "HorasExtra",
    component: () => import("../views/PageHorasExtra.vue")
  },
  {
    path: "/inicio-con-absentismo-programado",
    name: "InicioConAbsentismoProgramado",
    component: () => import("../views/PageInicioConAbsentismoProgramado.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
