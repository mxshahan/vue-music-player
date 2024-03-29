import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTimers from "vue-timers";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import moment from "moment";
Vue.prototype.moment = moment;

Vue.use(VueTimers);
Vue.use(require("vue-moment"));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

export const bus = new Vue();
