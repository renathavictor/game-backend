import firebase from 'firebase/app';
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAgg_XR7DYaIpHdF8u6asFmG2e0sA7XTNk",
  authDomain: "dungeon-seeker.firebaseapp.com",
  databaseURL: "https://dungeon-seeker.firebaseio.com",
  projectId: "dungeon-seeker",
  storageBucket: "dungeon-seeker.appspot.com",
  messagingSenderId: "868468174782",
  appId: "1:868468174782:web:cc63e578fbc81b39f6d3ef"
};

// Initialize Firebase
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseClass = firebaseDB.ref('class'); // fazer um para cada tipo
const firebaseSeeker = firebaseDB.ref('seeker');

export {
  firebase,
  firebaseDB,
  firebaseClass,
  firebaseSeeker
}