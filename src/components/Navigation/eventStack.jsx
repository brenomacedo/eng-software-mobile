import { createStackNavigator } from '@react-navigation/stack';
import CreateEvent from '../../screens/CreateEventScreen';
import EventDetails from '../../screens/EventDetails/EventDetails';
import UserEventRequestsScreen from "../../screens/UserEventRequestsScreen/UserEventRequestsScreen";
import EditEventScreen from "../../screens/EditEventScreen/EditEventScreen";

const eventStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <eventStack.Navigator screenOptions={{ headerShown: false }}>
      <eventStack.Screen name="ListEvents" component={UserEventRequestsScreen} />
      <eventStack.Screen name="CreateEvent" component={CreateEvent} />
      <eventStack.Screen name="EventDetails" component={EventDetails} />
      <eventStack.Screen name="EditEvent" component={EditEventScreen} />
    </eventStack.Navigator>
  );
};

export default MainScreenStack;
