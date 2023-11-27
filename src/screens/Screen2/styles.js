import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#313131'
  },
  image: {
    width: '71%',
    height: '40%',
    marginTop: 30
  },
  title: {
    fontSize: 28,
    marginVertical: 0,
    marginLeft: -60,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: -70,
    color: '#FFFFFF',
    textAlign: 'left',
    // fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    marginBottom: '16%'
  },
  button: {
    backgroundColor: '#E13535',
    fontStyle: 'normal',
    fontWeight: 500,
    paddingVertical: 20,
    paddingHorizontal: 110,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 0
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center'
  },

  rectangle: {
    width: 12,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 2
  },

  rectangle2: {
    backgroundColor: '#616161',
    width: 6,
    height: 6,
    borderRadius: 3
  },

  rectangleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  spacing: {
    marginHorizontal: 1
  }
});

export default styles;
