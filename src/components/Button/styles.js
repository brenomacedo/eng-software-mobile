import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Button: (buttonWidth, buttonMargin) => ({
    backgroundColor: '#F90000',
    color: 'white',
    height: 50,
    width: buttonWidth ? buttonWidth : '100%',
    maxWidth: 700,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins',
    margin: buttonMargin ? buttonMargin : 0
  })
});

export default styles;
