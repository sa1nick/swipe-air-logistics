/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SAL from '../SAL';
import HomeScreen from '../screens/bottomtab/home/HomeScreen';
import WarehouseRequestsScreen from '../screens/bottomtab/warehouserequests/WarehouseRequestsScreen';
import DriverAssignmentScreen from '../screens/bottomtab/driverassignment/DriverAssignmentScreen';

const Tab = createBottomTabNavigator();

function BottomTabBar(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? SAL.image.homeSelectedTab : SAL.image.homeTab;
          } else if (route.name === 'Warehouse Requests') {
            iconName = focused ? SAL.image.whrSelectedTab : SAL.image.whrTab;
          } else if (route.name === 'Driver Assignment') {
            iconName = focused ? SAL.image.daSelectedTab : SAL.image.daTab;
          }

          // You can return any component that you like here!
          return <Image source={iconName} />;
        },
        tabBarActiveTintColor: SAL.colors.purple,
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: styles.tabBarStyle,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Warehouse Requests"
        component={WarehouseRequestsScreen}
      />
      <Tab.Screen name="Driver Assignment" component={DriverAssignmentScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 16,
  },
  tabBarStyle: {
    backgroundColor: 'white', // Set the background color of the tab bar
    ...Platform.select({
      ios: {
        shadowColor: '#E5E5E5',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default BottomTabBar;
