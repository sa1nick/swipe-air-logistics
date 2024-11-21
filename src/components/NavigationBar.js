import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import SAL from '../SAL';

const NavigationBar = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image style={styles.logo} source={SAL.image.saLogo}></Image>
        <Pressable
          style={styles.profileButton}
          onPress={props.navigationLeftButton}>
          {props.isBackButton ? (
            <Image
              style={{marginBottom: 6}}
              source={SAL.image.backIconWhite}></Image>
          ) : (
            <>
              <Image
                style={styles.defaultProfile}
                source={SAL.image.defaultProfile}></Image>
              <Image style={styles.cubeBox} source={SAL.image.cubeBox}></Image>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.questionButton}
          onPress={props.notificationButton}>
          <Image source={SAL.image.questionHelp}></Image>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: DeviceInfo.hasNotch() ? 90 : 50,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
  profileButton: {
    position: 'absolute',
    marginLeft: 16,
    width: 38,
    height: 40,
    justifyContent: 'flex-end',
  },
  defaultProfile: {
    width: 28,
    height: 28,
  },
  cubeBox: {
    width: 18,
    height: 18,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  questionButton: {
    position: 'absolute',
    marginLeft: 16,
    width: 26,
    height: 26,
    right: 16,
  },
  backButton: {
    position: 'absolute',
    marginLeft: 14,
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default NavigationBar;
