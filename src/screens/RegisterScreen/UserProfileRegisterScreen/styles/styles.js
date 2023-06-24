import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Poppins'
  },
  Image: {
    width: 170,
    height: 170,
    resizeMode: 'center',
    marginTop: 20
  },
  InputsButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  haveAccoount: {
    color: 'white',
    width: '100%',
    textAlign: 'right',
    fontFamily: 'Poppins'
  },
  haveAccoountButton: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%'
  }
});

export default styles;
