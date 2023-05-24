import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: '#D2D2D2',
    height: 70,
    width: '100%',
    borderRadius: 15,
    paddingRight: 45,
    alignItems: 'center'
  },
  containerView: {
    position: 'relative',
    width: '100%'
  },
  Image: {
    position: 'absolute',
    left: 15,
    top: 25,
    width: 25,
    height: 20,
    zIndex: 2,
    resizeMode: 'center'
  },
  Button: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 45
  },
  Text: {
    fontFamily: 'Poppins',
    color: 'gray',
    textAlign: 'left'
  }
});

export default styles;
