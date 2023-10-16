import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Screen1 from '../../screens/Screen1/Screen1';
import Screen2 from '../../screens/Screen2/Screen2';
import Screen3 from '../../screens/Screen3/Screen3';
import LoginScreen from '../../screens/loginScreen/LoginScreen';
import ForgotPassword from '../../screens/ForgotPassword/ForgotPassword';
import RecoverPassword from '../../screens/RecoverPassword/RecoverPassword';
import AddressRegisterScreen from '../../screens/RegisterScreen/AddressRegisterScreen/AddressRegisterScreen';
import UserProfileRegisterScreen from '../../screens/RegisterScreen/UserProfileRegisterScreen/UserProfileRegisterScreen';
import BottomTabNavigator from './BottomTab';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();
const Navigation = ({ firstTimeOnApp }) => {
  const url = Linking.useURL();
  const queryParams = url ? Linking.parse(url) : null;

  const initialScreen = url
    ? 'RecoverPassword'
    : firstTimeOnApp
    ? 'Screen1'
    : 'BottomTabNavigator';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0]
                  })
                }
              ]
            }
          }),
          headerShown: false
        }}
      >
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          initialParams={{ queryParams }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="AddressRegisterScreen"
          component={AddressRegisterScreen}
        />
        <Stack.Screen
          name="UserProfileRegisterScreen"
          component={UserProfileRegisterScreen}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
