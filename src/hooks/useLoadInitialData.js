import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import * as Font from 'expo-font';
import useAuth from './useAuth';

//fiz esse hook separado pensando que já poderia ser usada futuramente para fazer fetch
function useLoadInitialData() {
  const [isReady, setIsReady] = useState(false);
  const [firstTimeOnApp, setFirstTimeOnApp] = useState(true);
  const {
    setIsAuth,
    setUser,
    setRequests,
    setEvents,
    setAddress,
    setAuthToken
  } = useAuth();

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

      const authToken = await AsyncStorage.getItem('token');

      if (authToken) {
        const user = await api
          .post(
            '/auth',
            {},
            {
              headers: {
                authorization: `Bearer ${authToken}`
              }
            }
          )
          .then(res => res.data)
          .catch(() => null);

        if (user) {
          setIsAuth(true);

          setAddress(user.address);
          delete user.address;

          setRequests(user.requests);
          delete user.requests;

          setEvents(user.events);
          delete user.events;

          setAuthToken(authToken);
          setUser(user);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      alert('Something went wrong!');
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
