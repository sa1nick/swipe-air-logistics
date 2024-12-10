import React, { useRef, useState, useEffect } from 'react';
import { View, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';

import styles from './ScanStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import ActivityIndicator from '../../../components/ActivityIndicator';
import { showAlert } from '../../../utils/Utils';

import { updateProductStatusApi, clearScannedDetails } from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function ScanScreen(props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const isScanned = useRef(false);

  const device = useCameraDevice('back');

  const updateProductStatus = useSelector(state => state.warehouse.updateProductStatus);
  const warehouseApiError = useSelector(state => state.warehouse.error);

  useEffect(() => {
    if (updateProductStatus) {
      console.log('updateProductStatus: ', updateProductStatus)
      setLoading(false);

      Alert.alert(
        '',
        updateProductStatus.message,
        [{ text: 'OK', onPress: () => isScanned.current = false }],
        { cancelable: false },
      );
      dispatch(clearScannedDetails());
    }
  }, [updateProductStatus]);

  useEffect(() => {
    if (warehouseApiError) {
      isScanned.current = false;
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (isScanned.current) return;
      isScanned.current = true;
      // console.log(`Scanned ${codes.length} codes! `, codes);
      const value = codes[0]?.value;
      console.log(value);
      if (value == null) return;
      scannedCodeApi(value);
    },
  });

  const navigationLeftButton = () => {
    console.log('navigationLeftButton')
    props.navigation.goBack();
  };

  const scannedCodeApi = code => {
    setLoading(true);

    const codeArray = code.split(',');

    if (codeArray.length < 3) {
      showAlert('Invalid code');
      return
    }

    const params = {
      wareHouseId: codeArray[codeArray.length - 1],
      pickupWarehouseId: codeArray[codeArray.length - 2],
      productTrackingDetailId: codeArray[codeArray.length - 3],
      status: 3,
    };

    dispatch(updateProductStatusApi(params));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topGradientContainer}>
        <Image source={SAL.image.gradientBg} />
      </View>
      <NavigationBar navigationLeftButton={navigationLeftButton} isBackButton={true} />
      {device != null && (
        <Camera
          style={styles.cameraContainer}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
      )}
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default ScanScreen;
