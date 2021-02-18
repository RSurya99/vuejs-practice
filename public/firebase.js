// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAFBiIHu-ZiC-KiJak7AnzY4zA5GIHiMdc",
    authDomain: "vuejs-first-project-6b717.firebaseapp.com",
    projectId: "vuejs-first-project-6b717",
    storageBucket: "vuejs-first-project-6b717.appspot.com",
    messagingSenderId: "992367508077",
    appId: "1:992367508077:web:27fd4d165ad1dcfc6b5d64"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const kelasRef = database.ref('kelas');