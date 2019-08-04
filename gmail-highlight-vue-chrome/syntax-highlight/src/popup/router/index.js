import firebase from 'firebase';
import Vue from 'vue';
import VueRouter from 'vue-router';
import PageIndex from './pages/Index.vue';
import Login from './pages/Login.vue';
import SignUp from './pages/SignUp.vue';
import Snippets from './pages/Snippets.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex,
      meta: {
        guest: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/snippets',
      name: 'Snippets',
      component: Snippets,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
  if (to.matched.some(rec => rec.meta.guest)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next({ name: 'Snippets' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
