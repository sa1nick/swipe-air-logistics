import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import styles from './BoxDimensionStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import Dimensions from '../../../components/Dimensions';
import SALGradientButton from '../../../components/SALGradientButton';
import {showAlert} from '../../../utils/Utils';
import ActivityIndicator from '../../../components/ActivityIndicator';
import ArrowDownIcon from '../../../components/ArrowDownIcon';

import {
  createBoxApi,
  createPalletApi,
  createBoxToContainerApi,
  createPalletToContainerApi,
  clearCreateBPC,
  getContainerTypeApi,
  clearContainerType,
  getContainerTypeDimensionByIdApi,
  addContainerDetailApi,
} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function BoxDimensionScreen(props) {
  const {data, item, isExist, from} = props.route.params;

  const [containerTypeList, setContainerTypeList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [valueChanged, setValueChanged] = useState(false);
  const [dimensionValue, setDimensionValue] = useState(null);

  const lengthRef = useRef('');
  const widthRef = useRef('');
  const heightRef = useRef('');
  const weightRef = useRef('');

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const containerType = useSelector(state => state.warehouse.containerType);
  const containerTypeError = useSelector(
    state => state.warehouse.containerTypeError,
  );

  const containerTypeDimension = useSelector(
    state => state.warehouse.containerTypeDimension,
  );
  const containerTypeDimensionError = useSelector(
    state => state.warehouse.containerTypeDimensionError,
  );

  const createBoxStatus = useSelector(state => state.warehouse.createBox);
  const createPalletStatus = useSelector(state => state.warehouse.createPallet);
  const createContainerStatus = useSelector(
    state => state.warehouse.createContainer,
  );
  const warehouseApiError = useSelector(state => state.warehouse.error);

  useEffect(() => {
    setLoading(true);
    if (!isExist) {
      dispatch(getContainerTypeApi());
    } else {
      lengthRef.current = item.pkgLength;
      widthRef.current = item.pkgWidth;
      heightRef.current = item.pkgHeight;
      weightRef.current = item.pkgWeight;

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    if (data.title === 'Box' || data.title === 'Pallet') {
      setSelectedValue(1);
    }

    return () => dispatch(clearContainerType());
  }, []);

  useEffect(() => {
    console.log('containerType: ', containerType);
    if (containerType) {
      setLoading(false);

      const arrayList = containerType.data.map(item => {
        return {
          label: item.name,
          value: item.id.toString(),
        };
      });
      setContainerTypeList(arrayList);
    }
  }, [containerType]);

  useEffect(() => {
    if (containerTypeError) {
      setLoading(false);
    }
  }, [containerTypeError]);

  useEffect(() => {
    console.log('containerTypeDimension: ', containerTypeDimension);
    if (containerTypeDimension) {
      setLoading(false);
      lengthRef.current = containerTypeDimension.data[0].length;
      widthRef.current = containerTypeDimension.data[0].width;
      heightRef.current = containerTypeDimension.data[0].height;
      weightRef.current = containerTypeDimension.data[0].weight;
    }
  }, [containerTypeDimension]);

  useEffect(() => {
    if (containerTypeDimensionError) {
      setLoading(false);
    }
  }, [containerTypeDimensionError]);

  useEffect(() => {
    if (createBoxStatus) {
      console.log('createBoxStatus: ', createBoxStatus);
      setLoading(false);
      if (createBoxStatus.code === SAL.codeEnum.code200) {
        console.log('CreatedBox', createBoxStatus.data);
        console.log('CreatedBox data', data);

        props.navigation.replace('SealBoxSuccessfullyScreen', {
          boxData: createBoxStatus.data,
          data: data,
        });
        clearData();
      } else {
        showAlert(createBoxStatus.message);
      }
    }
  }, [createBoxStatus]);

  useEffect(() => {
    if (createPalletStatus) {
      console.log('createPalletStatus: ', createPalletStatus);
      setLoading(false);
      if (createPalletStatus.code === SAL.codeEnum.code200) {
        props.navigation.replace('SealBoxSuccessfullyScreen', {
          boxData: createPalletStatus.data,
          data: data,
        });
        clearData();
      } else {
        showAlert(createBoxStatus.message);
      }
    }
  }, [createPalletStatus]);

  useEffect(() => {
    if (createContainerStatus) {
      console.log('createContainerStatus: ', createContainerStatus);
      setLoading(false);
      if (createContainerStatus.code === SAL.codeEnum.code200) {
        props.navigation.replace('SealBoxSuccessfullyScreen', {
          boxData: createContainerStatus.data,
          data: data,
        });
        clearData();
      } else {
        showAlert(createContainerStatus.message);
      }
    }
  }, [createContainerStatus]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const clearData = () => {
    dispatch(clearCreateBPC());
  };

  const generateIdQrCodeButton = () => {
    validateForm();
  };

  const validateForm = () => {
    let errorMessage = '';
    let isValidForm = true;

    if (!lengthRef.current.length) {
      errorMessage = 'Please enter length';
      isValidForm = false;
    } else if (!widthRef.current.length) {
      errorMessage = 'Please enter width';
      isValidForm = false;
    } else if (!heightRef.current.length) {
      errorMessage = 'Please enter height';
      isValidForm = false;
    } else if (!weightRef.current.length) {
      errorMessage = 'Please enter weight';
      isValidForm = false;
    }

    if (isValidForm) {
      Keyboard.dismiss();
      setLoading(true);

      const params = {
        dropOffWareHouseId: dropoffWarehouse.value,
        pickUpWarehouseId: pickupWarehouse.value,
        pkgWeight: weightRef.current,
        pkgLength: lengthRef.current,
        pkgHeight: heightRef.current,
        pkgWidth: widthRef.current,
      };

      if (data.title === 'Box') {
        dispatch(
          createBoxApi({
            ...params,
            productTrackingDetailIdList: data.productTrackingDetailIdList,
            productQuantity: data.productTrackingDetailIdList.length,
          }),
        );
      } else if (data.title === 'Pallet') {
        console.log('createPalletApi params', params);
        console.log(
          'createPalletApi boxIdList',
          data.productTrackingDetailIdList,
        );
        console.log(
          'createPalletApi boxQuantity',
          data.productTrackingDetailIdList.length,
        );

        dispatch(
          createPalletApi({
            ...params,
            boxIdList: data.productTrackingDetailIdList,
            boxQuantity: data.productTrackingDetailIdList.length,
          }),
        );
      } else if (data.title === 'Container') {
        if (isExist) {
          dispatch(
            addContainerDetailApi({
              ...params,
              containerId: item.productPackagingDetailId,
              boxIdList: from ? [] : data.productTrackingDetailIdList,
              palletIdList: from ? data.productTrackingDetailIdList : [],
              quantity: data.productTrackingDetailIdList.length,
            }),
          );
        } else {
          if (from) {
            dispatch(
              createPalletToContainerApi({
                ...params,
                palletIdList: data.productTrackingDetailIdList,
                palletQuantity: data.productTrackingDetailIdList.length,
              }),
            );
          } else {
            dispatch(
              createBoxToContainerApi({
                ...params,
                boxIdList: data.productTrackingDetailIdList,
                boxQuantity: data.productTrackingDetailIdList.length,
              }),
            );
          }
        }
      }
    } else {
      showAlert(errorMessage);
    }
  };

  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  const onChangeTextLength = value => {
    lengthRef.current = value;
    setValueChanged(prev => !prev);
  };

  const onChangeTextWidth = value => {
    widthRef.current = value;
    setValueChanged(prev => !prev);
  };

  const onChangeTextHeight = value => {
    heightRef.current = value;
    setValueChanged(prev => !prev);
  };

  const onChangeTextWeight = value => {
    weightRef.current = value;
    setValueChanged(prev => !prev);
  };

  const handleValueChange = (value, index) => {
    setSelectedValue(index ? value : null);
    if (Platform.OS === 'android') {
      getDimensionValue(value);
    }
  };

  const onClosePicker = () => {
    getDimensionValue(selectedValue);
  };

  const getDimensionValue = typeId => {
    setLoading(true);
    if (typeId) {
      dispatch(getContainerTypeDimensionByIdApi({containerTypeId: typeId}));
    } else {
      lengthRef.current = '';
      widthRef.current = '';
      heightRef.current = '';
      weightRef.current = '';
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar
        isBackButton={true}
        navigationLeftButton={navigationLeftButton}
      />
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
      <ScrollView
        style={styles.boxContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingBottom: 50,
        }}>
        <View style={styles.dimensionContainer}>
          <Image source={data.image} />
          <View>
            <Text style={styles.boxDimensionText}>{data.title} Dimensions</Text>
            <Text style={styles.itemSelectedText}>
              Items Selected: {data.productTrackingDetailIdList.length}
            </Text>
          </View>
        </View>
        {data.title === 'Container' && !isExist ? (
          <View style={styles.subDDContainer}>
            <RNPickerSelect
              placeholder={{label: 'Select container type', value: null}}
              items={containerTypeList}
              onValueChange={handleValueChange}
              onClose={onClosePicker}
              itemKey={selectedValue}
              useNativeAndroidPickerStyle={false}
              Icon={ArrowDownIcon}
              style={pickerSelectStyles}
            />
          </View>
        ) : (
          <View style={{height: 30}} />
        )}
        <Dimensions
          title={'Length'}
          value={lengthRef.current}
          onChangeText={onChangeTextLength}
          keyboardType={'numeric'}
          unit={'cms'}
          enabled={selectedValue}
        />
        <Dimensions
          title={'Width'}
          value={widthRef.current}
          onChangeText={onChangeTextWidth}
          keyboardType={'numeric'}
          unit={'cms'}
          enabled={selectedValue}
        />
        <Dimensions
          title={'Height'}
          value={heightRef.current}
          onChangeText={onChangeTextHeight}
          keyboardType={'numeric'}
          unit={'cms'}
          enabled={selectedValue}
        />
        <Dimensions
          title={'Weight'}
          value={weightRef.current}
          onChangeText={onChangeTextWeight}
          keyboardType={'numeric'}
          unit={'kg'}
          enabled={selectedValue}
        />
        <SALGradientButton
          image={SAL.image.scanBarcode}
          buttonTitle={'Generate ID & QR Code'}
          buttonPressed={generateIdQrCodeButton}
        />
      </ScrollView>
      {loading && <ActivityIndicator />}
    </View>
  );
}

const pickerWidth = SAL.constant.screenWidth - 32 - 100;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: pickerWidth,
    height: 50,
    color: '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 20,
  },
  inputAndroid: {
    width: pickerWidth,
    height: 50,
    color: '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 20,
    paddingVertical: 5,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});

export default BoxDimensionScreen;
