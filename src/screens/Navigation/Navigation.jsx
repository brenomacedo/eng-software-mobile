import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Screen1 from '../Screen1/Screen1';
import Screen2 from '../Screen2/Screen2';
import Screen3 from '../Screen3/Screen3';

const Stack = createStackNavigator();
 
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
        screenOptions={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({inputRange: [0, 1], outputRange: [1000, 0],}),
                },
               ],
            },
          }),
        }}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
    
export default Navigation;
