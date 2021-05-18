import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.filter("formatDate", (date) => date && moment(date).format("DD/MM/YYYY"));

new Vue({
  render: (h) => h(App)
}).$mount("#app");
