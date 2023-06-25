import { createStackNavigator } from '@react-navigation/stack';


import EventRequests from "../../screens/EventRequests/EventRequests";

const requestStack = createStackNavigator();
const MainScreenStack = () => {
  return (
    <requestStack.Navigator screenOptions={{ headerShown: false }}>
      <requestStack.Screen name="EventRequests" component={EventRequests} />
  
    </requestStack.Navigator>
  );
};      

export default MainScreenStack;
