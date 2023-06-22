import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

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

const UserEventRequestsScreen = () => {

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

  useEffect(() => setMessages(initialMessages), []);

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
      <Text style={styles.eventDetailsInfoTitle}>Solicitações de {eventName}</Text>

      {messages.map((data, index) => (
        <Message key={index} data={data} index={index} onMessageAction={handleMessageAction} />
      ))}
    </ScrollView>
  );
};

export default UserEventRequestsScreen;
