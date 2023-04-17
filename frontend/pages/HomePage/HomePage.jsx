import * as React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../constants/theme';
import FlightResultPage from '../FlightResultPage/FlightResultPage';

const Stack = createStackNavigator();

export default function HomePage() {
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };
    return (
        <Stack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerShown: false,
                backgroundColor: COLORS.background,
            }}>
            <Stack.Screen name="FlightResultPage" component={FlightResultPage} />
            <Stack.Screen
                name="Search"
                component={SearchPage}
                options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}

            />
        </Stack.Navigator>
    );
}