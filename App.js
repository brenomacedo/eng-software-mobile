import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import useLoadInitialData from './src/hooks/useLoadInitialData';
import LoginScreen from './src/screens/loginScreen/LoginScren';
import AddressRegisterScreen from './src/screens/RegisterScreen/AddressRegisterScreen/AddressRegisterScreen';
import UserProfileRegisterScreen from './src/screens/RegisterScreen/UserProfileRegisterScreen/UserProfileRegisterScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isReady } = useLoadInitialData();
  const Stack = createStackNavigator();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animationEnabled: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="UserProfileRegister"
            component={UserProfileRegisterScreen}
          />
          <Stack.Screen
            name="AddressRegister"
            component={AddressRegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});

{
  /* <View style={styles.container} onLayout={onLayoutRootView}>
      <SignUpScreen />
    </View> */
}
