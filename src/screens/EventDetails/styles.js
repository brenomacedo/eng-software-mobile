import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    flex: 1
  },
  eventDetailsContainer: {
    backgroundColor: '#313131',
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
    marginTop: 16,
    marginBottom: 8
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
    backgroundColor: '#E13535',
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
    backgroundColor: '#E13535'
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
    height: 18,
    lineHeight: 18
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
    fontSize: 14,
    lineHeight: 15,
    height: 15
  },
  ratingTitle: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    marginTop: 48,
    alignSelf: 'flex-start',
    marginLeft: 32,
    width: '100%'
  },
  ratingSubTitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginTop: 12
  },
  rateUser: {
    width: '100%',
    backgroundColor: '#E13535',
    borderRadius: 12,
    paddingVertical: 8
  },
  rateUserTitle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16
  },
  rateUserSubTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12
  },
  userRatingStars: {
    position: 'relative'
  },
  userRatingYellowStars: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    height: 20,
    zIndex: 2,
    overflow: 'hidden'
  },
  userRatingGrayStars: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 12,
    position: 'relative'
  },
  userRatingStar: {
    width: 20,
    height: 20
  },
  rateUserRatedText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rateUserYellowStar: {
    width: 16,
    height: 16,
    marginBottom: 4
  },
  notLoadedText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginTop: 32
  },
  userInfo: {
    flex: 1
  },
  participantRating: {
    height: 14,
    width: 78,
    position: 'relative'
  },
  participantGrayStars: {
    columnGap: 2,
    flexDirection: 'row'
  },
  participantYellowStars: {
    columnGap: 2,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden'
  },
  participantRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  participantRatingCount: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 10,
    marginTop: 4,
    marginLeft: 4
  },
  creatorInfo: {
    flex: 1
  }
});
