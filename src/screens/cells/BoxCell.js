import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';

import moment from 'moment';

import SAL from '../../SAL';

const BoxCell = props => {
  const downloadPdf = () => {
    props.downloadPdf(props.item);
  };

  const Dot = () => <View style={styles.dot}></View>;

  const DimensionView = data => {
    return (
      <View style={[styles.dimensionContainer, {alignItems: data.position}]}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.dimensionText}>{data.dimension}</Text>
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => {
        props.onPressOrderCell(props.index);
      }}
      style={[
        styles.container,
        props.boxStyles,
        // {
        //   height: Platform.OS === 'ios' ? 245 : 255,
        // },
      ]}>
      <ImageBackground
        style={[
          styles.subContainer,
          // {
          //   height: Platform.OS === 'ios' ? 235 : 245,
          // },
        ]}
        resizeMode="stretch"
        source={
          props.item.isSelected ? SAL.image.orderBgSelected : SAL.image.orderBg
        }>
        <Image
          style={styles.orderImage}
          source={
            props.selectedIndex === 0
              ? SAL.image.boxTick
              : props.selectedIndex === 1
              ? SAL.image.palletTickIcon
              : SAL.image.containerTickIcon
          }></Image>
        <Text style={styles.orderText}>
          {props.item.packageQRCodeFile.split('.')[0]}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.line}>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <DimensionView
              title={'LENGTH'}
              dimension={props.item.pkgLength + ' cm'}
              position={'flex-start'}
            />
            <DimensionView
              title={'WIDTH'}
              dimension={props.item.pkgWidth + ' cm'}
              position={'center'}
            />
            <DimensionView
              title={'HEIGHT'}
              dimension={props.item.pkgHeight + ' cm'}
              position={'center'}
            />
            <DimensionView
              title={'WEIGHT'}
              dimension={props.item.pkgWeight + ' kg'}
              position={'flex-end'}
            />
          </View>
        </View>
        {props.selectedIndex != 2 ? (
          <Pressable
            style={styles.itemsInsideView}
            onPress={() => {
              props.onPressDetailCell(props.index);
            }}>
            <Text style={styles.itemInsideText}>
              {props.selectedIndex === 0 ? 'Item ' : 'Box '} Inside
            </Text>
            <Text style={styles.quantityText}>{props.item.totalItem}</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.itemsInsideView}
            onPress={() => {
              props?.onPressDetailCell(props.index);
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.itemInsideText}>Box Inside</Text>
              <Text style={styles.quantityText}>{props.item.total_Box}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.itemInsideText}>Pallet Inside</Text>
              <Text style={styles.quantityText}>{props.item.total_Pallet}</Text>
            </View>
          </Pressable>
        )}
        <Text style={[styles.orderText, {fontSize: 14, marginTop: 10}]}>
          Created By: {props.item.createdByName}
        </Text>
        <Text style={[styles.orderText, {fontSize: 14, marginTop: 10}]}>
          Date & Time:{' '}
          {moment(props.item.createdDateUtc).format('YYYY/MM/DD HH:mm')}
        </Text>
        {!props.isRemainingWeight && !props.isDriver ? (
          <Pressable style={styles.pdfContainer} onPress={downloadPdf}>
            <Image source={SAL.image.pdfIcon} />
            <Text style={[styles.orderText, {fontSize: 14, marginTop: 0}]}>
              {props.item.packageQRCodeFile}
            </Text>
          </Pressable>
        ) : null}
        {props.isRemainingWeight ? (
          <Text style={[styles.orderText, {fontSize: 14, marginTop: 14}]}>
            Remaining weight: {props.item.remaining_Weight} KG
          </Text>
        ) : null}

        {props.isDriver ? (
          <View style={styles.driverInfoContainer}>
            <View style={styles.nameContainer}>
              <Image source={SAL.image.truckDriver} />
              <View style={styles.driverNameSubContainer}>
                <Text style={[styles.itemInsideText, {marginLeft: 0}]}>
                  Driver Name
                </Text>
                <Text style={styles.nameText}>{props.item.driverName}</Text>
              </View>
            </View>
            <View style={styles.vehicleContainer}>
              <Text style={[styles.itemInsideText, {marginLeft: 0}]}>
                Vehicle
              </Text>
              <Text style={styles.nameText}>{props.item.vehicleNo}</Text>
            </View>
          </View>
        ) : null}
        <View style={{height: 20}} />
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: Platform.OS === 'ios' ? 245 : 255,
  },
  subContainer: {
    marginHorizontal: 16,
    // height: Platform.OS === 'ios' ? 235 : 245,
  },
  orderImage: {
    marginTop: 13,
    marginLeft: 15,
  },
  orderText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginLeft: 15,
    marginTop: 15,
  },
  infoContainer: {
    marginHorizontal: 25,
    height: 50,
    marginTop: 10,
  },
  line: {
    width: '100%',
    height: 1,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: SAL.colors.white,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: -4,
    backgroundColor: SAL.colors.orange,
  },
  dimensionContainer: {
    width: 60,
    height: 35,
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: 8,
    fontFamily: 'Rubik-Regular',
    color: '#919191',
    marginBottom: 3,
  },
  dimensionText: {
    fontSize: 9,
    fontFamily: 'Rubik-Medium',
    color: '#1E1E1E',
  },
  itemsInsideView: {
    marginHorizontal: 13,
    height: 32,
    backgroundColor: SAL.colors.white,
    borderRadius: 8,
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInsideText: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: SAL.colors.grey,
    marginLeft: 20,
  },
  quantityText: {
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    color: '#131313',
    marginRight: 13,
  },
  pdfContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 17,
    alignItems: 'center',
  },
  driverInfoContainer: {
    marginHorizontal: 16,
    height: 40,
    marginTop: 7,
    flexDirection: 'row',
  },
  nameContainer: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverNameSubContainer: {
    height: '100%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  vehicleContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    color: SAL.colors.black,
  },
});

export default BoxCell;
