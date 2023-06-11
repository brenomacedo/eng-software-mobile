import EventsMap from '../../screens/EventsMap/EventsMap';
import { createStackNavigator } from '@react-navigation/stack';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={EventsMap} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
