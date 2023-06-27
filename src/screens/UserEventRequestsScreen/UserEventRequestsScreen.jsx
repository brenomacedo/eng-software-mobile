import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import useAuth from '../../hooks/useAuth';
import api from '../../api';

const Message = function({ data, index, onMessageAction }) {
  const handleAccept = () => {
    onMessageAction(data, index, 'accept');
  };

  const handleReject = () => {
    onMessageAction(data, index, 'reject');
  };

  return (
    <View style={styles.message}>
      <View style={styles.messageText}>
        <Text style={styles.messageTextTitle}>{data.Nome}</Text>
        <Text style={styles.messageTextSubtitle}>{data.Mensagem}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: '#58D7B8' }}
            onPress={handleAccept}
          >
            <Text style={styles.buttonText}>Aceitar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: '#F90000' }}
            onPress={handleReject}
          >
            <Text style={styles.buttonText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const UserEventRequestsScreen = ({navigation, route}) => {

  const {event_id} = route.params;

  console.log(event_id);

  //Recebe do backend as informações, 
  let eventName = "Racha"
  let info = [{Nome: "Gustavo Wendell", Mensagem:"Aceita aí"}, {Nome: "Wendell Gustavo", Mensagem:"Rejeita aí"}
                ];  

  //Teste para multiplos botões
  info = info.concat(info).concat(info);
  info = info.concat(info).concat(info);
  // info = info.concat(info).concat(info);
  
  const initialMessages = info;

  //Hook pra remover as mensagens de solicitação aceitam/rejeitam
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const {authToken} = useAuth();

  useEffect(() => {
    setMessages(initialMessages)


    const getRequests = async () => {
      setLoading(true);
      let newRequestsArray = [];
      try {
        const response = await api.get(`/request/${event_id}`, {
              headers: {
              authorization: `Bearer ${authToken}`
            }}).then(res => res.data);
        response.map((request) => {
          let newObject = {Nome: request.name, Mensagem:request.message, id: request.id};
          newRequestsArray.push(newObject);
        });
        setMessages(newRequestsArray);

        setLoading(false);
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
    }

    getRequests();




  }, []);

  const handleMessageAction = (data, index, action) => {
    // Pode botar a lógica para mandar as informações pro backend aqui
    // A action é se ela foi aceita ou rejeitada

    // Remove a ultima mensagem da lista
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.eventDetailsContainer}>
       <ArrowBack onPress={() => {}} />
      <Text style={styles.eventDetailsInfoTitle}>Solicitações de {eventName}</Text>
        {
          loading ? (
            <Text>Carregando...</Text>
          ) : ( 
            (messages.length > 0) ?
            (messages.map((data, index) => (<Message key={index} data={data} index={index} onMessageAction={handleMessageAction} />))) :
            (<Text style={styles.noResults}> Nenhum resultado encontrado</Text>) 
          )
        }
    </ScrollView>
  );
};

export default UserEventRequestsScreen;


/*

messages.map((data, index) => (<Message key={index} data={data} index={index} onMessageAction={handleMessageAction} />))


*/