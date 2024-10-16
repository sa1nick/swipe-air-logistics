import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, Pressable, Modal} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './ScannedSuccessfullyStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import SALGradientButton from '../../../components/SALGradientButton';
import BSPackBoxAlert from '../../../components/BSPackBoxAlert';

function ScannedSuccessfullyScreen(props) {
  const [showBS, setShowBS] = useState(false);

  const closeModalButton = () => {
    setShowBS(false);
  };

  const sealBoxButton = () => {
    setShowBS(true);
  };

  const yesSealBox = () => {
    setShowBS(false);
    props.navigation.navigate('BoxDimensionScreen')
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBS}
        onRequestClose={closeModalButton}>
        <BSPackBoxAlert close={closeModalButton}  yesSealBox={yesSealBox}/>
      </Modal>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar />
      <View style={styles.locationContainer}>
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.fromWarehouseWhite}></Image>
          <Text style={styles.fromText}>Punjab Port 1</Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text style={styles.fromText}>Mumbai Seller 1</Text>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <Pressable style={styles.reportErrorButton}>
          <Text style={styles.reportErrorText}>Report Error</Text>
        </Pressable>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[0.95, 1.0]}
          colors={['#FFB785', '#FFFFFF']}
          style={styles.countContainer}>
          <Text style={styles.countText}>1/23</Text>
        </LinearGradient>
        <View style={styles.dotContainer}>
          <View style={styles.dotView}></View>
          <View
            style={[styles.dotView, {backgroundColor: SAL.colors.grey}]}></View>
          <View
            style={[styles.dotView, {backgroundColor: SAL.colors.grey}]}></View>
        </View>
        <Image style={styles.successImage} source={SAL.image.success} />
        <Text style={styles.scannedText}>Scanned Successfully</Text>
        <Image style={styles.barContainer} source={SAL.image.bar} />
        <Text style={styles.noteTex}>
          Note: If your current box is full, you can seal it and generate ID
          with QR code. Pending items will be packed in a different box.
        </Text>
        <SALGradientButton buttonTitle={'Seal Box'} buttonPressed={sealBoxButton}/>
      </View>
    </View>
  );
}

export default ScannedSuccessfullyScreen;
