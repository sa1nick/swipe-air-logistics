import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/login/LoginScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import BottomTabBar from '../components/BottomTabBar';
import CreateBoxScreen from '../screens/bottomtab/home/CreateBoxScreen';
import Parcel from '../screens/bottomtab/home/Parcel';
import BoxDimensionScreen from '../screens/bottomtab/home/BoxDimensionScreen';
import SealBoxSuccessfullyScreen from '../screens/bottomtab/home/SealBoxSuccessfullyScreen';
import BoxListScreen from '../screens/bottomtab/home/BoxListScreen';
import ScannedSuccessfullyScreen from '../screens/bottomtab/home/ScannedSuccessfullyScreen';
import AdminDriverAssignmentScreen from '../screens/bottomtab/home/AdminDriverAssignmentScreen';
import ScanScreen from '../screens/bottomtab/warehouserequests/ScanScreen';
import BoxDetailScreen from '../screens/bottomtab/home/BoxDetailScreen';
import PalletDetailScreen from '../screens/bottomtab/home/PalletDetailScreen';
import MoveToContainerScreen from '../screens/bottomtab/home/MoveToContainerScreen';
import BSChooseDriver from '../components/BSChooseDriver';
import ConsignmentList from '../screens/bottomtab/driverassignment/ConsignmentList';
import ConsignmentDetailScreen from '../screens/bottomtab/driverassignment/ConsignmentDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = props => {
  const screenOptions = {
    header: () => null, // This function will hide the header
  };

  const ConsignmentStackNav = createNativeStackNavigator();

  const ConsignmentStackStack = () => {
    return (
      <ConsignmentStackNav.Navigator
        screenOptions={({navigation}) => ({
          gestureEnabled: false,
          headerShown: false,
        })}>
        <ConsignmentStackNav.Screen
          name="ConsignmentList"
          component={ConsignmentList}
        />
        <ConsignmentStackNav.Screen
          name="ConsignmentDetailScreen"
          component={ConsignmentDetailScreen}
        />
        <ConsignmentStackNav.Screen
          name="BoxDetailScreenConsignment"
          component={BoxDetailScreen}
        />
        <ConsignmentStackNav.Screen
          name="PalletDetailScreenConsignment"
          component={PalletDetailScreen}
        />
      </ConsignmentStackNav.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={props.initialRoute}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
        <Stack.Screen name="CreateBoxScreen" component={CreateBoxScreen} />
        <Stack.Screen name="Parcel" component={Parcel} />
        <Stack.Screen
          name="BoxDimensionScreen"
          component={BoxDimensionScreen}
        />
        <Stack.Screen
          name="SealBoxSuccessfullyScreen"
          component={SealBoxSuccessfullyScreen}
        />
        <Stack.Screen name="BoxListScreen" component={BoxListScreen} />
        <Stack.Screen
          name="ScannedSuccessfullyScreen"
          component={ScannedSuccessfullyScreen}
        />
        <Stack.Screen
          name="AdminDriverAssignmentScreen"
          component={AdminDriverAssignmentScreen}
        />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="BoxDetailScreen" component={BoxDetailScreen} />
        <Stack.Screen
          name="PalletDetailScreen"
          component={PalletDetailScreen}
        />
        <Stack.Screen
          name="MoveToContainerScreen"
          component={MoveToContainerScreen}
        />
        <Stack.Screen
          name="BSChooseDriver"
          component={BSChooseDriver}
          options={({navigation}) => ({
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          })}
        />
        <Stack.Screen
          name="ConsignmentScreen"
          component={ConsignmentStackStack}
          options={({navigation}) => ({
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
