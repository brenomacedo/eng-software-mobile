import { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import api from '../../api';
import useAuth from '../../hooks/useAuth';
import { useIsFocused } from '@react-navigation/native';

const colorirStatus = indice => {
  const estados = {
    0: { nome: 'Rejeitado', cor: 'red' },
    1: { nome: 'Pendente', cor: 'blue' },
    2: { nome: 'Aceito', cor: 'green' }
  };

  const status = estados[indice];

  return <Text style={{ color: status.cor }}>{status.nome}</Text>;
};

const Button = function (data, index, navigation) {
  return (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => {
        // navigation.navigate('EventDetails', {
        //   title: data.event.title,
        //   location: data.event.location,
        //   hour: `${data.event.start_time.slice(
        //     0,
        //     5
        //   )}-${data.event.end_time.slice(0, 5)}`,
        //   eventDescription: data.event.description,
        //   eventLatitude: data.event.latitude,
        //   eventLongitude: data.event.longitude,
        //   eventId: data.event.id,
        //   userId: data.event.user_id,
        //   requests: data.event.requests,
        //   user: data.event.user
        // });
      }}
    >
      <View style={styles.buttonText}>
        <Text style={styles.buttonTextTitle}>{data.Titulo}</Text>
        <Text style={styles.buttonTextSubtitle}>{data.Local}</Text>
        <Text style={styles.buttonTextSubtitle}>{data.Horario}</Text>
        <Text style={styles.buttonTextSubtitle}>
          Status: {colorirStatus(data.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const EventRequests = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken, logout } = useAuth();

  const isFocused = useIsFocused();

  useEffect(() => {
    /*
      Request {
    id: 2,
    message: 'Sei la',
    status: 'PENDING',
    user_id: 6,
    event_id: 2,
    created_at: 2023-06-25T21:24:56.447Z,
    updated_at: 2023-06-25T21:24:56.447Z,
    title: 'Racha de basquete',
    description: 'Um racha de basquete valendo um sorvete',
    location: 'Avenida contorno norte, 981, conjunto esperança ',
    latitude: -3.814874,
    longitude: -38.587177,
    start_time: '06:30:27',
    end_time: '13:23:27',
    type: 3
  }
    
    'ACCEPTED', 'DENIED'

    */

    const findUserRequests = async () => {
      let newRequestsArray = [];
      try {
        const response = await api
          .get('/request/me', {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          })
          .then(res => res.data);

        response.map(request => {
          let newObject = {
            Titulo: request.title,
            Local: request.location,
            Horario: `${request.start_time.slice(
              0,
              5
            )}-${request.end_time.slice(0, 5)}`,
            status:
              request.status == 'PENDING'
                ? 1
                : request.status == 'ACCEPTED'
                ? 2
                : 0,
            request
          };
          newRequestsArray.push(newObject);
        });

        setRequests(newRequestsArray);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          Alert.alert('Erro', 'Sessão expirada');
          logout().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }]
            });
          });
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          Alert.alert('Erro', err.response.data.error);
        }
      }
    };

    if (isFocused) {
      findUserRequests();
    }
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <Text style={styles.eventDetailsInfoTitle}>Solicitações</Text>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : requests.length > 0 ? (
        requests.map((data, index) => Button(data, index, navigation))
      ) : (
        <Text style={styles.noResults}> Nenhum resultado encontrado</Text>
      )}
    </ScrollView>
  );
};

export default EventRequests;

/*

{buttons.map((data, index) => Button(data,index))}


[{"created_at": "2023-06-25T21:24:56.447Z",
"event_id": 2, "id": 1,
"message": "Sei la",
"status": "PENDING",
"updated_at": "2023-06-25T21:24:56.447Z",
"user_id": 7}]

 */
