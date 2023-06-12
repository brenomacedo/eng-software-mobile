import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  hourDiv: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    height: 120,
    position: 'relative'
  },
  arrowButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 5
  },
  arrowImage: {
    width: 30,
    height: 30
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 0,
    width: Dimensions.get('window').width
  },
  hourText: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export default styles;
