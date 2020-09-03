import firebase from "firebase";
import "firebase/storage";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyB5WDXL5160cv4LrRtvrXNh-5NtYdEXnSo",
  authDomain: "eat24-1c86e.firebaseapp.com",
  databaseURL: "https://eat24-1c86e.firebaseio.com",
  projectId: "eat24-1c86e",
  storageBucket: "eat24-1c86e.appspot.com",
  messagingSenderId: "1067773898236",
  appId: "1:1067773898236:web:53ab3e2d5e7deba65d1679"
};
// Initialize Firebase
export const fb = firebase.initializeApp(config);
export const db = firebase.firestore();
