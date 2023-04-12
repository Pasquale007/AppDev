import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: "flexi-flight.firebaseapp.com",
    projectId: "flexi-flight",
    storageBucket: "flexi-flight.appspot.com",
    messagingSenderId: "899670161103",
    appId: "1:899670161103:web:3f4e6f6c323fc0d05529ba",
    measurementId: "G-9HF24WERBG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export { firebase };