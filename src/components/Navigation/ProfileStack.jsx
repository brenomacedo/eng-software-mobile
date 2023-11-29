import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../../screens/UserProfile/UserProfile';
import Profile from '../../screens/Profile/Profile';

const UserProfileStack = createStackNavigator();
const ProfileStack = () => {
  return (
    <UserProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <UserProfileStack.Screen name="PSUserProfile" component={UserProfile} />
      <UserProfileStack.Screen name="PSProfile" component={Profile} />
    </UserProfileStack.Navigator>
  );
};

export default ProfileStack;
