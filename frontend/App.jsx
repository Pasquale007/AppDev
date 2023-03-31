import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/HomePage/HomePage';
import AlertPage from './pages/AlertPage/AlertPage';
import { Ionicons } from '@expo/vector-icons';
import {useFonts} from "expo-font";

const Tab = createBottomTabNavigator();
export default function App() {

  const [fontsLoaded] = useFonts({
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikSemiBold: require("./assets/fonts/Rubik-SemiBold.ttf"),
    RubikMedium: require("./assets/fonts/Rubik-Medium.ttf"),
    RubikRegular: require("./assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Alerts') {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })} >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Alerts" component={AlertPage} options={{ title: 'Alerts' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
