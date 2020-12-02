import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import API from './plugins/api';
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'


Vue.config.productionTip = false
Vue.prototype.$http = API;


Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:3000'),
}))


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
