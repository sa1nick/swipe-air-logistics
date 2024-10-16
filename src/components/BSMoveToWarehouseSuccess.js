import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';
import { downloadFile } from '../utils/Utils';
import ActivityIndicator from './ActivityIndicator';

const BSMoveToWarehouseSuccess = props => {

  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    await downloadFile(props.data.data.fileName, props.data.data.outPdfBuffer)
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}></View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={props.close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <View style={styles.orderView}>
          <Image
            style={styles.orderImage}
            source={
              props.order.productPhotoUrlPath
                ? {uri: props.order.productPhotoUrlPath}
                : null
            }></Image>
          <Image
            style={{marginTop: -15, marginRight: -10}}
            source={SAL.image.verifiedTick}
          />
        </View>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.orderText}>{props.order.name}</Text>
          <Text style={styles.quantityText}>
            Quantity : {props.orderData.quantity}
          </Text>
          <Pressable style={styles.pdfContainer} onPress={downloadPdf}>
            <View style={styles.pdfNameContainer}>
              <Image source={SAL.image.pdfBigIcon} />
              <Text style={styles.pdfNameText}>{props.data.data.fileName}</Text>
            </View>
            <Image style={{marginRight: 15}} source={SAL.image.downloadIcon} />
          </Pressable>
          <Text style={styles.printText}>
            Print out the QR Code PDF and paste it on each product
          </Text>
          <Text style={styles.messageText}>
            Successfully moved to {props.orderData.toWarehouseName} Warehouse
            You can scan product or you can move more
            products to different warehouse.
          </Text>
          <View style={styles.createContainer}>
            <Pressable style={styles.createButton} onPress={props.close}>
              <Image source={SAL.image.moveMoreIcon} />
              <Text style={styles.createButtonText}>Move More</Text>
            </Pressable>
            <View style={styles.buttonSeparator} />
            <Pressable style={styles.createButton} onPress={props.scanProduct}>
              <Image source={SAL.image.createBoxIcon} />
              <Text style={styles.createButtonText}>Scan</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
      {loading && <ActivityIndicator />}
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
    height: 550,
    alignItems: 'center',
  },
  orderView: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
    alignItems: 'flex-end',
  },
  orderImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  gradientContainer: {
    width: '100%',
    height: 420,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -32,
    alignItems: 'center',
  },
  orderText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 60,
  },
  quantityText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    marginTop: 5,
  },
  pdfContainer: {
    width: '90%',
    height: 50,
    borderRadius: 8,
    marginTop: 18,
    backgroundColor: SAL.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pdfNameContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfNameText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 5,
  },
  printText: {
    color: SAL.colors.grey,
    fontSize: 13,
    fontFamily: 'Rubik-Italic',
    marginTop: 10,
    textAlign: 'center',
  },
  messageText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginTop: 37,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  createContainer: {
    marginHorizontal: 40,
    height: 45,
    borderColor: SAL.colors.orange,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 30,
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '48%',
  },
  createButtonText: {
    color: SAL.colors.orange,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
  buttonSeparator: {
    width: 1,
    marginVertical: 12,
    backgroundColor: SAL.colors.orange,
  },
});

export default BSMoveToWarehouseSuccess;
