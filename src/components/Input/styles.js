import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Input: (doesTheInputHaveAnIcon, containerHeight) => ({
    backgroundColor: '#D2D2D2',
    height: '78%',
    width: '100%',
    borderRadius: 15,
    fontFamily: 'Poppins',
    paddingLeft: doesTheInputHaveAnIcon ? 50 : 15,
    paddingRight: 45,
    paddingTop: containerHeight > 100 ? 10 : 0,
    textAlignVertical: containerHeight > 100 ? 'top' : 'center',
    textAlign: 'left',
    marginTop: 4
  }),
  InputContainer: (containerWidth, containerHeight) => ({
    position: 'relative',
    height: containerHeight ? containerHeight : 90,
    width: containerWidth ? containerWidth : '100%',
    maxWidth: 700,
    marginBottom: 10
  }),
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
  },
  label: {
    color: 'white'
  }
});
/* tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }), */

export default styles;
