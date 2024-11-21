import React from 'react';
import {Appearance, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

import SAL from '../SAL';
const colorScheme = Appearance.getColorScheme();

const ActivityIndicator = props => (
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
        backgroundColor:
          colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
        opacity: 0.2,
      }}></View>

    <BallIndicator
      color={colorScheme === 'dark' ? SAL.colors.purple : SAL.colors.purple}
      size={50}
    />
  </View>
);

export default ActivityIndicator;
