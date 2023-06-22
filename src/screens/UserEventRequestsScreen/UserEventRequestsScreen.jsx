import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

const Message = function(data, index){

  return(
    <View style={styles.message}>
      <View style={styles.messageText}>
                <Text style={styles.messageTextTitle}>
                    {data.Nome}
                </Text>
                <Text style={styles.messageTextSubtitle}>
                    {data.Mensagem}
                </Text>

                <View style={styles.buttonGroup}>

                <TouchableOpacity style={{...styles.button, backgroundColor:"#58D7B8"}}>
                    <Text style={styles.buttonText}>
                      Aceitar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.button, backgroundColor:"#F90000"}}>
                    <Text style={styles.buttonText}>
                      Recusar
                    </Text>
                </TouchableOpacity>
                </View>
      </View>
    </View>
  )
}

const UserEventRequestsScreen = () => {


  //Recebe do backend as informações, 
  let eventName = "Racha"
  let messages = [{Nome: "Gustavo Wendell", Mensagem:"Aceita aí"}
                ];

  //Teste para multiplos botões
  messages = messages.concat(messages).concat(messages);
  // messages = messages.concat(messages).concat(messages)
  // messages = messages.concat(messages).concat(messages)

  return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.eventDetailsContainer}
      >
         <ArrowBack onPress={() => {}} />

        <Text style={styles.eventDetailsInfoTitle}>Solicitações de {eventName}</Text>

        {messages.map((data, index) => Message(data,index))}
        
      </ScrollView>
  );
};

export default UserEventRequestsScreen;