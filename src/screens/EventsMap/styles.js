import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  topBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    zIndex: 1,
    backgroundColor: '#212121',
    flexDirection: 'column',
    padding: 24
  },
  loginButton: {
    backgroundColor: '#F90000',
    alignSelf: 'flex-end',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 32,
    paddingVertical: 6,
    borderRadius: 32
  },
  loginButtonText: {
    fontFamily: 'Poppins',
    color: 'white'
  },
  topBarText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 18,
    marginTop: 'auto'
  },
  searchFieldContainer: {
    position: 'absolute',
    top: 162,
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 24
  },
  searchFieldIcon: {
    width: 30,
    position: 'absolute',
    left: 30,
    top: -20,
    zIndex: 3
  },
  searchFieldInput: {
    height: 40,
    backgroundColor: 'white',
    fontFamily: 'PoppinsMedium',
    paddingLeft: 44,
    borderRadius: 40,
    fontSize: 16,
    shadowColor: 'black',
    elevation: 15,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 36
  },
  addEventButton: {
    width: 60,
    height: 60,
    backgroundColor: '#F90000',
    zIndex: 4,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addEventButtonText: {
    color: 'white',
    fontSize: 20
  },
  mapView: { flex: 1 },
  calloutContentContainer: {
    backgroundColor: '#212121',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 8,
    width: 100,
    marginBottom: 4
  },
  calloutText: {
    color: 'white',
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    fontSize: 14
  }
});
