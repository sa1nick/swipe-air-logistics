/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Keyboard, Platform, StyleSheet, Text} from 'react-native';

import useCustomTheme from '../hook/useCustomTheme';
import SAL from '../SAL';
import DriverAssignmentScreen from '../screens/bottomtab/driverassignment/DriverAssignmentScreen';
import HomeScreen from '../screens/bottomtab/home/HomeScreen';
import WarehouseRequestsScreen from '../screens/bottomtab/warehouserequests/WarehouseRequestsScreen';
import {scaleFactor} from '../utils/ViewScaleUtil';

const Tab = createBottomTabNavigator();

const TabLabel = ({focused, label}) => {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';

  return (
    <Text
      style={[
        styles.tabBarLabel,
        {
          color: focused
            ? isDark
              ? SAL.darkModeColors.purpleF0C3F4
              : '#7A2783'
            : isDark
            ? SAL.darkModeColors.tabInActive
            : '#8A8A8A',
        },
      ]}
      adjustsFontSizeToFit={true}
      numberOfLines={1}>
      {label}
    </Text>
  );
};

function BottomTabBar(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';

  const tabBarStyleWithBackground = {
    ...styles.tabBarStyle,
    backgroundColor: isDark ? SAL.darkModeColors.black22262A : SAL.colors.white,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
        },
        header: () => null,
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        tabBarStyle: {display: Keyboard.isVisible ? 'none' : 'flex'},
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? SAL.image.homeSelectedTab : SAL.image.homeTab;
          } else if (route.name === 'Warehouse Requests') {
            iconName = focused ? SAL.image.whrSelectedTab : SAL.image.whrTab;
          } else if (route.name === 'Driver Assignment') {
            iconName = focused ? SAL.image.daSelectedTab : SAL.image.daTab;
          }

          return (
            <Image
              source={iconName}
              style={[
                styles.tabBarIcon,
                {
                  tintColor:
                    focused && isDark
                      ? SAL.darkModeColors.purpleF0C3F4
                      : undefined,
                },
              ]}
            />
          );
        },
        tabBarActiveTintColor: isDark
          ? SAL.darkModeColors.purpleF0C3F4
          : '#7A2783',
        tabBarInactiveTintColor: isDark
          ? SAL.darkModeColors.tabInActive
          : '#8A8A8A',
        tabBarStyle: tabBarStyleWithBackground,
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
  tabBarIcon: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignSelf: 'center',
  },

  tabBarLabel: {
    fontSize: scaleFactor(11),
    // borderWidth: 1,
    // flexDirection: 'row',
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 100,
    // height: scaleFactor(100),
    // marginLeft: -10,
  },
  tabBarStyle: {
    height: scaleFactor(75),
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
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
