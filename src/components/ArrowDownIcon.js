import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import SAL from '../SAL';
import useCustomTheme from '../hook/useCustomTheme';

const ArrowDownIcon = () => {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.downArrow}
        style={{
          tintColor: isDark
            ? SAL.darkModeColors.purpleF0C3F4
            : SAL.colors.purple,
        }}
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
