import { firebase } from '../firebase/config';

const alertRef = firebase.firestore().collection("alerts");

export function getAlerts(uuid, setAlerts) {
    let alerts = [];

    return alertRef
        .where("deviceId", "==", uuid)
        .onSnapshot(
            (querySnapshot) => {
                const newAlerts = [];
                querySnapshot.forEach((doc) => {
                    const alert = doc.data();
                    alert.id = doc.id;
                    newAlerts.push(alert);
                });
                alerts = newAlerts;
                setAlerts(alerts);
            });
}


export function deleteAlert(id) {
    const db = firebase.firestore();
    const batch = db.batch();
    batch.delete(alertRef.doc(id));
    batch.commit().then(() => {
        console.log("Alert erfolgreich gelöscht!");
    }).catch((error) => {
        console.log(error);
    });
}

export function updateAlertActive(isActive, id) {
    alertRef.doc(id).update({ isActive });
}
