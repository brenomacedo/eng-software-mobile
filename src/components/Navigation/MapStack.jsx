import { createStackNavigator } from '@react-navigation/stack';
import EventsMap from '../../screens/EventsMap/EventsMap';
import CreateEvent from '../../screens/CreateEventScreen';
import EventDetails from '../../screens/EventDetails/EventDetails';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={EventsMap} />
      <MapStack.Screen name="CreateEvent" component={CreateEvent} />
      <MapStack.Screen name="EventDetails" component={EventDetails} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
