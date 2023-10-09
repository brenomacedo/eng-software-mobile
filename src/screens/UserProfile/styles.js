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
  },
  ratingTitle: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    marginTop: 48
  },
  ratingSubTitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginTop: 12
  },
  rateUser: {
    width: '100%',
    backgroundColor: '#F90000',
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
    position: 'relative',
    flex: 1
  },
  userRatingYellowStars: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    width: 66,
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
  }
});

export default styles;
