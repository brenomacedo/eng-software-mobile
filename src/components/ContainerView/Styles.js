import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#313131',
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Poppins'
  }
});

export default styles;
