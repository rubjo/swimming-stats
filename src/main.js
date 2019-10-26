import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'

import { Select, Option, Switch, Row, Col } from 'element-ui'

Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
