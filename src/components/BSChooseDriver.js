import React, {useMemo, useRef, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import SAL from '../SAL';
import ActivityIndicator from './ActivityIndicator';
import {showAlert} from '../utils/Utils';

import {
  getAllDriverListApi,
  clearDriverList,
} from '../api/slice/warehouseSlice/warehouseApiSlice';

const BSChooseDriver = props => {
  const [loading, setLoading] = useState(true);
  const [driverList, setDriverList] = useState(null);

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const driverListData = useSelector(state => state.warehouse.driverList);
  const warehouseApiError = useSelector(state => state.warehouse.error);

  useEffect(() => {
    dispatch(
      getAllDriverListApi({
        pickUpDate: props.route.params.pickUpDate,
        pickUpTime: props.route.params.pickUpTime,
        dropoffWarehouseId: dropoffWarehouse.value,
        pickupWarehouseId: pickupWarehouse.value,
      }),
    );

    return () => dispatch(clearDriverList());
  }, []);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  useEffect(() => {
    if (driverListData) {
      console.log('driverListData: ', driverListData);
      setLoading(false);
      if (driverListData.code === SAL.codeEnum.code200) {
        setDriverList(driverListData.data);
      } else {
        showAlert(driverListData.message);
      }
    }
  }, [driverListData]);

  const renderDriverList = ({item, index}) => {
    return (
      <Pressable
        style={styles.driverCell}
        onPress={() => {
          props.route.params.selectedDriver(item);
          close();
        }}>
        <Text style={styles.nameText}>{item.name}</Text>
      </Pressable>
    );
  };

  const close = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.blackContainer}
      />
      <View style={styles.bottomContainer}>
        <Pressable onPress={close}>
          <Image source={SAL.image.closeModal}></Image>
        </Pressable>
        <Image
          style={styles.orderImage}
          source={SAL.image.chooseDriver}></Image>
        <LinearGradient
          colors={['#FFB785', '#FFFFFF']}
          style={styles.gradientContainer}>
          <Text style={styles.orderText}>Choose Driver</Text>
          <FlatList
            data={driverList}
            renderItem={renderDriverList}
            showsVerticalScrollIndicator={false}
          />
        </LinearGradient>
      </View>
      {loading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  blackContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bottomContainer: {
    width: '100%',
    height: 600,
    alignItems: 'center',
  },
  orderImage: {
    width: 64,
    height: 64,
    marginTop: 80,
    zIndex: 1,
  },
  gradientContainer: {
    width: SAL.constant.screenWidth - 40,
    height: 386,
    borderRadius: 30,
    marginTop: -32,
    alignItems: 'center',
  },
  orderText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 45,
    marginBottom: 20,
  },
  driverCell: {
    width: SAL.constant.screenWidth - 80,
    height: 50,
    backgroundColor: SAL.colors.white,
    borderRadius: 12,
    marginBottom: 11,
    borderWidth: 0.5,
    borderColor: '#B5B5B5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    marginLeft: 20,
  },
});

export default BSChooseDriver;
