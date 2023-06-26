import {useState} from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { ArrowBack, MapInput, Input } from '../../components';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import styles from './styles';

const EventDetails = ({navigation, route}) => {
  const { authToken, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {
    title,
    location,
    hour,
    eventDescription,
    eventLatitude,
    eventLongitude,
    eventId,
    userReq,
    userId
  } = route.params;

  const handleRequest = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        '/request',
        {
          eventId,
          message
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        })

      if(response) {
        Alert.alert('Sucesso!', 'Solicitção feita!');
        navigation.goBack();
      } 
      
    }catch(err) {
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

      

      setLoading(false);  

    }
  

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <ArrowBack onPress={() => {navigation.goBack()}} />
      <Text style={styles.eventDetailsTitle}>{title}</Text>

      <Text style={styles.eventDetailsInfoTitle}>Local</Text>
      <Text style={styles.eventDetailsInfo}>
        {location}
      </Text>

      <Text style={styles.eventDetailsInfoTitle}>Descrição</Text>
      <Text style={styles.eventDetailsInfo}>
        {eventDescription}
      </Text>

      <Text style={styles.eventDetailsInfoTitle}>Horário</Text>
      <Text style={styles.eventDetailsInfo}>{hour}</Text>

      <Text style={styles.eventDetailsInfoTitle}>Local no mapa</Text>
      <MapInput
        hideLabel
        style={styles.map}
        readOnly
        initialPosition={{
          latitude: eventLatitude,
          longitude: eventLongitude
        }}
        value={{
          latitude: eventLatitude,
          longitude: eventLongitude
        }}
      />

      {  (userId != userReq) && (
                  <>
                  <Input
                    labelText={"Mensagem: "}
                    placeHolder={"Digite uma mensagem"}
                    containerWidth={"85%"}
                    marginBottom={15}
                    marginTop={15}
                    value={message}
                    setValue={setMessage}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity disabled={loading} style={styles.button} onPress={handleRequest}>
                      <Text style={styles.buttonText}>Pedir para participar</Text>
                    </TouchableOpacity>
                  </View>
                  </>
                )}
    </ScrollView>
  );
};

export default EventDetails;
