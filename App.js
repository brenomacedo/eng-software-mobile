import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import useLoadInitialData from './src/hooks/useLoadInitialData';
import Navigation from './src/screens/Navigation/Navigation';

// SplashScreen.preventAutoHideAsync();

export default function App () {
  //  const { isReady } = useLoadInitialData();

  //  const onLayoutRootView = useCallback(async () => {
  //    if (isReady) await SplashScreen.hideAsync();
  //  }, [isReady]);

  //  if (!isReady) return null;
 
  return (
     <Navigation/>
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



