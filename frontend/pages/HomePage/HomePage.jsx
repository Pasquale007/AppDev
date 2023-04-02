import * as React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomePage() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Search" component={SearchPage} />
        </Stack.Navigator>
    );
}