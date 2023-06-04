import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Image: {
    width: 170,
    height: 170,
    resizeMode: 'center'
  },
  InputsButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 450,
    width: '80%'
  },
  backArrow: {
    width: 30,
    height: 30,
    resizeMode: 'center'
  },
  backArrowButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 20
  }
});

export default styles;
