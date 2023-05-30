import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/HomePage/HomePage';
import AlertPage from './pages/AlertPage/AlertPage';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { polyfillWebCrypto } from "expo-standard-web-crypto";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { COLORS } from './constants/theme';
import Splash from './pages/SplashPage/Splash';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

polyfillWebCrypto();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const Tab = createBottomTabNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;

    //Configuring Notification on Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    //Notifications cant be send on emulators, so we have to check if it is a real device
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      //Ask user for permission to send notifications to them
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId: "784e3e08-c80d-45aa-aebc-9a3c8f5440c0" })).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  const [fontsLoaded] = useFonts({
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikSemiBold: require("./assets/fonts/Rubik-SemiBold.ttf"),
    RubikMedium: require("./assets/fonts/Rubik-Medium.ttf"),
    RubikRegular: require("./assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) return null;
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.background
    },
  };

  return (isLoading
    ? <Splash setIsLoading={() => setIsLoading(false)} />
    : <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme} style={{ flex: 1 }}>
        <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              borderTopWidth: 0, paddingBottom: 0, ...(Platform.OS === 'ios' && {
                height: 80,
                borderBottomColor: COLORS.navigationBar,
                borderBottomWidth: 20,
              }),
            },
            tabBarHideOnKeyboard: true,
            headerShown: false,
            unmountOnBlur: true,
          tabBarActiveTintColor: COLORS.navIconActive,
            tabBarInactiveTintColor: COLORS.navIconInactive,
            tabBarActiveBackgroundColor: COLORS.navigationBar,
            tabBarInactiveBackgroundColor: COLORS.navigationBar,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Alerts') {
                iconName = focused ? "notifications" : "notifications-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>

          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Tab.Screen name="Alerts" component={AlertPage} options={{ title: 'Alerts' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView >
  );
}
