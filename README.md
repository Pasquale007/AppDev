# Mobile App Development

## Vorruassetzungen
Node v16.15.0
npm 8.5.5

## Setup

### Frontend
#### Debugging
Folgender Befehl fmuss im frontend Ordner ausgeführt werden um das Fronend zu starten:
```
npm start
```
Daraufhin öffnet sich in der Console ein QRCode.
Es wird die App "expo" dem Testgerät (also dein Handy) benötigt um den QR Code zu lesen. Im AppStore oder Playstore installieren.
#### Build

Um ein Build für Android zu erstellen muss folgender Befehl eingegeben werden:

```
eas build --profile development --platform android 
```

### Backend
Folgender Befehl muss im backend Order ausgeführt werden um das Backend zu starten:
```
```

### APK erstellen (Android)
<b>!Sollte es zu einem Authentifizierungsproblem kommen, so sollte versucht werden, die "projectId" aus der app.json-Datei zu löschen!</b>

Um eine APK dieser App für Android zu erstellen, muss folgendes getan werden:

1. Folgende Dependencies sollten installiert werden
```
npm install @react-navigation/native

npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/stack

npx expo install react-native-gesture-handler

npx expo install @react-native-masked-view/masked-view
```

2. EAS CLI installieren
```
npm install -g eas-cli
```
3. Expo-Account auf <a href="https://expo.dev/" target="_blank">expo.dev</a> erstellen, falls noch nicht vorhanden. Gegebenenfalls werden wir auf einen gemeinsamen Account umsteigen.

4. Im Terminal mit dem Expo-Account anmelden
```
eas login
```
5. Konfigurieren eines Android Projekts für EAS Build
```
eas build:configure
```
6. Erstellen der APK
```
eas build -p android --profile preview 
```

Nach einem erfolgreichen Build kann die APK auf <a href="https://expo.dev/" target="_blank">expo.dev</a> heruntergeladen werden. 

### Server
Folgender Befehl muss im server Order ausgeführt werden um dan Server zu starten:
```
```
