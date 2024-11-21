import React from 'react';
import {View, Image, StyleSheet, useColorScheme} from 'react-native';

import SAL from '../SAL';

const ArrowDownIcon = () => {
  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.downArrow}
        style={{tintColor: useColorScheme() === 'dark' ? '#F0C3F4' : ''}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
  },
});

export default ArrowDownIcon;
