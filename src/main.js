import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppDate from '@/components/AppDate'
import firebase from 'firebase'
import vuelidate from 'vuelidate'

Vue.component('AppDate', AppDate) // global component

Vue.use(vuelidate)
Vue.config.productionTip = false

const firebaseConfig = {
  // apiKey: 'AIzaSyBKHeyiQUh9QPI0LlIlMMc5XZb3Xo8O7lM',
  // authDomain: 'mamicamp-master-class.firebaseapp.com',
  // databaseURL: 'https://mamicamp-master-class.firebaseio.com',
  // projectId: 'mamicamp-master-class',
  // storageBucket: 'mamicamp-master-class.appspot.com',
  // messagingSenderId: '470148142193',
  // appId: '1:470148142193:web:61f1f7b537b2dee8aef7d0',
  // measurementId: 'G-0Z8K13VZ6S'
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  components: { App },
}).$mount('#app')
