import { useEffect, useState } from 'react';
import { firebase } from './firebase/config';

const alertRef = firebase.firestore().collection("alerts");

export function getAlerts(uuid) {
    const [alerts, setAlerts] = useState([]);
    
    useEffect(() => {
        let unsubscribe;
    
        if (uuid) {
          unsubscribe = alertRef
            .where("deviceId", "==", uuid)
            .onSnapshot(
              (querySnapshot) => {
                const newAlerts = [];
                querySnapshot.forEach((doc) => {
                  const alert = doc.data();
                  alert.id = doc.id;
                  newAlerts.push(alert);
                });
                setAlerts(newAlerts);
              },
              (error) => {
                console.log(error);
              }
            );
        }
    
        //Cleanup
        return () => {
          unsubscribe && unsubscribe();
        };
      }, [uuid]);
    
      return alerts;
}
