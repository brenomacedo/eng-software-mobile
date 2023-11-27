import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131',
    flex: 1,
    paddingBottom: 12
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
  userRatingYellowStars: starSize => ({
    flexDirection: 'row',
    columnGap: starSize * 0.4,
    position: 'absolute',
    left: 0,
    top: 0,
    height: 20,
    zIndex: 2,
    overflow: 'hidden'
  }),
  userRatingGrayStars: starSize => ({
    flexDirection: 'row',
    columnGap: starSize * 0.4,
    position: 'relative'
  }),
  userRatingStar: starSize => ({
    width: starSize,
    height: starSize
  }),
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
  commentsTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins',
    marginTop: 16
  },
  comment: {
    flexDirection: 'column'
  },
  commentAuthor: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  commentAuthorPic: {
    width: 36,
    height: 36,
    backgroundColor: '#E13535',
    borderRadius: 18
  },
  commentAuthorInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  commentAuthorRatingContainer: {},
  commentAuthorName: {
    color: 'white',
    fontSize: 14
  },
  eye: {
    width: 18,
    height: 18
  },
  commentContent: {
    color: 'white',
    fontFamily: 'Poppins'
  },
  comments: {
    rowGap: 12,
    marginTop: 16
  },
  loadMoreCommentsSection: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  plusIcon: {
    width: 24,
    height: 24
  }
});

export default styles;
