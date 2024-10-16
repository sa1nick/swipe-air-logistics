import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Platform, LogBox} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import {StorageKey} from './src/utils/Enum';
import {getData} from './src/utils/Utils';
import ActivityIndicator from './src/components/ActivityIndicator';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
}

LogBox.ignoreAllLogs();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getData(StorageKey.userData);
        console.log(userData)
        if (userData) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setIsLoading(false);
      SplashScreen.hide();
    };

    getUserData();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AppNavigator
            initialRoute={isLoggedIn ? 'BottomTabBar' : 'LoginScreen'}
          />
        )}
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
