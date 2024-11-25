import React from 'react';
import {Image, Text, StyleSheet, Pressable, Appearance} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';
import {scaleFactor} from '../utils/ViewScaleUtil';

const SALGradientButton = props => {
  return (
    <Pressable onPress={props.buttonPressed} style={props.style}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        // colors={SAL.darkModeColors.buttonPurpleGradient}
        colors={SAL.colors.buttonPurpleGradient}
        style={[styles.button, props.buttonStyle]}>
        {props.image ? (
          <Image style={styles.buttonImage} source={props.image} />
        ) : null}
        <Text
          style={styles.buttonText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {props.buttonTitle}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: scaleFactor(150),
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 22,
  },
  buttonImage: {
    marginRight: 10,
  },
  buttonText: {
    color: SAL.colors.white,
    fontSize: scaleFactor(12),
    fontFamily: 'Rubik-Medium',
    marginTop: 2,
  },
});

export default SALGradientButton;
