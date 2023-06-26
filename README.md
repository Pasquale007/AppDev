# Mobile App Development

## Vorraussetzungen
Node v16.15.0
npm 8.5.5

## Setup

### Frontend

Folgender Befehl muss im frontend-Ordner ausgeführt werden, um das Fronend zu starten:
```
npm start
```
Daraufhin öffnet sich in der Console ein QR-Code.
Es wird die App "expo" auf dem Testgerät (also dein Handy) benötigt, um den QR Code zu lesen. Über den [AppStore](https://apps.apple.com/de/app/expo-go/id982107779) oder [Google Playstore](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) installieren.

### Backend
Das Backend muss nicht extra gestartet werden, da es bereits auf einem Server läuft und sich die App automatisch mit diesem verbindet.

### Android/iOS Build erstellen

Um einen Build dieser App zu erstellen, muss folgendes getan werden:

1. Folgende Dependencies müssen installiert werden:
```
npm install @react-navigation/native

npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/stack

npx expo install react-native-gesture-handler

npx expo install @react-native-masked-view/masked-view
```

2. EAS CLI installieren:
```
npm install -g eas-cli
```
3. Expo-Account auf <a href="https://expo.dev/" target="_blank">expo.dev</a> erstellen, falls noch nicht vorhanden.

4. Im Terminal mit dem Expo-Account anmelden:
```
eas login
```
5. Konfigurieren eines Android Projekts für EAS Build:
```
eas build:configure
```
6. Erstellen der APK:
```
eas build -p android --profile preview 
```
oder

Erstellen des Apple Builds:
```
eas build -p ios --profile preview 
```

Nach einem erfolgreichen Build kann die App auf <a href="https://expo.dev/" target="_blank">expo.dev</a> heruntergeladen werden. 

