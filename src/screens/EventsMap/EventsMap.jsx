import { View } from 'react-native';

const EventsMap = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 100,
          width: '100%',
          backgroundColor: 'red',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32
        }}
      ></View>
    </View>
  );
};

export default EventsMap;
