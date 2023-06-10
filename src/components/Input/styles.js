import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Input: doesTheInputHaveAnIcon => ({
    backgroundColor: '#D2D2D2',
    height: 70,
    width: '100%',
    borderRadius: 15,
    fontFamily: 'Poppins',
    paddingLeft: doesTheInputHaveAnIcon ? 50 : 15,
    paddingRight: 45
  }),
  InputContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 700
  },
  Icon: {
    position: 'absolute',
    left: 15,
    top: 25,
    width: 25,
    height: 20,
    zIndex: 2,
    resizeMode: 'center'
  },
  ButtonIcon: {
    position: 'absolute',
    right: 15,
    top: 25,
    width: 25,
    height: 20,
    zIndex: 2,
    resizeMode: 'center'
  },
  ButtonIconImage: {
    width: 25,
    height: 20,
    resizeMode: 'center'
  }
});
/* tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }), */

export default styles;
