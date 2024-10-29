import React from 'react';
import {StyleSheet, Text, View, Pressable, Image, Platform} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import SAL from '../../SAL';

const OrderCreateBoxCell = props => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={SAL.colors.orangeWhiteGradient}
        style={styles.bgGradientContainer}>
        <View style={styles.locationContainer}>
          <View style={styles.fromToContainer}>
            <Image source={SAL.image.fromWarehouse}></Image>
            <Text style={styles.fromText}>Punjab Port 1</Text>
          </View>
          <Image source={SAL.image.tripleArrow} />
          <View style={styles.fromToContainer}>
            <Image source={SAL.image.toWarehouse}></Image>
            <Text style={[styles.fromText, {color: SAL.colors.purple}]}>
              Mumbai Seller 1
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Image source={SAL.image.orderImage} />
          <View style={styles.nameQuantityContainer}>
            <Text style={styles.orderNameText}>
              Blue Slim fit top small size for women
            </Text>
            <Text style={styles.quantityText}>Quantity : 20</Text>
          </View>
        </View>
        <Text style={styles.requestText}>Request Date: 23/5/2023</Text>
        <View style={styles.statusContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.quantityText}>Status </Text>
          <Text style={styles.orderStatusText}>Yet to assign</Text>
        </View>
        <View style={styles.pdfContainer}>
          <Image source={SAL.image.pdfBigIcon} />
          <Text style={styles.pdfNameText}>PROD_PUN_MUM.pdf</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 235,
  },
  bgGradientContainer: {
    marginHorizontal: 16,
    height: 215,
    borderRadius: 8,
  },
  locationContainer: {
    marginHorizontal: 16,
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: '#B1B1B1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromToContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
  fromText: {
    color: '#FF6D09',
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 5,
  },
  infoContainer: {
    marginHorizontal: 16,
    marginVertical: 5,
    flexDirection: 'row',
    height: 50,
  },
  nameQuantityContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  orderNameText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    paddingRight: 10,
  },
  quantityText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  requestText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Italic',
    marginTop: 5,
    marginLeft: 16,
  },
  statusContainer: {
    marginLeft: 16,
    marginVertical: 5,
    flexDirection: 'row',
    width: SAL.constant.screenWidth - 32,
    height: 20,
    alignItems: 'center',
  },
  divider: {
    width: '50%',
    height: 0.5,
    backgroundColor: '#B1B1B1',
    marginRight: 20,
  },
  orderStatusText: {
    color: '#FF6D09',
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
  pdfNameText: {
    color: SAL.colors.black,
    fontSize: 13,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
  pdfContainer: {
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'center',
  },
});

export default OrderCreateBoxCell;
