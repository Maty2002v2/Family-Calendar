import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PageInitCalendar from "@/pages/PageInitCalendar.vue";
import PageCalendar from "@/pages/PageCalendar.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

import { useMainStore } from "@/stores/MainStore";
import { useCalendarApi } from "@/composables/useCalendarApi";
import { useLocalStorage } from "@/composables/useLocalStorage";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: PageInitCalendar,
    beforeEnter: () => {
      const localStorageCalendarId = useLocalStorage('calendarId');
      const { setCalendarHash } = useCalendarApi();
      
      if(localStorageCalendarId.value) {
        setCalendarHash(localStorageCalendarId.value);
        return { name: 'calendar', params: { calendarId: localStorageCalendarId.value }};
      }
      setCalendarHash("");
    },
  },
  {
    path: "/calendar/:calendarId",
    name: "calendar",
    component: PageCalendar,
    props: true,
    beforeEnter: (to, from, next) => {
      const { switchIncorrectCodeEntered } = useMainStore();
      const { checkIfThereIsCalendar, setCalendarHash } = useCalendarApi();

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
    component: PageNotFound,
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
