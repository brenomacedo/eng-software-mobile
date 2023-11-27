import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'black'
  },
  bell: {
    height: 30,
    width: 25,
    margin: 5,
    zIndex: 1
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 19,
    backgroundColor: 'black',
    position: 'absolute',
    top: 23,
    left: 18,
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    zIndex: 2
  },

  pen: {
    height: 25,
    width: 25,
    margin: 5,
    overflow: 'visible'
  },

  eventDetailsContainer: {
    backgroundColor: '#313131',
    alignItems: 'center',
    minHeight: '100%'
  },
  eventDetailsTitle: {
    color: 'white',
    fontFamily: 'PoppinsMedium',
    fontSize: 20
  },
  eventDetailsInfoTitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 400,
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
  messageContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 16
  },
  message: {
    width: '85%',
    height: 150,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  messageText: {
    width: '100%'
  },
  messageTextTitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 14,
    fontWeight: '400'
  },
  messageTextSubtitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 14,
    fontWeight: 300
  },
  container: {
    flex: 1,
    backgroundColor: '#313131'
  },
  button: {
    width: '45%',
    height: 44,
    borderRadius: 11
  },

  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 300,
    lineHeight: 50,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noResults: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PoppinsRegular'
  },
  confirmMessage: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    width: '100%'
  }
});
