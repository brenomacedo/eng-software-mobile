import EventsMap from '../../screens/EventsMap/EventsMap';
import { createStackNavigator } from '@react-navigation/stack';
import EditEventScreen from '../../screens/EditEventScreen/EditEventScreen';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={EditEventScreen} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
