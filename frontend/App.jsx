import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/HomePage/HomePage';
import AlertPage from './pages/AlertPage/AlertPage';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";

import { COLORS } from './constants/theme';
import Splash from './pages/Splash/splash'

const Tab = createBottomTabNavigator();
export default function App() {

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

  return (
    <NavigationContainer >
   <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
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
      <Splash />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Alerts" component={AlertPage} options={{ title: 'Alerts' }} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};
