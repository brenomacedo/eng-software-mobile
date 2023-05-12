import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  Image: {
    width: 312,
    height: 312,
    resizeMode: 'center'
  },
  Button: {
    backgroundColor: '#F90000',
    color: 'white',
    height: 70,
    width: Dimensions.get('screen').width - 80,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Input: {
    backgroundColor: '#D2D2D2',
    height: 70,
    width: Dimensions.get('screen').width - 80,
    borderRadius: 15,
    paddingLeft: 50
  },
  InputContainer: {
    position: 'relative'
  },
  InputsButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 450
  }
});

export default styles;
