import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

//fiz esse hook separado pensando que já poderia ser usada futuramente para fazer fetch
function useLoadInitialData() {
  const [isReady, setIsReady] = useState(false);
  const [firstTimeOnApp, setFirstTimeOnApp] = useState(true);
  /* const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Light.ttf')
  }); */

  async function fetchData() {
    try {
      /*  if (!fontsLoaded) return null; */
      await Font.loadAsync({
        Poppins: require('../../assets/fonts/Poppins-Light.ttf'),
        PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
        PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf')
      });

      const firstTimeOnAppJson = await AsyncStorage.getItem('firstTimeOnApp');
      const firstTimeOnApp = JSON.parse(firstTimeOnAppJson);

      if (firstTimeOnApp != null && !firstTimeOnApp) {
        setFirstTimeOnApp(false);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      alert('Something went wrong!');
      console.warn(error);
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { isReady, firstTimeOnApp };
}

export default useLoadInitialData;
