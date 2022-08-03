import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalendarView from "../views/CalendarView.vue";
import NotFound from "../views/NotFound.vue";

import { useMainStore } from "@/stores/MineStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/calendar/:calendarId",
    name: "calendar",
    component: CalendarView,
    props: true,
    beforeEnter: (to, from, next) => {
      const { checkIfThereIsCalendar, switchIncorrectCodeEntered } =
        useMainStore();

      checkIfThereIsCalendar(to.params.calendarId as string).then(
        (response) => {
          if (!response.error) {
            next();
          } else {
            next(false);
            switchIncorrectCodeEntered(true);
          }
        }
      );
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
