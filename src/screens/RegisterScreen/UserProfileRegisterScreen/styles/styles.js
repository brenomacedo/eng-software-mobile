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
    width: 170,
    height: 170,
    resizeMode: 'center'
  },

  InputsButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '68%',
    width: '80%'
  },
  haveAccoount: {
    color: 'white',
    width: '100%',
    textAlign: 'right',
    fontFamily: 'Poppins'
  },
  haveAccoountButton: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%'
  }
});

export default styles;
