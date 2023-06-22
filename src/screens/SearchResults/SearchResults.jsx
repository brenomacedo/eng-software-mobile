import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

const SearchResults = () => {
  const buttons = [{Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}, {Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30'}];

  return (
      <ScrollView 
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}>
      <ArrowBack onPress={() => {}} />
        <Text style={styles.eventDetailsInfoTitle}>Exibindo resultados para "minha pesquisa"</Text>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonTextTitle}>
                {button.Titulo}
            </Text>
            <Text style={styles.buttonTextSubtitle}>
                {button.Local}
            </Text>
            <Text style={styles.buttonTextSubtitle}>
                {button.Horario}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export default SearchResults;
