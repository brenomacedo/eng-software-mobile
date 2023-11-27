import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  hourDiv: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    height: 120,
    position: 'relative',
    marginTop: 15
  },
  arrowButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 5
  },
  arrowImage: {
    width: 30,
    height: 30
  },
  scroll: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#313131',
    paddingTop: 10,
    paddingBottom: 20,
    position: 'relative'
  },
  hourText: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0
  },
  scrollView: {
    height: '20%',
    width: '80%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20
  },
  eventTitle: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: 20
  },
  map: {
    paddingLeft: 32,
    paddingRight: 32,
    width: '100%',
    height: 160
  },
  lineSeparator: {
    height: 2,
    backgroundColor: 'white',
    marginVertical: 6,

    width: '90%'
  }
});

export default styles;
