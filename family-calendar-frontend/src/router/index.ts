import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalendarView from "../views/CalendarView.vue";
import NotFound from "../views/NotFound.vue";

import { useMainStore } from "@/stores/MainStore";
import { useCalendarApiStore } from "@/stores/CalendarApiStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: () => {
      const { setCalendarHash } = useCalendarApiStore();
      setCalendarHash("");
    },
  },
  {
    path: "/calendar/:calendarId",
    name: "calendar",
    component: CalendarView,
    props: true,
    beforeEnter: (to, from, next) => {
      const { switchIncorrectCodeEntered } = useMainStore();
      const { checkIfThereIsCalendar, setCalendarHash } = useCalendarApiStore();

      checkIfThereIsCalendar(to.params.calendarId as string).then(
        (response) => {
          if (!response.error) {
            setCalendarHash(to.params.calendarId as string);
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
