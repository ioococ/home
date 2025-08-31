import { createApp } from "vue";
import "@/style/style.scss";
import "@/assets/FontAwesome/scss/fontawesome.scss";
import "@/assets/FontAwesome/js/all.js";
import App from "@/App.vue";
import { i18n } from '@/utils/i18n.js'
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ElMessage } from 'element-plus'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(i18n)
app.mount("#app");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  console.log("站点已更新，刷新后生效");
  ElMessage("站点已更新，刷新后生效");
});
