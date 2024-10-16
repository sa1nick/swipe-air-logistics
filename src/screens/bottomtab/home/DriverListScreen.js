import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable, Modal} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './DriverListStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';

function DriverListScreen(props) {
  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar
        navigationLeftButton={navigationLeftButton}
        isBackButton={true}
      />
    </View>
  );
}

export default DriverListScreen;
