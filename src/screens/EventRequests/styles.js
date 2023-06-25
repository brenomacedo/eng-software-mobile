import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop:30,
    backgroundColor:"black"
  },
  bell:{
    height:30,
    width: 25,
    margin:5,
    zIndex:1
  },
  circle:{
    width: 14,
    height: 14,
    borderRadius: 19,
    backgroundColor:"black",
    position:"absolute",
    top: 23,
    left: 18,
    color:"white",
    textAlign:"center",
    fontSize:10,
    zIndex:2
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
    fontSize: 24,
    alignSelf: 'center',
    fontWeight:500,
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
    height: 122,
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
  },
  noResults: {
    color: "white",
    fontSize: 20,
    fontFamily: 'PoppinsRegular'
  },
  loading: {
    color: "white",
    fontSize: 20,
    fontFamily: 'PoppinsRegular'
  }
});