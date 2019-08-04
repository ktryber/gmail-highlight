import Vue from 'vue';
import vuetify from '../plugins/vuetify';
import App from './App.vue';

// eslint-disable-next-line no-new
new Vue({
  vuetify,
  el: '#app',
  render: h => h(App),
});
