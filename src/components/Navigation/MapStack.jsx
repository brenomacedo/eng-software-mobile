//import EventsMap from '../../screens/EventsMap/EventsMap';
import { createStackNavigator } from '@react-navigation/stack';
import EventDetails from '../../screens/EventDetails/EventDetails';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={EventDetails} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
