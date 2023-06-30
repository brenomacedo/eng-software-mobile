import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import balao from '../../../assets/balao_2.png';

export default function MapInput({
  hideLabel,
  style,
  readOnly,
  onChange,
  value,
  initialPosition
}) {
  return (
    <View style={[styles.view, style ? style : {}]}>
      {!hideLabel && <Text style={styles.text}>Localização</Text>}
      <View style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...initialPosition,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={styles.map}
          onPress={e => {
            if (readOnly) return;
            let newCoordinates = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            };

            if (onChange) {
              onChange(newCoordinates);
            }
          }}
        >
          {value ? (
            <Marker coordinate={value}>
              <Image style={styles.markImage} source={balao} />
            </Marker>
          ) : null}
        </MapView>
      </View>
    </View>
  );
}
