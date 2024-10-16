import React, {useMemo, useRef, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image, FlatList} from 'react-native';

import SAL from '../SAL';

const BSConsignmentList = props => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.cellContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.subItemContainer}>
            <Text style={styles.itemQuantityText}>{item}</Text>
            <Text style={styles.itemQuantityText}>12</Text>
          </View>
          <Image style={{marginLeft: '5%'}} source={SAL.image.downArrow} />
        </View>
        <View style={styles.orderContainer}>
          <Image style={styles.orderImage} source={SAL.image.orderImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.orderText} numberOfLines={1}>
              Unique ID - Blue Slim fit top small size ...
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
              <Image source={SAL.image.pdfIcon} />
              <Text style={styles.pdfName}>PROD_PUN_MUM.pdf</Text>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}></View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={props.close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <Image
          style={styles.consginmentImage}
          source={SAL.image.consignmentList}></Image>
        <View style={styles.gradientContainer}>
          <Text style={styles.titleText}>Consignment List</Text>
          <FlatList
            data={['Items', 'Boxes', 'Pallets', 'Container']}
            renderItem={renderItem}
          />
          <View style={{height: 100}}/>
        </View>
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
    height: 750,
    alignItems: 'center',
  },
  consginmentImage: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
  },
  gradientContainer: {
    width: '100%',
    height: 705,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -32,
    alignItems: 'center',
    backgroundColor: '#FFDCC4',
  },
  titleText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 50,
    marginBottom: 40,
  },
  cellContainer: {
    marginHorizontal: 16,
  },
  itemContainer: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SAL.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subItemContainer: {
    width: '78%',
    height: '100%',
    marginLeft: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantityText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  orderContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: SAL.colors.white,
  },
  orderImage: {
    width: 36,
    height: 36,
    marginTop: 18,
    marginLeft: 16,
  },
  infoContainer: {
    marginTop: 18,
    marginLeft: 12,
  },
  orderText: {
    width: 260,
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    height: 20,
    marginRight: 10,
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
  pdfContainer: {
    marginVertical: 10,
    height: 20,
    flexDirection: 'row',
  },
  pdfName: {
    color: SAL.colors.black,
    fontSize: 13,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default BSConsignmentList;
