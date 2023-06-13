import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '90%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10
  },
  map: {
    height: '100%',
    width: '100%'
  },
  text: {
    color: 'white',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5
  },
  mapView: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    borderRadius: 15
  },
  markImage: {
    width: 25,
    height: 25
  }
});

export default styles;
