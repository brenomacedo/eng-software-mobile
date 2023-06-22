import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1
  },
  eventDetailsContainer: {
    backgroundColor: '#212121',
    alignItems: 'center'
  },
  eventDetailsTitle: {
    color: 'white',
    fontFamily: 'PoppinsMedium',
    fontSize: 20
  },
  eventDetailsInfoTitle: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingLeft: 32,
    marginTop: 16
  },
  eventDetailsInfo: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    alignSelf: 'flex-start',
    paddingLeft: 32,
    paddingRight: 32
  },
  map: {
    paddingLeft: 32,
    paddingRight: 32,
    width: '100%',
    height: 160
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 16
  },
  button: {
    width: '85%',
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttonTextTitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 14,
    fontWeight: '700'
  },
  buttonTextSubtitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 14
  },
  container: {
    flex: 1,
    backgroundColor: '#212121'
  }
});
