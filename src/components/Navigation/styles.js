import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#121212',
    justifyContent: 'space-evenly'
  },
  topBarItemContainer: {
    width: 75,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5
  },
  topBarLabel: {
    fontSize: 10,
    fontFamily: 'Poppins'
  },
  topBarItem: {
    width: 25,
    height: 25
  }
});

export default styles;
