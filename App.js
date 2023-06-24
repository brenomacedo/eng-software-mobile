import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import useLoadInitialData from './src/hooks/useLoadInitialData';
import Navigation from './src/components/Navigation/Navigation';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isReady, firstTimeOnApp } = useLoadInitialData();

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <Navigation firstTimeOnApp={firstTimeOnApp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
