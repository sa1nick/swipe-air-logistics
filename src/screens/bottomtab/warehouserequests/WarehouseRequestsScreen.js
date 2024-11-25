import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Platform, StyleSheet, useColorScheme, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Camera} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import ArrowDownIcon from '../../../components/ArrowDownIcon';
import NavigationBar from '../../../components/NavigationBar';
import {navigationLeftButton, showAlert} from '../../../utils/Utils';
import AssignToDriverLoosePackingScreen from './AssignToDriverLoosePackingScreen';
import PendingScreen from './PendingScreen';
import ScannedScreen from './ScannedScreen';
import warehouseRequestsStyle from './WarehouseRequestsStyle';

import {
  dropoffWarehouse,
  pickupWarehouse,
  validate,
} from '../../../api/slice/storeDataGloballySlice/storeDataGloballySlice';
import useCustomTheme from '../../../hook/useCustomTheme';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

const TopTabBar = createMaterialTopTabNavigator();

const TopTabStack = ({screenProps}) => {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  return (
    <TopTabBar.Navigator
      screenOptions={({route}) => ({
        tabBarPressColor:
          // isDark ? 'rgba(240, 195, 244, 0.2)' : '',
          'rgba(240, 195, 244, 0.2)',
        lazy: true,
        tabBarScrollEnabled: true,
        swipeEnabled: false,
        tabBarActiveTintColor: isDark
          ? SAL.darkModeColors.purpleF0C3F4
          : '#7A2783',
        tabBarInactiveTintColor: isDark
          ? SAL.darkModeColors.tabInActive
          : '#8A8A8A',
        tabBarLabelStyle: {
          fontSize: scaleFactor(14),
          fontFamily: 'Rubik-Medium',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: isDark
            ? SAL.darkModeColors.purpleF0C3F4
            : '#7A2783',
          borderBottomWidth: 2,
          width: '18%',
          marginLeft: '5.5%',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 50,
        },
        tabBarItemStyle: {
          width: SAL.constant.screenWidth / 3,
        },
      })}>
      <TopTabBar.Screen name="Pending" component={PendingScreen} />
      <TopTabBar.Screen name="Scanned" component={ScannedScreen} />
      <TopTabBar.Screen
        name="Assigned to Driver"
        component={AssignToDriverLoosePackingScreen}
      />
    </TopTabBar.Navigator>
  );
};

function WarehouseRequestsScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = warehouseRequestsStyle(isDark);
  const [selectFrom, setSelectFrom] = useState(null);
  const [selectTo, setSelectTo] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1);
  const [pickerWarehouseList, setPickerWarehouseList] = useState([]);
  const [productList, setProductList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const pickupWarehoueName = useRef('');
  const dropOffWarehoueName = useRef('');

  const dispatch = useDispatch();

  const warehouseListData = useSelector(state => state.warehouse.warehouseList);

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: '100%',
      height: 50,
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
      paddingLeft: 20,
    },
    inputAndroid: {
      width: '100%',
      height: 50,
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
      fontSize: scaleFactor(14),
      fontFamily: 'Rubik-Medium',
      paddingLeft: 20,
      paddingVertical: 5,
    },
    chevronDown: {
      display: 'none',
    },
    chevronUp: {
      display: 'none',
    },
    placeholder: {
      color: isDark ? SAL.darkModeColors.tabInActive : '#9A9A9A',
    },
  });

  useEffect(() => {
    if (warehouseListData) {
      if (warehouseListData.code === SAL.codeEnum.code200) {
        const arrayWarehouseList = warehouseListData.data.map(item => {
          return {
            label: item.name,
            value: item.id.toString(),
          };
        });

        setPickerWarehouseList(arrayWarehouseList);
      }
    }
  }, [warehouseListData]);

  const handleSelectFromValueChange = (value, index) => {
    const valueChange = index ? value : null;
    setSelectFrom(valueChange);
    dispatch(pickupWarehouse(index ? pickerWarehouseList[index - 1] : null));
    dispatch(validate(false));

    if (Platform.OS === 'android') {
      setTimeout(() => {
        validateFromTo(valueChange, selectTo);
      }, 500);
    }
  };

  const handleSelectToValueChange = (value, index) => {
    const valueChange = index ? value : null;
    setSelectTo(valueChange);
    dispatch(dropoffWarehouse(index ? pickerWarehouseList[index - 1] : null));
    dispatch(validate(false));

    if (Platform.OS === 'android') {
      setTimeout(() => {
        validateFromTo(selectFrom, valueChange);
      }, 500);
    }
  };

  const onClosePicker = () => {
    validateFromTo(selectFrom, selectTo);
  };

  const validateFromTo = (fromValue, toValue) => {
    if (fromValue && toValue) {
      if (fromValue === toValue) {
        showAlert("Select From and Select To can't be same");
      } else {
        dispatch(validate(true));
        // getWarehouseMovedData(selectedTab);
      }
    }
  };

  const onPressScanCreateBoxButton = () => {
    if (selectedTab === 1) {
      if (hasPermission) {
        props.navigation.navigate('ScanScreen');
      } else {
        if (Camera.getCameraPermissionStatus() === 'denied') {
          showAlert(
            'Please grant permission in your device settings under "Privacy & Security" > "Camera',
          );
        } else {
          requestPermission();
        }
      }
    } else {
      if (itemCount) {
        const selectedItemsIds = productList
          .filter(item => item.isSelected)
          .map(item => item.productTrackingDetailId);
        const params = {
          dropOffWareHouseId: selectTo,
          pickUpWarehouseId: selectFrom,
          pickupWarehoueName: pickupWarehoueName.current,
          dropOffWarehoueName: dropOffWarehoueName.current,
          productTrackingDetailIdList: selectedItemsIds,
          title: 'Box',
          image: SAL.image.boxDimension,
        };
        props.navigation.navigate('BoxDimensionScreen', {
          data: params,
        });
      } else {
        showAlert('Please select product');
      }
    }
  };

  const boxListButton = () => {
    if (selectFrom && selectTo) {
      if (selectFrom === selectTo) {
        showAlert("Select From and Select To can't be same");
      } else {
        const params = {
          dropOffWareHouseId: selectTo,
          pickUpWarehouseId: selectFrom,
          pickupWarehoueName: pickupWarehoueName.current,
          dropOffWarehoueName: dropOffWarehoueName.current,
        };
        props.navigation.navigate('BoxListScreen', {
          data: params,
        });
      }
    } else {
      showAlert('Please select Select From and Select To warehouse');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topGradientContainer}>
        <Image
          style={{width: SAL.constant.screenWidth}}
          source={SAL.image.gradientBg}
        />
      </View>
      <NavigationBar navigationLeftButton={navigationLeftButton} />
      <View style={styles.dropdownContainer}>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select From', value: null}}
            items={pickerWarehouseList}
            onClose={onClosePicker}
            onValueChange={handleSelectFromValueChange}
            // value={selectFrom}
            useNativeAndroidPickerStyle={false}
            Icon={ArrowDownIcon}
            style={pickerSelectStyles}
            // darkTheme={isDark}
          />
        </View>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select To', value: null}}
            items={pickerWarehouseList}
            onClose={onClosePicker}
            onValueChange={handleSelectToValueChange}
            // value={selectTo}
            useNativeAndroidPickerStyle={false}
            Icon={ArrowDownIcon}
            style={pickerSelectStyles}
            // darkTheme={isDark}
          />
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <TopTabStack />
      </View>
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default WarehouseRequestsScreen;
