import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import balao from '../../../assets/balao_2.png';
import { useState } from 'react';

export default function MapInput() {
  const [mapPosition, setMapPosition] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  /* const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }; */
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Localização</Text>
      <View style={styles.mapView}>
        <MapView
          initialRegion={mapPosition}
          style={styles.map}
          onPress={e => {
            let newCoordinates = { ...mapPosition };
            newCoordinates.latitude = e.nativeEvent.coordinate.latitude;
            newCoordinates.longitude = e.nativeEvent.coordinate.longitude;
            setMapPosition(newCoordinates);
          }}
        >
          <Marker coordinate={mapPosition}>
            <Image style={styles.markImage} source={balao} />
          </Marker>
        </MapView>
      </View>
    </View>
  );
}
