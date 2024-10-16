import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import SAL from '../SAL';

const ArrowDownIcon = () => {
  return (
    <View style={styles.container}>
      <Image source={SAL.image.downArrow} />
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
