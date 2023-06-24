import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

const colorirStatus = (indice) => {

    const estados = {0: {nome:"Rejeitado", cor:"red"}, 
                     1: {nome:"Pendente", cor:"blue"},
                     2: {nome:"Aceito", cor:"green"}};

    const status = estados[indice];


    return (<Text style={{color:status.cor}}>{status.nome}</Text>)
}

const Button = function(data, index){

  return(
    <TouchableOpacity key={index} style={styles.button}>
      <View style={styles.buttonText}>
                <Text style={styles.buttonTextTitle}>
                    {data.Titulo}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {data.Local}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {data.Horario}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    Status: {colorirStatus(data.status)}
                </Text>
      </View>
    </TouchableOpacity>
  )
}

const EventRequests = () => {

  //Recebe do backend as informações, 
  let buttons = [{Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30',status:1,bellCount:5}, 
                 {Titulo: 'Olimpiada', Local: 'Estônia', Horario:'29:30-47:30',status:0,bellCount:23},
                 {Titulo: 'Show de fogos', Local: 'Coreia do Norte',status:2,Horario:'19:87-35:83',bellCount:12}
                ];

  //Teste para multiplos botões
  buttons = buttons.concat(buttons).concat(buttons);
  buttons = buttons.concat(buttons).concat(buttons)
  // buttons = buttons.concat(buttons).concat(buttons)

  return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.eventDetailsContainer}
      >

        <Text style={styles.eventDetailsInfoTitle}>Solicitações</Text>

        {buttons.map((data, index) => Button(data,index))}
        
      </ScrollView>
  );
};

export default EventRequests;