import MapView from 'react-native-maps';
import { View } from 'react-native';
import styles from './styles';

export default function MapInput() {
  return (
    <View style={styles.view}>
      <MapView style={styles.map} />
    </View>
  );
}
