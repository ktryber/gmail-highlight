/* eslint-disable no-shadow */
import firebase from 'firebase';
import db from '../fb';
import router from '../router';

const state = {
  feedback: null,
};

const mutations = {
  SET_FEEDBACK(state, payload) {
    state.feedback = payload;
  },
};

const actions = {
  postLogin(context, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        router.push({ name: 'Snippets' });
        context.commit('SET_FEEDBACK', null);
      })
      .catch(error => {
        context.commit('SET_FEEDBACK', error);
        router.push({ name: 'Login' });
      });
  },
  postLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push({ name: 'Login' });
      });
  },
  postRegister(context, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(credential => {
        const user = {
          first_name: payload.first_name,
          last_name: payload.last_name,
          user_id: credential.user.uid,
        };
        db.collection('users')
          .add(user)
          .then(() => {
            router.push({ name: 'Snippets' });
          });
      })
      .catch(error => {
        context.commit('SET_FEEDBACK', error);
        router.push({ name: 'Register' });
      });
  },
};

const getters = {
  authFeedback(state) {
    return state.feedback;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
