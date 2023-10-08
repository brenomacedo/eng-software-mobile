import { createStackNavigator } from '@react-navigation/stack';
import EventsMap from '../../screens/EventsMap/EventsMap';
import CreateEvent from '../../screens/CreateEventScreen';
import EventDetails from '../../screens/EventDetails/EventDetails';
import SearchResults from '../../screens/SearchResults/SearchResults';
import UserProfile from '../../screens/UserProfile/UserProfile';

const MapStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="EventsMap" component={EventsMap} />
      <MapStack.Screen name="CreateEvent" component={CreateEvent} />
      <MapStack.Screen name="EventDetails" component={EventDetails} />
      <MapStack.Screen name="SearchResults" component={SearchResults} />
      <MapStack.Screen name="UserProfile" component={UserProfile} />
    </MapStack.Navigator>
  );
};

export default MainScreenStack;
