import { createStackNavigator } from '@react-navigation/stack';

import EventRequests from '../../screens/EventRequests/EventRequests';
import EventDetails from '../../screens/EventDetails/EventDetails';
import UserProfile from '../../screens/UserProfile/UserProfile';

const requestStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <requestStack.Navigator screenOptions={{ headerShown: false }}>
      <requestStack.Screen name="EventRequests" component={EventRequests} />
      <requestStack.Screen name="EventDetails" component={EventDetails} />
      <requestStack.Screen name="UserProfile" component={UserProfile} />
    </requestStack.Navigator>
  );
};

export default MainScreenStack;
