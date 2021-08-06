import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import routes from "./routes";
NProgress.configure({ showSpinner: false });
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
