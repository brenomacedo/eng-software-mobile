import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1
  },
  bell:{
    height:27,
    width: 25,
    margin:5,
  },

  pen:{
    height:25,
    width: 25,
    margin:5,
    overflow:"visible"
  },

  eventDetailsContainer: {
    backgroundColor: '#212121',
    alignItems: 'center',
    minHeight:'100%',
  },
  eventDetailsTitle: {
    color: 'white',
    fontFamily: 'PoppinsMedium',
    fontSize: 20
  },
  eventDetailsInfoTitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight:300,
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
    width: '91%',
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 16,
    display:"flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    flexDirection:"row"
  },
  buttonText:{
    flexBasis:"80%",
    

  },
  buttonIcons:{
    flexBasis:"20%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  },
  buttonTextTitle: {
    color: '#000',
    fontFamily: 'PoppinsRegular',
    fontSize: 20,
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
