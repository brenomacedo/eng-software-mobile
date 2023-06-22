import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

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
      </View>
      <View style={styles.buttonIcons}>
        <Image
          source={require('../../../assets/iconBell.png')}
          style={styles.bell}
        />
        <Image
          source={require('../../../assets/Pencil.png')}
          style={styles.pen}
        />
      </View>
    </TouchableOpacity>
  )
}

const SearchResults = () => {
  let buttons = [{Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}];

  // buttons = buttons.concat(buttons).concat(buttons);
  return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.eventDetailsContainer}
      >
        <ArrowBack onPress={() => {}} />

        <Text style={styles.eventDetailsInfoTitle}>Exibindo resultados para "minha pesquisa"</Text>

        {buttons.map((data, index) => Button(data,index))}
        
      </ScrollView>
  );
};

export default SearchResults;
