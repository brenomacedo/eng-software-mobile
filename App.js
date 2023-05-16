import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import useLoadInitialData from './src/hooks/useLoadInitialData';
import LoginScreen from './src/screens/loginScreen/LoginScren';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isReady } = useLoadInitialData();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
