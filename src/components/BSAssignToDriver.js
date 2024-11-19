import React, {useMemo, useRef, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import SAL from '../SAL';
import ActivityIndicator from './ActivityIndicator';
import {showAlert} from '../utils/Utils';

import {
  assignToDriverApi,
  clearAssignDriver,
  clearDriverList,
  getAllDriverListApi,
} from '../api/slice/warehouseSlice/warehouseApiSlice';
import RNPickerSelect from 'react-native-picker-select';
import {pickerSelectStyles} from '../screens/bottomtab/home/HomeStyle';
import ArrowDownIcon from './ArrowDownIcon';

const BSAssignToDriver = props => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected driver's data (name, etc.)

  const [isDCSelected, setIsDCSelected] = useState(true);
  const [driverInfo, setDriverInfo] = useState(null);
  const [driverList, setDriverList] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const driverListData = useSelector(state => state.warehouse.driverList);

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const assignDriverData = useSelector(state => state.warehouse.assignDriver);
  const warehouseApiError = useSelector(state => state.warehouse.error);

  // const handleValueChange = (value, index) => {
  //   setSelectedValue(value); // Update selected value (driver ID)
  //   setSelectedItem(driverList[index]); // Update selected item based on index

  //   console.log('Selected Driver ID:', value); // Log the selected value (driver ID)
  //   console.log('Selected Driver Details:', driverList[index]); // Log the selected driver object
  // };

  // useEffect(() => {
  //   console.log('selectedItem ', selectedItem);
  // }, [selectedItem]);

  useEffect(() => {
    return () => dispatch(clearAssignDriver());
  }, []);

  useEffect(() => {
    if (assignDriverData) {
      console.log('assignDriverData: ', assignDriverData);
      if (assignDriverData.code === SAL.codeEnum.code200) {
        props.success(assignDriverData.data);
      } else {
        showAlert(assignDriverData.message);
      }
      setLoading(false);
    }
  }, [assignDriverData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  useEffect(() => {
    console.log('driverListData: ', driverListData);
    if (driverListData) {
      setLoading(false);
      if (driverListData.code === SAL.codeEnum.code200) {
        setDriverList(
          driverListData.data.map(driver => ({
            label: driver.name,
            value: driver.id.toString(), // Assuming IDs need to be strings
          })),
        );
      } else {
        showAlert(driverListData.message);
      }
    }
  }, [driverListData]);

  useEffect(() => {
    console.log('driverList', driverList);
  }, [driverList]);

  useEffect(() => {
    dispatch(
      getAllDriverListApi({
        pickUpDate: props.pickUpDate,
        pickUpTime: props.pickUpTime,
        dropoffWarehouseId: dropoffWarehouse.value,
        pickupWarehouseId: pickupWarehouse.value,
      }),
    );

    return () => dispatch(clearDriverList());
  }, []);

  const DateContainer = subProps => {
    return (
      <View style={styles.commonContainer}>
        <Text style={styles.commonText}>{subProps.title}</Text>
        <View style={styles.separator} />
        <Text style={styles.dropdownText}>
          {selectedDate === '' ? subProps.placeholder : selectedDate}
        </Text>
        <Image
          style={{position: 'absolute', right: 20}}
          source={SAL.image.calenderIcon}></Image>
        <Pressable
          style={styles.button}
          onPress={() => {
            setMode('date');
            setOpen(true);
          }}></Pressable>
      </View>
    );
  };

  const selectedDriver = item => {
    console.log('sel: ', item);
    setDriverInfo(item);
  };

  const TimeDriverContainer = ({title, placeholder}) => {
    return (
      <View style={styles.commonContainer}>
        <Text style={styles.commonText}>{title}</Text>
        <View style={styles.separator} />
        {title === 'Time' ? (
          <Text style={styles.dropdownText}>
            {selectedTime === '' ? placeholder : selectedTime}
          </Text>
        ) : (
          <Text style={styles.dropdownText}>
            {driverInfo === null ? placeholder : driverInfo.name}
          </Text>
        )}

        <Image
          style={{position: 'absolute', right: 20}}
          source={SAL.image.downArrow}></Image>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (title === 'Time') {
              setMode('time');
              setOpen(true);
            } else {
              let errorMsg = '';
              if (!selectedDate.length) {
                errorMsg = 'Please select pickup date';
              } else if (!selectedTime.length) {
                errorMsg = 'Please select pickup time';
              }
              if (errorMsg.length) {
                showAlert(errorMsg);
                return;
              }
              navigation.navigate('BSChooseDriver', {
                selectedDriver: selectedDriver,
                pickUpDate: selectedDate,
                pickUpTime: selectedTime,
              });
            }
          }}></Pressable>
      </View>
    );
  };

  const AssignToContainer = subProps => {
    return (
      <View style={styles.commonContainer}>
        <Text style={styles.commonText}>{subProps.title}</Text>
        <Pressable
          style={styles.checkboxButton}
          onPress={() => setIsDCSelected(true)}>
          <Image
            source={
              isDCSelected
                ? SAL.image.checkboxSelected
                : SAL.image.checkboxUnselected
            }></Image>
          <Text style={styles.driverCompanyText}>Driver</Text>
        </Pressable>
        <Pressable
          style={styles.checkboxButton}
          onPress={() => setIsDCSelected(false)}>
          <Image
            source={
              isDCSelected
                ? SAL.image.checkboxUnselected
                : SAL.image.checkboxSelected
            }></Image>
          <Text style={styles.driverCompanyText}>Company</Text>
        </Pressable>
      </View>
    );
  };

  const assignButton = () => {
    let errorMsg = '';
    if (!selectedDate.length) {
      errorMsg = 'Please select pickup date';
    } else if (!selectedTime.length) {
      errorMsg = 'Please select pickup time';
    } else if (!driverInfo) {
      errorMsg = 'Please select driver';
    }

    if (errorMsg.length) {
      showAlert(errorMsg);
      return;
    }

    // setLoading(true);

    const commonParams = {
      assignedDriverId: driverInfo,
      assignedCompanyId: 0,
      pickUpDate: selectedDate,
      pickUpTime: selectedTime,
      dropOffWareHouseId: dropoffWarehouse.value,
      pickUpWarehouseId: pickupWarehouse.value,
      index: props.selectedIndex,
    };

    const boxParams = {
      ...commonParams,
      boxIds: props.selectedIds,
    };

    const palletParams = {
      ...commonParams,
      palletIds: props.selectedIds,
    };

    const containerParams = {
      ...commonParams,
      containerIds: props.selectedIds,
    };

    console.log(containerParams);

    dispatch(
      assignToDriverApi(
        props.selectedIndex === 1
          ? boxParams
          : props.selectedIndex === 2
          ? palletParams
          : containerParams,
      ),
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
          style={styles.orderImage}
          source={SAL.image.assignToDriver}></Image>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.orderText}>Assign to Driver</Text>
          <Text style={styles.quantityText}>
            Items Selected: {props.selectedIds.length}
          </Text>
          <DateContainer title={'Date'} placeholder={'Select Pickup Date'} />
          <TimeDriverContainer
            title={'Time'}
            placeholder={'Select Pickup Time'}
          />
          <AssignToContainer title={'Assign to'} />
          {/* <TimeDriverContainer title={'Driver'} placeholder={'Select Driver'} /> */}
          {isDCSelected == false && (
            <View style={styles.commonContainer}>
              <Text style={styles.commonText}>Company</Text>
              <View style={styles.separator} />

              <RNPickerSelect
                placeholder={{label: 'Select Company', value: null}}
                items={driverList == null ? [] : driverList}
                onValueChange={selectedDriver}
                useNativeAndroidPickerStyle={false}
                Icon={ArrowDownIcon}
                style={pickerSelectStyles}
              />
              {/* <Pressable
              style={styles.button}
              onPress={() => {
                navigation.push('BSChooseDriver', {
                  selectedDriver: selectedDriver,
                  pickUpDate: selectedDate,
                  pickUpTime: selectedTime,
                });
              }}></Pressable> */}
            </View>
          )}
          <View style={styles.commonContainer}>
            <Text style={styles.commonText}>Driver</Text>
            <View style={styles.separator} />

            <RNPickerSelect
              placeholder={{label: 'Select Driver', value: null}}
              items={driverList == null ? [] : driverList}
              onValueChange={selectedDriver}
              useNativeAndroidPickerStyle={false}
              Icon={ArrowDownIcon}
              style={pickerSelectStyles}
            />
            {/* <Pressable
              style={styles.button}
              onPress={() => {
                navigation.push('BSChooseDriver', {
                  selectedDriver: selectedDriver,
                  pickUpDate: selectedDate,
                  pickUpTime: selectedTime,
                });
              }}></Pressable> */}
          </View>

          <Pressable onPress={assignButton}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#6F137A', '#A881AC']}
              style={styles.assignButton}>
              <Text style={styles.assignText}>Assign</Text>
            </LinearGradient>
          </Pressable>
        </LinearGradient>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        // minimumDate={date}
        mode={mode}
        onConfirm={date => {
          setOpen(false);
          if (mode === 'date') {
            setSelectedDate(moment(date).format('YYYY-MM-DD'));
          } else {
            setSelectedTime(moment(date).format('HH:mm'));
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
    height: 650,
    alignItems: 'center',
  },
  orderImage: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
  },
  gradientContainer: {
    width: '100%',
    // height: 470,
    flex: 1,
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
  assignButton: {
    width: 150,
    height: 45,
    borderRadius: 22,
    marginTop: 11,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignText: {
    color: SAL.colors.white,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
  },
  button: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  checkboxButton: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    marginLeft: 30,
  },
  driverCompanyText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginLeft: 15,
  },
});

export default BSAssignToDriver;
