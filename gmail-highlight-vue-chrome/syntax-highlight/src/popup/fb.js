import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApzAYr2Qy6xJewkx8Br4-jg-68b0LHDTE',
  authDomain: 'todo-ninja-6632e.firebaseapp.com',
  databaseURL: 'https://todo-ninja-6632e.firebaseio.com',
  projectId: 'todo-ninja-6632e',
  storageBucket: 'todo-ninja-6632e.appspot.com',
  messagingSenderId: '34513500156',
  appId: '1:34513500156:web:9e00a62338e90f48',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
