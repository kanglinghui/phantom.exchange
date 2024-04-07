import { createApp } from "vue";
const ElementPlus = require("element-plus");
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Icons from "@element-plus/icons-vue";

import "./assets/styles/common.css";
import "./assets/styles/common.scss";

// import "@element-plus/icons";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn, size: "small",ElNotification: {
  offset: 24, // 设置偏移量为 24px
},ElMessage: {
  offset: 24, // 设置偏移量为 24px
},

});
const icons = Icons;
for (let i in icons) {
    app.component(i, icons[i]);
}

app.use(store).use(router).mount("#app");
