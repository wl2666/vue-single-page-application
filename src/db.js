import firebase from "firebase";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAb24U4QLyucFSkPcj7Bi3r-JQfF034jCQ",
    authDomain: "vue-spas-exercise.firebaseapp.com",
    databaseURL: "https://vue-spas-exercise.firebaseio.com",
    projectId: "vue-spas-exercise",
    storageBucket: "vue-spas-exercise.appspot.com",
    messagingSenderId: "400142666998",
    appId: "1:400142666998:web:6bba42daa1d14997c2b0d7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();
