import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    flex: 1
  },
  scrollContainer: {
    marginHorizontal: 20
  },
  arrowBack: {
    marginLeft: 0
  },
  userProfilePic: {
    width: 144,
    height: 144,
    borderRadius: 105,
    marginBottom: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 24
  },
  userName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins'
  },
  userDescription: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default styles;
