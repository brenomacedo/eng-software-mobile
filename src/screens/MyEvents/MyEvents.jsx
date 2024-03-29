import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';

const Button = function (data, index) {
  return (
    <TouchableOpacity key={index} style={styles.button}>
      <View style={styles.buttonText}>
        <Text style={styles.buttonTextTitle}>{data.Titulo}</Text>
        <Text style={styles.buttonTextSubtitle}>{data.Local}</Text>
        <Text style={styles.buttonTextSubtitle}>{data.Horario}</Text>
      </View>
      <View style={styles.buttonIcons}>
        <View>
          <Image
            source={require('../../../assets/iconBell.png')}
            style={styles.bell}
          />
        </View>
        <Image
          source={require('../../../assets/Pencil.png')}
          style={styles.pen}
        />
      </View>
    </TouchableOpacity>
  );
};

const MyEvents = () => {
  //Recebe do backend as informações,
  let buttons = [
    {
      Titulo: 'Título do evento',
      Local: 'Local',
      Horario: '16:30-17:30',
      bellCount: 5
    },
    {
      Titulo: 'Olimpiada',
      Local: 'Estônia',
      Horario: '29:30-47:30',
      bellCount: 23
    },
    {
      Titulo: 'Show de fogos',
      Local: 'Coreia do Norte',
      Horario: '19:87-35:83',
      bellCount: 12
    }
  ];

  //Teste para multiplos botões
  buttons = buttons.concat(buttons).concat(buttons);
  buttons = buttons.concat(buttons).concat(buttons);
  // buttons = buttons.concat(buttons).concat(buttons)

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <Text style={styles.eventDetailsInfoTitle}>Meus Eventos</Text>

      {buttons.map((data, index) => Button(data, index))}
    </ScrollView>
  );
};

export default MyEvents;
