import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1
  },
  eventDetailsContainer: {
    backgroundColor: '#212121',
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: 20
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
    width: '100%',
    height: 60,
    backgroundColor: '#f90000',
    borderRadius: 15,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 16
  },
  seeParticipantsContainer: {
    paddingHorizontal: 32,
    width: '100%'
  },
  seeParticipants: {
    width: '100%',
    height: 40,
    borderRadius: 15,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f90000'
  },
  seeParticipantsText: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 14
  },
  participantsModalTitle: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    fontSize: 16
  },
  participantContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12
  },
  participantPfp: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  participantName: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    flex: 1
  },
  viewParticipantProfileButton: {
    width: 18,
    height: 18,
    marginHorizontal: 8
  },
  viewParticipantProfile: {
    width: 18,
    height: 18
  },
  eventWithoutParticipants: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 13
  },
  eventCreatorInfo: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 32,
    columnGap: 16,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  eventCreatorProfilePic: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  eventCreatorName: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    flex: 1
  }
});
