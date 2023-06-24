import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import useAuth from '../../hooks/useAuth';
import useGeoLocation from '../../hooks/useGeoLocation';
import styles from './styles';
import { useEffect } from 'react';

const EventsMap = ({ navigation }) => {
  const { isAuth, logout } = useAuth();

  const { requestGeoLocation } = useGeoLocation();

  const navigateToCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }]
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    requestGeoLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        {!isAuth ? (
          <TouchableOpacity
            onPress={navigateToLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sair</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.topBarText}>Mostrando os eventos próximos</Text>
      </View>
      <View style={styles.searchFieldContainer}>
        <Image
          style={styles.searchFieldIcon}
          resizeMode="center"
          source={require('../../../assets/search.png')}
        />
        <TextInput
          onSubmitEditing={() => {}}
          placeholder="Buscar eventos"
          inputMode="search"
          style={styles.searchFieldInput}
        />
      </View>
      <TouchableOpacity
        onPress={navigateToCreateEvent}
        style={styles.addEventButton}
      >
        <Text style={styles.addEventButtonText}>+</Text>
      </TouchableOpacity>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.mapView}
      >
        <Marker
          title="Titulo do evento"
          description="Descricao do evento"
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          image={require('../../../assets/chess-pin.png')}
        >
          <Callout tooltip>
            <View style={styles.calloutContentContainer}>
              <Text numberOfLines={3} style={styles.calloutText}>
                Titulo do Evento
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default EventsMap;
