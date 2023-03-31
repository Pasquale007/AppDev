import * as React from 'react';

export default function HomePage() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={SearchPage} />
        </Stack.Navigator>
    );
}