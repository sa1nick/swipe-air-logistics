import React, {useMemo, useRef, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';

const BSRemindDriver = props => {
  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}></View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={props.close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <Image style={styles.orderImage} source={SAL.image.success}></Image>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.headingText}>Reminder Send to Driver</Text>
          <Pressable
              style={styles.closeButton}
              onPress={props.close}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blackContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: SAL.colors.black,
    opacity: 0.8,
  },
  bottomContainer: {
    width: '100%',
    height: 380,
    alignItems: 'center',
  },
  orderImage: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
  },
  gradientContainer: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -32,
    alignItems: 'center',
  },
  headingText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 70,
  },
  closeButton: {
    width: 160,
    height: 45,
    marginTop: 42,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  closeText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default BSRemindDriver;
