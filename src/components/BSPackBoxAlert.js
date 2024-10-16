import React, {useMemo, useRef, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';

const BSPackBoxAlert = props => {
  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}></View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={props.close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <Image style={styles.orderImage} source={SAL.image.packIcon}></Image>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.orderText}>
            You have Scanned 13 out of 25 items so far.
          </Text>
          <Text style={styles.nameText}>
            Would you like to seal box and mark as filled?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.trackButton}
              onPress={() => {
                // props.navigation.navigate('Parcel')
              }}>
              <Text style={styles.trackText}>No, Cancel</Text>
            </Pressable>
            <Pressable onPress={props.yesSealBox}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#6F137A', '#A881AC']}
                style={styles.assignButton}>
                <Text style={styles.assignText}>Yes, Seal Box</Text>
              </LinearGradient>
            </Pressable>
          </View>
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
    height: 450,
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
    height: 320,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -32,
    alignItems: 'center',
  },
  orderText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    marginTop: 60,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  nameText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 15,
    marginHorizontal: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    width: SAL.constant.screenWidth - 66,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 62,
  },
  assignButton: {
    width: 150,
    height: 45,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignText: {
    color: SAL.colors.white,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
  },
  trackButton: {
    width: 150,
    height: 45,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  trackText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default BSPackBoxAlert;
