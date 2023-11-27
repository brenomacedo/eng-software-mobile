import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rateStars: {
    flexDirection: 'row',
    columnGap: 8
  },
  rateStarImage: {
    width: 30,
    height: 30
  },
  chooseRateButton: {
    backgroundColor: '#E13535',
    borderRadius: 12,
    paddingVertical: 8,
    width: '100%',
    marginTop: 24
  },
  chooseRateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default styles;
