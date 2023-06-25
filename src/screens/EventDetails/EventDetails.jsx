import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import styles from './styles';

const EventDetails = ({navigation, route}) => {

  const {
    title,
    location,
    hour,
    eventDescription,
    eventLatitude,
    eventLongitude
  } = route.params;

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pedir para participar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetails;
