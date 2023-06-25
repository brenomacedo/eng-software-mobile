import { createContext, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const GeoLocationContext = createContext({});

const GeoLocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [hasGeolocationPermission, setHasGeolocationPermission] =
    useState(false);

  const requestGeoLocation = async () => {
    let granted = true;
    if (!hasGeolocationPermission) {
      const { status } = await Location.requestForegroundPermissionsAsync();

      granted = status === 'granted';
      setHasGeolocationPermission(granted);
    }

    if (granted) {
      const location = await Location.getCurrentPositionAsync();
      setLocation(location.coords);
    } else {
      Alert.alert(
        'Erro',
        'O aplicativo não possui permissão de geolocalização, você pode alterar isso nas configurações'
      );
    }
  };

  return (
    <GeoLocationContext.Provider
      value={{
        location,
        requestGeoLocation
      }}
    >
      {children}
    </GeoLocationContext.Provider>
  );
};

export { GeoLocationContext, GeoLocationProvider };
