import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles/common.css";
import "./assets/styles/common.scss";

// import "@element-plus/icons";

const app = createApp(App);
app.use(ElementPlus, {
  size: "mini",
});

app.use(store).use(router).mount("#app");
