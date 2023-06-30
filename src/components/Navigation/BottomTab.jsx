import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapStack from './MapStack';
import eventStack from "./eventStack";
import requestStack from "./requestStack";
import styles from './styles';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Profile from '../../screens/Profile/Profile';
import useAuth from '../../hooks/useAuth';

const BOTTOM_TAB_ROUTES = [
  {
    label: 'Mapa',
    routeName: 'mapStack',
    unactiveIcon: require('../../../assets/white-compass.png'),
    activeIcon: require('../../../assets/red-compass.png')
  },
  {
    label: 'Perfil',
    routeName: 'profile',
    unactiveIcon: require('../../../assets/white-user.png'),
    activeIcon: require('../../../assets/red-user.png')
  },
  {
    label: 'Eventos',
    routeName: 'eventStack',
    unactiveIcon: require('../../../assets/white-calendar.png'),
    activeIcon: require('../../../assets/red-calendar.png')
  },
  {
    label: 'Solicitações',
    routeName: 'requests',
    unactiveIcon: require('../../../assets/white-users.png'),
    activeIcon: require('../../../assets/red-users.png')
  }
];

const BottomTab = createBottomTabNavigator();
const BottomNavigator = () => {
  const { isAuth } = useAuth();

  const tabBar = ({ state, _descriptors, navigation }) => {
    const renderIcons = () => {
      return BOTTOM_TAB_ROUTES.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            onPress={() => {
              if (index !== 0 && !isAuth)
                return navigation.navigate('LoginScreen');
              navigation.navigate({ name: route.routeName, merge: true });
            }}
            style={styles.topBarItemContainer}
            key={route.label}
          >
            <Image
              source={isFocused ? route.activeIcon : route.unactiveIcon}
              resizeMode="center"
              style={styles.topBarItem}
            ></Image>
            <Text
              style={[
                styles.topBarLabel,
                { color: isFocused ? '#F90000' : '#fff' }
              ]}
            >
              {route.label}
            </Text>
          </TouchableOpacity>
        );
      });
    };

    return <View style={styles.topBar}>{renderIcons()}</View>;
  };

  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="mapStack"
      tabBar={tabBar}
    >
      <BottomTab.Screen name="mapStack" component={MapStack} />
      <BottomTab.Screen name="profile" component={Profile} />
      <BottomTab.Screen name="eventStack" component={eventStack} />
      <BottomTab.Screen name="requests" component={requestStack} />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
