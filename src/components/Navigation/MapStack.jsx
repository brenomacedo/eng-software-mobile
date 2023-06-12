import EventsMap from '../../screens/EventsMap/EventsMap';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEventScreen from '../../screens/CreateEventScreen';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={CreateEventScreen} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
