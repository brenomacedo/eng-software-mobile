import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import useAuth from '../../hooks/useAuth';
import useGeoLocation from '../../hooks/useGeoLocation';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../api';
import data from '../CreateEventScreen/mockData';
import { useIsFocused } from '@react-navigation/native';

const EventsMap = ({ navigation }) => {
  const { isAuth, logout, user } = useAuth();

  const { requestGeoLocation, location } = useGeoLocation();
  const [nearestEvents, setNearestEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const navigateToCreateEvent = () => {
    if (!isAuth) return navigateToLogin();
    navigation.navigate('CreateEvent');
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  /*{"description": "Um racha de basquete valendo um sorvete",
  "end_time": "13:23:41",
  "id": 2,
  "latitude": -3.814874, 
  "location": "Avenida contorno norte, 981, conjunto esperança ",
  "longitude": -38.587177,
  "start_time": "06:30:41",
  "title": "Racha de basquete no polo ",
  "type": 3,
  "user_id": 6
  }

 */

  const navigateToDetails = event => {
    navigation.navigate('EventDetails', {
      title: event.title,
      location: event.location,
      hour: `${event.start_time.slice(0, 5)}-${event.end_time.slice(0, 5)}`,
      eventDescription: event.description,
      eventLatitude: event.latitude,
      eventLongitude: event.longitude,
      eventId: event.id,
      userReq: user != null ? user.id : null,
      userId: event.user_id,
      requests: event.requests,
      user: event.user
    });
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
    const events = await api
      .get(
        `/event/all?latitude=${location.latitude}&longitude=${location.longitude}&distance=100000`
      )
      .then(res => res.data)
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          Alert.alert('Erro', err.response.data.error);
        }

        return [];
      })
      .finally(() => setLoading(false));

    setNearestEvents(events);
  };

  const isEventCreatedByUser = event => {
    return isAuth && user.id === event.user_id;
  };

  const renderEvents = () => {
    return nearestEvents.map(event => {
      return (
        <Marker
          style={{
            width: 64,
            height: 64
          }}
          key={event.id}
          title={event.title}
          description={event.description}
          coordinate={{ latitude: event.latitude, longitude: event.longitude }}
          image={
            isEventCreatedByUser(event)
              ? data[event.type - 1].event_owner_image
              : data[event.type - 1].image
          }
        >
          <Callout
            tooltip
            onPress={() => {
              if (!isEventCreatedByUser(event)) {
                navigateToDetails(event);
              }
            }}
          >
            <View style={styles.calloutContentContainer}>
              <Text numberOfLines={3} style={styles.calloutText}>
                {event.title}
              </Text>
              {!isEventCreatedByUser(event) && (
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E13535',
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
              )}
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
    if (isFocused) fetchEvents();
  }, [isAuth, isFocused]);

  const handleSearch = async event => {
    navigation.navigate('SearchResults', {
      title: event,
      latitude: location.latitude,
      longitude: location.longitude
    });
  };

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
        <Text style={styles.topBarText}>
          {loading
            ? 'Carregando eventos próximos...'
            : 'Mostrando os eventos próximos'}
        </Text>
      </View>
      <View style={styles.searchFieldContainer}>
        <Image
          style={styles.searchFieldIcon}
          resizeMode="center"
          source={require('../../../assets/search.png')}
        />
        <TextInput
          onSubmitEditing={({
            nativeEvent: { text, _eventCount, _target }
          }) => {
            handleSearch(text);
          }}
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
        provider={PROVIDER_GOOGLE}
        region={{ ...location, latitudeDelta: 0.014, longitudeDelta: 0.014 }}
        style={styles.mapView}
      >
        {renderEvents()}
      </MapView>
    </View>
  );
};

export default EventsMap;
