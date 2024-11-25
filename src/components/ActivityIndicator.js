/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

import SAL from '../SAL';
import useCustomTheme from '../hook/useCustomTheme';

const ActivityIndicator = props => {
  const theme = useCustomTheme(); // Get current theme using custom component
  const isDark = theme === 'dark';

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? SAL.colors.white : SAL.colors.black,
          opacity: 0.2,
        }}
      />

      <BallIndicator
        color={isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple}
        size={50}
      />
    </View>
  );
};

export default ActivityIndicator;
