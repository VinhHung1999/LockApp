import * as firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyDTQVfxub0E2BMNB2cBCEr3s4T4V4OF2sM",
    authDomain: "lockshopdb.firebaseapp.com",
    databaseURL: "https://lockshopdb.firebaseio.com",
    projectId: "lockshopdb",
    storageBucket: "lockshopdb.appspot.com",
    messagingSenderId: "852254312713",
    appId: "1:852254312713:web:e07efbc978544902896bd8",
    measurementId: "G-RYES1NT5EQ"
};
  // Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);