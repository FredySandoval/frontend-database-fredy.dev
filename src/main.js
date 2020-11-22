import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

export const eventBus = new Vue();
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
