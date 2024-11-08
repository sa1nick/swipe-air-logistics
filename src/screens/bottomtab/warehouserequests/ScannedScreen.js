import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  RefreshControl,
  ImageBackground,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import {StorageKey} from '../../../utils/Enum';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';
import {showAlert, getData, downloadFile} from '../../../utils/Utils';
import SALGradientButton from '../../../components/SALGradientButton';

import {getAllScannedProductWarehouseApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function ScannedScreen(props) {
  const [loading, setLoading] = useState(false);
  const [movedBy, setMovedBy] = useState('');
  const [productList, setProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [error, setError] = useState(null);

  const isFocused = useIsFocused();

  const pageNumber = useRef(0);
  const loadingRef = useRef(false);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );
  const validate = useSelector(state => state.storeDataGlobally.validate);
  const scannedListData = useSelector(
    state => state.warehouse.scannedProductByPickupDropoffWarehouse,
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getData(StorageKey.userData);
        if (userData?.firstName && userData?.lastName) {
          setMovedBy(`${userData.firstName} ${userData.lastName}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      }
    };

    getUserData();
  }, []);

  const refreshData = async () => {
    if (loadingRef.current) return;
    // setProductList([]);
    setItemCount(0);
    pageNumber.current = 0;
    await getWarehouseMovedData();
  };

  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (validate) {
      refreshData();
    }
  }, [validate]);

  const getWarehouseMovedData = async () => {
    if (
      !pickupWarehouse ||
      !dropoffWarehouse ||
      !isFocused ||
      loadingRef.current
    ) {
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      const payload = {
        warehouseId: dropoffWarehouse.value,
        pickupWarehouseId: pickupWarehouse.value,
        status: 3,
        pageNumber: pageNumber.current + 1,
        pageSize: pageSize,
      };

      const response = await dispatch(
        getAllScannedProductWarehouseApi({
          warehouseId: dropoffWarehouse.value,
          pickupWarehouseId: pickupWarehouse.value,
          status: 3,
          pageNumber: pageNumber.current + 1,
          pageSize: pageSize,
        }),
      ).unwrap();

      if (response?.code === SAL.codeEnum.code200) {
        const updatedArray = (response.data || []).map(item => ({
          ...item,
          isSelected: false,
        }));

        console.log('scanned payload');

        const existingIds = new Set(
          productList.map(item => item.qrCodeFileNamePath),
        );

        const newItems = updatedArray.filter(
          item => !existingIds.has(item.qrCodeFileNamePath),
        );

        if (newItems.length > 0) {
          pageNumber.current += 1;
          setProductList(prevArray => [...prevArray, ...newItems]);
        }
      } else {
        setError(response?.message || 'Failed to load data');
        showAlert(response?.message);
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to load data. Please try again.');
      showAlert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const onPressOrderCell = index => {
    setProductList(prevList => {
      const updatedArray = prevList.map((item, i) => ({
        ...item,
        isSelected: i === index ? !item.isSelected : item.isSelected,
      }));

      const numberOfSelectedItems = updatedArray.reduce(
        (count, item) => count + (item.isSelected ? 1 : 0),
        0,
      );

      setItemCount(numberOfSelectedItems);
      return updatedArray;
    });
  };

  const downloadPdf = async item => {
    try {
      setLoading(true);
      await downloadFile(item.qrCodeFileNamePath, item.qrCodeFilePath);
    } catch (error) {
      console.error('Download error:', error);
      showAlert('Failed to download PDF');
    } finally {
      setLoading(false);
    }
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
      {!loading && (
        <Text style={styles.noDataFoundText}>{error || 'No data found'}</Text>
      )}
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const onPressCreateBoxButton = () => {
    if (!itemCount) {
      showAlert('Please select product');
      return;
    }

    const selectedItemsIds = productList
      .filter(item => item.isSelected)
      .map(item => item.productTrackingDetailId);

    const params = {
      productTrackingDetailIdList: selectedItemsIds,
      title: 'Box',
      image: SAL.image.boxDimension,
    };

    props.navigation.navigate('BoxDimensionScreen', {
      data: params,
    });
  };

  const boxListButton = () => {
    if (!pickupWarehouse || !dropoffWarehouse) {
      showAlert('Please select Select From and Select To warehouse');
      return;
    }

    if (pickupWarehouse === dropoffWarehouse) {
      showAlert("Select From and Select To can't be same");
      return;
    }

    props.navigation.navigate('BoxListScreen');
  };

  return (
    <View style={styles.container}>
      {itemCount > 0 && (
        <View style={styles.countContainer}>
          <ImageBackground style={styles.checkbox} source={SAL.image.checkBox}>
            <Image source={SAL.image.checkboxTick} />
          </ImageBackground>
          <Text style={styles.selectedText}>
            {itemCount} {itemCount > 1 ? 'Products' : 'Product'} selected
          </Text>
        </View>
      )}
      <FlatList
        keyExtractor={(item, index) => `${item.qrCodeFileNamePath}-${index}`}
        extraData={[loading, itemCount]}
        data={productList}
        renderItem={renderItem}
        // contentContainerStyle={{gap: 20}}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={() => <View style={{height: 25}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (
            !loading &&
            productList.length === pageNumber.current * pageSize
          ) {
            getWarehouseMovedData();
          }
        }}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.createBoxButton}
          onPress={onPressCreateBoxButton}>
          <Image source={SAL.image.createBox} />
          <Text style={styles.createBoxText}>Create Box</Text>
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

// Styles remain unchanged
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
  countContainer: {
    height: 40,
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'center',
  },
  checkbox: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 5,
  },
});

export default ScannedScreen;
