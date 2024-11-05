/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SAL from '../SAL';
import HomeScreen from '../screens/bottomtab/home/HomeScreen';
import WarehouseRequestsScreen from '../screens/bottomtab/warehouserequests/WarehouseRequestsScreen';
import DriverAssignmentScreen from '../screens/bottomtab/driverassignment/DriverAssignmentScreen';
import {scaleFactor} from '../utils/ViewScaleUtil';

const Tab = createBottomTabNavigator();

const TabLabel = ({focused, label}) => (
  <Text
    style={styles.tabBarLabel}
    adjustsFontSizeToFit={true}
    numberOfLines={1}>
    {label}
  </Text>
);

function BottomTabBar(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => null,
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? SAL.image.homeSelectedTab : SAL.image.homeTab;
          } else if (route.name === 'Warehouse Requests') {
            iconName = focused ? SAL.image.whrSelectedTab : SAL.image.whrTab;
          } else if (route.name === 'Driver Assignment') {
            iconName = focused ? SAL.image.daSelectedTab : SAL.image.daTab;
          }

          return <Image source={iconName} />;
        },
        tabBarActiveTintColor: SAL.colors.purple,
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabel: ({focused}) => (
          <TabLabel focused={focused} label={route.name} />
        ),
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
  tabBarLabel: {
    fontSize: scaleFactor(11),
    marginTop: -10,
  },
  tabBarStyle: {
    height: scaleFactor(81),
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
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
