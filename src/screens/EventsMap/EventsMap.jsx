import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import useAuth from '../../hooks/useAuth';
import useGeoLocation from '../../hooks/useGeoLocation';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../api';
import data from '../CreateEventScreen/mockData';

const EventsMap = ({ navigation }) => {
  const { isAuth, logout, authToken } = useAuth();

  const { requestGeoLocation, location } = useGeoLocation();
  const [nearestEvents, setNearestEvents] = useState([]);

  const navigateToCreateEvent = () => {
    if (!isAuth) return navigateToLogin();
    navigation.navigate('CreateEvent');
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const navigateToDetails = event => {
    navigation.navigate('EventDetails', event);
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

  const fetchEvents = async () => {
    let events;

    if (isAuth) {
      events = await api
        .get(
          `/event?latitude=${location.latitude}&longitude=${location.longitude}&distance=100000`,
          {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          }
        )
        .then(res => res.data)
        .catch(err => {
          if (err.response && err.response.status === 401) {
            Alert.alert('Erro', 'Sessão expirada');
            handleLogout();
          } else if (
            err.response &&
            err.response.data &&
            err.response.data.error
          ) {
            Alert.alert('Erro', err.response.data.error);
          }

          return [];
        });
    } else {
      events = await api
        .get(
          `/event/all?latitude=${location.latitude}&longitude=${location.longitude}&distance=100000`
        )
        .then(res => res.data)
        .catch(err => {
          if (err.response && err.response.data && err.response.data.error) {
            Alert.alert('Erro', err.response.data.error);
          }

          return [];
        });
    }

    setNearestEvents(events);
  };

  const renderEvents = () => {
    return nearestEvents.map(event => {
      return (
        <Marker
          key={event.id}
          title={event.title}
          description={event.description}
          coordinate={{ latitude: event.latitude, longitude: event.longitude }}
          image={data[event.type - 1].image}
        >
          <Callout tooltip onPress={() => navigateToDetails(event)}>
            <View style={styles.calloutContentContainer}>
              <Text numberOfLines={3} style={styles.calloutText}>
                {event.title}
              </Text>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f90000',
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins'
                  }}
                >
                  Detalhes
                </Text>
              </View>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  useEffect(() => {
    requestGeoLocation();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [isAuth]);

  const handleSearch = async (event) => {
    navigation.navigate('SearchResults', {event});
  }

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
          onSubmitEditing={({nativeEvent: {text, eventCount, target}}) => {handleSearch(text)}}
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
        {renderEvents()}
      </MapView>
    </View>
  );
};

export default EventsMap;
