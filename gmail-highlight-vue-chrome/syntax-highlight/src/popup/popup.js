import Vue from 'vue';
import vuetify from '../plugins/vuetify';
import App from './App';
import router from './router';
import store from './store';

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  store,
  render: h => h(App),
});
