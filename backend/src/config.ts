import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Alert} from "./parseAlerts";

const firebaseConfig = {
    //eslint-disable-next-line no-undef
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "flexi-flight.firebaseapp.com",
    projectId: "flexi-flight",
    storageBucket: "flexi-flight.appspot.com",
    messagingSenderId: "899670161103",
    appId: "1:899670161103:web:3f4e6f6c323fc0d05529ba",
    measurementId: "G-9HF24WERBG"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export async function getActiveItems(): Promise<any[]> {
    const itemsRef = firestore.collection('alerts');
    const querySnapshot = await itemsRef.where('isActive', '==', true).get();
    const activeItems: any[] = [];
    querySnapshot.forEach((doc: any) => {
        activeItems.push({ id: doc.id, ...doc.data() });
    });
    return activeItems;
}

export async function setAlreadyAlerted(alert: Alert): Promise<boolean>{
    const db = firebase.firestore();

    await db.collection("alerts").doc(alert.id).update({alreadyAlerted: alert.alreadyAlerted});

    return true
}

