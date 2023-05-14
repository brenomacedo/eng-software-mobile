import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    fontFamily: 'Poppins'
  },
  Image: {
    width: 312,
    height: 312,
    resizeMode: 'center'
  },

  InputsButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 450,
    width: '80%'
  }
});

export default styles;
