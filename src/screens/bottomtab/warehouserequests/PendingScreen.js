import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Platform,
  RefreshControl,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Camera, useCameraPermission} from 'react-native-vision-camera';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import {StorageKey} from '../../../utils/Enum';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';
import {showAlert, getData, downloadFile} from '../../../utils/Utils';
import SALGradientButton from '../../../components/SALGradientButton';

import {getAllPendingProductWarehouseApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function PendingScreen(props) {
  const [loading, setLoading] = useState(false);
  const [movedBy, setMovedBy] = useState('');
  const [productList, setProductList] = useState([]); // Initialize as empty array
  const [refreshing, setRefreshing] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();

  const isFocused = useIsFocused();

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );
  const validate = useSelector(state => state.storeDataGlobally.validate);

  const pendingListData = useSelector(
    state => state.warehouse.pendingProductByPickupDropoffWarehouse,
  );

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getData(StorageKey.userData);
      if (userData) {
        setMovedBy(`${userData.firstName} ${userData.lastName}`);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (validate) {
      setLoading(true);
      setProductList([]); // Reset productList to an empty array
      pageNumber.current = 0;
      getWarehouseMovedData();
    }
  }, [validate]);

  useEffect(() => {
    if (pendingListData) {
      console.log(pendingListData);
      if (pendingListData.code === SAL.codeEnum.code200) {
        setProductList(prevArray => [
          ...prevArray,
          ...(pendingListData.data || []), // Safely access data
        ]);
      } else {
        showAlert(pendingListData.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [pendingListData]);

  const getWarehouseMovedData = () => {
    if (pickupWarehouse && dropoffWarehouse && isFocused) {
      pageNumber.current += 1;
      setLoading(true);
      dispatch(
        getAllPendingProductWarehouseApi({
          warehouseId: dropoffWarehouse.value,
          pickupWarehouseId: pickupWarehouse.value,
          status: 0,
          pageNumber: pageNumber.current,
          pageSize: pageSize,
        }),
      );
    }
  };

  const onPressOrderCell = index => {
    console.log('onPressOrderCell');
  };

  const downloadPdf = async item => {
    setLoading(true);
    await downloadFile(item.qrCodeFileNamePath, item.qrCodeFilePath);
    setLoading(false);
  };

  const renderItem = ({item, index}) => {
    const categoryArray = item.categoryHierarchicalName?.split('/');
    return (
      <WarehouseOrderCell
        item={item}
        index={index}
        categoryArray={categoryArray}
        isPdf={true}
        isScanned={true}
        downloadPdf={downloadPdf}
        onPressOrderCell={onPressOrderCell}
        movedBy={movedBy}
      />
    );
  };

  const renderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {!loading ? (
        <Text style={styles.noDataFoundText}>No data found</Text>
      ) : null}
    </View>
  );

  const onRefresh = () => {
    setProductList([]); // Reset productList to an empty array
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getWarehouseMovedData();
  };

  const onPressScanButton = () => {
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
  };

  const boxListButton = () => {
    if (pickupWarehouse && dropoffWarehouse) {
      if (pickupWarehouse === dropoffWarehouse) {
        showAlert("Select From and Select To can't be the same");
      } else {
        props.navigation.navigate('BoxListScreen');
      }
    } else {
      showAlert('Please select Select From and Select To warehouse');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        extraData={loading}
        data={productList}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={() => <View style={{height: 25}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (productList.length === pageNumber.current * pageSize) {
            getWarehouseMovedData();
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.createBoxButton} onPress={onPressScanButton}>
          <Image source={SAL.image.createBox} />
          <Text style={styles.createBoxText}>Scan</Text>
        </Pressable>
        <SALGradientButton
          buttonTitle={'Box List'}
          buttonPressed={boxListButton}
        />
      </View>
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SAL.colors.white,
  },
  emptyListContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createBoxButton: {
    width: 160,
    height: 44,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignSelf: 'center',
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  createBoxText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default PendingScreen;
