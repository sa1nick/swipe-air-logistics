import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';
import SALGradientButton from './SALGradientButton';
import {showAlert} from '../utils/Utils';

const BSPickupDropoffOrder = props => {
  const [quantity, setQuantity] = useState('');
  const [dropOffValue, setDropOffValue] = useState(null);
  const [toWarehouseName, setToWarehouseName] = useState(null);

  const arrowDownIcon = () => (
    <View style={{marginRight: 20, height: 50, justifyContent: 'center'}}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  const handleValueChange = (value, index) => {
    if (index) {
      setToWarehouseName(props.dropOffList[index - 1].label);
    }
    setDropOffValue(value);
  };

  const onClosePicker = () => {};

  const PickupContainer = item => {
    return (
      <View style={styles.commonContainer}>
        <Text style={styles.commonText}>{item.title}</Text>
        <View style={styles.separator} />
        <Text style={styles.dropdownText}>{props.pickupWarehoue}</Text>
      </View>
    );
  };

  const validateForm = () => {
    let errorMessage = '';
    let isValidForm = true;

    if (!quantity.length) {
      errorMessage = 'Please enter quantity';
      isValidForm = false;
    } else if (quantity > props.order.stockQuantityRemaining) {
      errorMessage = 'The entered quantity exceeds the total quantity';
      isValidForm = false;
    } else if (!dropOffValue) {
      errorMessage = 'Please select drop off';
      isValidForm = false;
    }

    if (isValidForm) {
      props.moveToWareHouse({quantity, dropOffValue, toWarehouseName})
    } else {
      showAlert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackContainer}></View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={props.close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <Image
          style={styles.orderImage}
          source={
            props.order.productPhotoUrlPath
              ? {uri: props.order.productPhotoUrlPath}
              : null
          }></Image>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.orderText}>{props.order.name}</Text>
          <Text style={styles.quantityText}>
            Quantity: {props.order.stockQuantityRemaining}
          </Text>
          <View style={styles.commonContainer}>
            <Text style={styles.commonText}>Quantity</Text>
            <View style={styles.separator} />
            <TextInput
              style={styles.inputField}
              value={quantity}
              placeholder={'Quantity to move'}
              placeholderTextColor={'#9A9A9A'}
              keyboardType={'numeric'}
              onChangeText={value => {
                setQuantity(value);
              }}
            />
          </View>
          <PickupContainer
            title={'Pickup'}
            placeholder={'Select Pickup Location'}
          />
          <View style={styles.commonContainer}>
            <Text style={styles.commonText}>Drop Off</Text>
            <View style={styles.separator} />
            <RNPickerSelect
              placeholder={{label: 'Select Drop Off', value: null}}
              items={props.dropOffList}
              onValueChange={handleValueChange}
              onClose={onClosePicker}
              value={dropOffValue}
              useNativeAndroidPickerStyle={false}
              Icon={arrowDownIcon}
              style={pickerSelectStyles}
            />
          </View>
          <SALGradientButton
            buttonTitle={'Move to Warehouse'}
            image={SAL.image.warehouseButton}
            buttonPressed={validateForm}
          />
        </LinearGradient>
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
    height: 550,
    alignItems: 'center',
  },
  orderImage: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: SAL.colors.purple,
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
    marginTop: 45,
  },
  quantityText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    marginTop: 7,
    marginBottom: 17,
  },
  commonContainer: {
    width: SAL.constant.screenWidth - 32,
    height: 50,
    backgroundColor: SAL.colors.white,
    borderRadius: 12,
    marginBottom: 11,
    borderWidth: 0.5,
    borderColor: '#B5B5B5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonText: {
    width: 65,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 15,
  },
  separator: {
    width: 0.5,
    height: 50,
    marginLeft: 15,
    backgroundColor: '#B5B5B5',
  },
  inputField: {
    width: 150,
    height: 50,
    marginLeft: 15,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: '#9A9A9A',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginLeft: 15,
    color: '#9A9A9A',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: SAL.constant.screenWidth - 32 - 95,
    height: 50,
    color: '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 15,
  },
  inputAndroid: {
    width: SAL.constant.screenWidth - 32 - 95,
    height: 50,
    color: '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 15,
    paddingVertical: 5,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});

export default BSPickupDropoffOrder;
