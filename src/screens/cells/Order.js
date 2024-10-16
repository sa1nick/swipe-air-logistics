import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Platform
} from 'react-native';

import SAL from '../../SAL';

const Order = props => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.subContainer}
        resizeMode="stretch"
        source={SAL.image.orderBg}>
        <Image style={styles.orderImage} source={SAL.image.orderImage}></Image>
        <Text style={styles.orderText}>
          Blue Slim fit top small size for women
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.categoryContainer}>
            <Text style={styles.orderTypeText}>Medical</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.orderTypeText}>Diagnostic</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.orderTypeText}>L3 Sub Category</Text>
          </View>
        </View>
        <View style={styles.pdfContainer}>
          <Image source={SAL.image.pdfIcon}/>
          <Text style={styles.pdfNameText}>PROD_PUN_MUM.pdf</Text>
        </View>
        
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'ios' ? 175 : 185,
  },
  subContainer: {
    marginHorizontal: 16,
    height: Platform.OS === 'ios' ? 165 : 175
  },
  orderImage: {
    marginTop: 15,
    marginLeft: 15,
  },
  orderText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginLeft: 15,
    marginTop: 10,
  },
  quantityText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginLeft: 15,
    marginTop: 7,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    height: 20,
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FF7517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTypeText: {
    color: SAL.colors.purple,
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
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
    marginTop: 10
  }
});

export default Order;
