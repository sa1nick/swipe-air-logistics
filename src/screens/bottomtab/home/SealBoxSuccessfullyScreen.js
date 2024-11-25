import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import {useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import NavigationBar from '../../../components/NavigationBar';
import SALGradientButton from '../../../components/SALGradientButton';
import useCustomTheme from '../../../hook/useCustomTheme';
import {downloadFile} from '../../../utils/Utils';
import SealBoxSuccessfullyStyle from './SealBoxSuccessfullyStyle';

function SealBoxSuccessfullyScreen(props) {
  const theme = useCustomTheme();
  const styles = SealBoxSuccessfullyStyle(theme === 'dark');
  const {boxData, data} = props.route.params;
  const [loading, setLoading] = useState(false);

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const scanCreateBoxButton = () => {
    props.navigation.navigate('BoxListScreen', {
      data: data,
    });
  };

  const downloadPdf = async () => {
    setLoading(true);
    await downloadFile(boxData.fileName, boxData.outPdfBuffer);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar />
      <View style={styles.locationContainer}>
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.fromWarehouseWhite}></Image>
          <Text style={styles.fromText}>{pickupWarehouse.label}</Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text style={styles.fromText}>{dropoffWarehouse.label}</Text>
        </View>
      </View>
      <Image style={styles.successImage} source={SAL.image.success} />
      <Text style={styles.headingText}>Sealed Successfully</Text>
      <View style={styles.infoBarContainer}>
        <View style={styles.boxContainer}>
          <Image source={data.image} />
          <Text
            style={[
              styles.headingText,
              {fontFamily: 'Rubik-Medium', alignSelf: 'flex-start'},
            ]}>
            {data.title} ID: {boxData.fileName.split('.')[0]}
          </Text>
          <Text style={styles.itemSelectedText}>
            Items Selected: {data.productTrackingDetailIdList.length}
          </Text>
        </View>
        <Image style={{width: 116, height: 116}} source={SAL.image.bar} />
      </View>
      <Pressable style={styles.pdfContainer} onPress={downloadPdf}>
        <View style={styles.pdfNameContainer}>
          <Image source={SAL.image.pdfIcon} />
          <Text style={styles.pdfNameText}>{boxData.fileName}</Text>
        </View>
        <Image style={{marginRight: 15}} source={SAL.image.downloadIcon} />
      </Pressable>
      <Text style={styles.printTex}>
        Print Out the QR Code and paste it on the sealed box.
      </Text>
      <SALGradientButton
        buttonTitle={'Go to List'}
        buttonPressed={scanCreateBoxButton}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default SealBoxSuccessfullyScreen;
