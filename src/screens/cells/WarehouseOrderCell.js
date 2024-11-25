import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Platform,
  Appearance,
} from 'react-native';

import SAL from '../../SAL';
import {scaleFactor} from '../../utils/ViewScaleUtil';
import useCustomTheme from '../../hook/useCustomTheme';

const WarehouseOrderCell = props => {
  const theme = useCustomTheme(); // Get current theme using custom component
  const isDark = theme === 'dark'; // Check if the theme is dark or light

  const downloadPdf = () => {
    props.downloadPdf(props.item);
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 20,

      // height: Platform.OS === 'ios' ? 175 : 185,
    },
    subContainer: {
      marginHorizontal: 16,
      paddingRight: 10,
      // height: Platform.OS === 'ios' ? 165 : 175,
    },
    orderImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginTop: 15,
      marginLeft: 15,
      backgroundColor: SAL.colors.purple,
    },
    orderText: {
      color: isDark ? SAL.darkModeColors.black22262A : SAL.colors.black,
      fontSize: scaleFactor(14),
      fontFamily: 'Rubik-Medium',
      marginLeft: 15,
      marginTop: 10,
      flexWrap: 'wrap',
      // borderWidth: 1,
    },
    quantityText: {
      color: isDark ? SAL.darkModeColors.black22262A : SAL.colors.black,
      fontSize: scaleFactor(13),
      fontFamily: 'Rubik-Regular',
      marginLeft: 15,
      marginTop: 7,
    },
    categoryContainer: {
      paddingHorizontal: 10,
      height: 20,
      marginLeft: 10,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: isDark ? SAL.darkModeColors.orange3D1800 : '#FF7517',
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderTypeText: {
      color: isDark ? SAL.darkModeColors.purple45014C : SAL.colors.purple,
      fontSize: scaleFactor(12),
      fontFamily: 'Rubik-Regular',
    },
    pdfNameText: {
      color: SAL.colors.black,
      fontSize: scaleFactor(13),
      fontFamily: 'Rubik-Medium',
      marginLeft: 10,
    },
    pdfContainer: {
      flexDirection: 'row',
      marginLeft: 16,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 15,
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (!props.isPdf || props.isScanned) {
          props.onPressOrderCell(props.index);
        }
      }}>
      <ImageBackground
        imageStyle={{
          tintColor: isDark
            ? props.item.isSelected
              ? SAL.darkModeColors.purpleEBC8EF
              : SAL.darkModeColors.orangeImgColor
            : undefined,
        }}
        style={styles.subContainer}
        resizeMode="stretch"
        source={
          props.item.isSelected ? SAL.image.orderBgSelected : SAL.image.orderBg
        }>
        <Image
          style={styles.orderImage}
          source={
            props.item.productPhotoUrlPath
              ? {uri: props.item.productPhotoUrlPath}
              : null
          }
        />
        <Text
          style={styles.orderText}
          // adjustsFontSizeToFit={true}
          // numberOfLines={2}
        >
          {props.item.name}
        </Text>
        {!props.isPdf ? (
          <Text style={styles.quantityText}>
            Quantity: {props.item.stockQuantityRemaining}
          </Text>
        ) : null}
        {!props.isPdf ? (
          <Text style={styles.quantityText}>
            Added By: {props.item.sellerName}
          </Text>
        ) : (
          <Text
            style={styles.quantityText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Moved By: {props.movedBy}
          </Text>
        )}
        {!props.isPdf ? (
          <Text style={styles.quantityText}>
            Warehouse: {props.item.warehouseName}
          </Text>
        ) : null}
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {props.categoryArray.map((categoryName, index) => (
            <View style={styles.categoryContainer} key={categoryName || index}>
              <Text style={styles.orderTypeText}>{categoryName}</Text>
            </View>
          ))}
        </View>
        {props.isPdf ? (
          <Pressable style={styles.pdfContainer} onPress={downloadPdf}>
            <Image source={SAL.image.pdfIcon} />
            <Text style={styles.pdfNameText}>
              {props.item.qrCodeFileNamePath}
            </Text>
          </Pressable>
        ) : null}
      </ImageBackground>
    </Pressable>
  );
};

export default WarehouseOrderCell;
