import { firebase } from '../firebase/config';

const alertRef = firebase.firestore().collection("alerts");

export async function safeAlert(alert) {
    console.log(alert);

    return await alertRef.add(alert).then((docRef) => {
        console.log("Alert erstellt mit der ID: ", docRef.id);
    })
        .catch((error) => {
            console.log("Fehler beim Speichern des Alerts: ", error);
            throw error;
        });
}

export function getAlerts(deviceToken, setAlerts) {
    let alerts = [];

    return alertRef
        .where("deviceId", "==", deviceToken)
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

export async function getAlert(id) {
    const alertIdRef = alertRef.doc(id);
    return alertIdRef.get();
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