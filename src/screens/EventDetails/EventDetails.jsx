import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

const EventDetails = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <ArrowBack onPress={() => {}} />
      <Text style={styles.eventDetailsTitle}>Titulo do Evento</Text>

      <Text style={styles.eventDetailsInfoTitle}>Local</Text>
      <Text style={styles.eventDetailsInfo}>
        Rua dos bobos, número 0, Caucaia CE mas e o this
      </Text>

      <Text style={styles.eventDetailsInfoTitle}>Descrição</Text>
      <Text style={styles.eventDetailsInfo}>
        Titulo do evento essa é uma descrição legal lorem ipsum kkkkk quem
        caralhos usa essa porra de preencher texto cara, meu deus do ceuTitulo
        do evento essa é uma descrição legal lorem ipsum kkkkk quem caralhos usa
        essa porra de preencher texto cara, meu deus do ceuTitulo do evento essa
        é uma descrição legal lorem ipsum kkkkk quem caralhos usa essa porra de
        preencher texto cara, meu deus do ceuTitulo do evento essa é uma
        descrição legal lorem ipsum kkkkk quem caralhos usa essa porra de
        preencher texto cara, meu deus do ceuTitulo do evento essa é uma
        descrição legal lorem ipsum kkkkk quem caralhos usa essa porra de
        preencher texto cara, meu deus do ceu
      </Text>

      <Text style={styles.eventDetailsInfoTitle}>Horário</Text>
      <Text style={styles.eventDetailsInfo}>16:30 - 19:45</Text>

      <Text style={styles.eventDetailsInfoTitle}>Local no mapa</Text>
      <MapInput
        hideLabel
        style={styles.map}
        readOnly
        initialPosition={{
          latitude: -3.7327,
          longitude: -38.527
        }}
        value={{
          latitude: -3.7327,
          longitude: -38.527
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pedir para participar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetails;
