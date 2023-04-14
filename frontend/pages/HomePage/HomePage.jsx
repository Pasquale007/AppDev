import * as React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../constants/theme';
import FlightResultPage from '../FlightResultPage/FlightResultPage';

const Stack = createStackNavigator();

export default function HomePage() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                backgroundColor: COLORS.background,
            }}>
            <Stack.Screen name="FlightResultPage" component={FlightResultPage} />
            <Stack.Screen name="Search" component={SearchPage} />
        </Stack.Navigator>
    );
}