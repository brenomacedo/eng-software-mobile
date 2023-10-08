import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { ArrowBack } from '../../components';
import useAuth from '../../hooks/useAuth';
import styles from './styles';
import api from '../../api';
import { useIsFocused } from '@react-navigation/native';

const Button = function (press, data, index, user_Id, navigation) {
  return (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => {
        press(data);
      }}
    >
      <View style={styles.buttonText}>
        <Text style={styles.buttonTextTitle}>{data.title}</Text>
        <Text style={styles.buttonTextSubtitle}>{data.location}</Text>
        <Text style={styles.buttonTextSubtitle}>
          {`${data.start_time.slice(0, 5)}-${data.end_time.slice(0, 5)}`}
        </Text>
      </View>
      {user_Id != null && data.user_id === user_Id && (
        <View style={styles.buttonIcons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ListEvents', { event_id: data.id });
            }}
          >
            <Image
              source={require('../../../assets/iconBell.png')}
              style={styles.bell}
            />
            <Text style={styles.circle}>{data.bellCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditEvent', {
                title: data.title,
                description: data.description,
                location: data.location,
                start_time: data.start_time,
                end_time: data.end_time,
                type: data.type,
                latitude: data.latitude,
                longitude: data.longitude,
                event_id: data.id,
                user: data.user
              });
            }}
          >
            <Image
              source={require('../../../assets/Pencil.png')}
              style={styles.pen}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const SearchResults = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const parameters = route.params;
  const { user, authToken } = useAuth();
  const isFocused = useIsFocused();

  const seeDetails = data => {
    navigation.navigate('EventDetails', {
      title: data.title,
      location: data.location,
      hour: `${data.start_time.slice(0, 5)}-${data.end_time.slice(0, 5)}`,
      userId: data.user_id,
      eventDescription: data.description,
      eventLatitude: data.latitude,
      eventLongitude: data.longitude,
      eventId: data.eventId,
      userReq: user != null ? user.id : null,
      user: data.user,
      requests: data.requests
    });
  };

  useEffect(() => {
    const searchEvents = async parameters => {
      let newEventArray = [];
      let response;

      if (parameters) {
        const { latitude, longitude, title } = parameters;
        response = await api
          .get('/event/all', {
            params: { latitude, longitude, distance: 10000, title }
          })
          .then(res => res.data);
      } else {
        response = await api
          .get('/event/me', {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          })
          .then(res => res.data);
      }

      response.map(event => {
        let newEventObject = event;
        newEventObject.bellCount = 0;
        newEventArray.push(newEventObject);
      });

      setResults(newEventArray);
      setLoading(false);
    };

    if (isFocused) {
      searchEvents(parameters);
    }
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <ArrowBack
        onPress={() => {
          navigation.goBack();
        }}
      />

      {parameters ? (
        <Text style={styles.eventDetailsInfoTitle}>
          Exibindo resultados para {`"${parameters.title}"`}
        </Text>
      ) : (
        <Text style={styles.eventDetailsInfoTitle}>Meus Eventos</Text>
      )}

      {loading ? (
        <Text>Carregando...</Text>
      ) : results.length > 0 ? (
        results.map((data, index) =>
          Button(
            seeDetails,
            data,
            index,
            user != null ? user.id : null,
            navigation
          )
        )
      ) : (
        <Text style={styles.noResults}> Nenhum resultado encontrado</Text>
      )}
    </ScrollView>
  );
};

export default SearchResults;

//{buttons.map((data, index) => Button(data,index))}
/* 


*/
