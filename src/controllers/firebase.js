// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB52n2XQX_lDgVvMhTz6C3amEWO1tGuFHk",
  authDomain: "december-blogs.firebaseapp.com",
  projectId: "december-blogs",
  storageBucket: "december-blogs.appspot.com",
  messagingSenderId: "706644880905",
  appId: "1:706644880905:web:5352cd82c8edb7757712d8",
  measurementId: "G-E2H1LG49CL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics
firebase.analytics();

const storage = firebase.storage();
export { storage, firebase as default };
