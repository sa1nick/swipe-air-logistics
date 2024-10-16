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
  const [productList, setProductList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [itemCount, setItemCount] = useState(0);

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

  const scannedListData = useSelector(
    state => state.warehouse.scannedProductByPickupDropoffWarehouse,
  );

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getData(StorageKey.userData);
      setMovedBy(userData.firstName + ' ' + userData.lastName);
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (validate) {
      setLoading(true);
      pageNumber.current = 0;
      getWarehouseMovedData();
    }
  }, [validate]);

  useEffect(() => {
    if (scannedListData) {
      if (scannedListData.code === SAL.codeEnum.code200) {
        const updatedArray = scannedListData.data.map(item => ({
          ...item,
          isSelected: false,
        }));
        if (productList) {
          setProductList(prevArray => [...prevArray, ...updatedArray]);
        } else {
          setItemCount(0);
          setProductList(updatedArray);
        }
      } else {
        showAlert(scannedListData.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [scannedListData]);

  const getWarehouseMovedData = () => {
    if (pickupWarehouse && dropoffWarehouse && isFocused) {
      pageNumber.current = pageNumber.current + 1;
      setLoading(true);
      dispatch(
        getAllScannedProductWarehouseApi({
          warehouseId: dropoffWarehouse.value,
          pickupWarehouseId: pickupWarehouse.value,
          status: 3,
          pageNumber: pageNumber.current,
          pageSize: pageSize,
        }),
      );
    }
  };

  const onPressOrderCell = index => {
    const updatedArray = productList.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));

    const numberOfSelectedItems = updatedArray.reduce((count, item) => {
      return count + (item.isSelected ? 1 : 0);
    }, 0);

    setItemCount(numberOfSelectedItems);
    setProductList(updatedArray);
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
    setProductList(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getWarehouseMovedData();
  };

  const onPressCreateBoxButton = () => {
    if (itemCount) {
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
    } else {
      showAlert('Please select product');
    }
  };

  const boxListButton = () => {
    if (pickupWarehouse && dropoffWarehouse) {
      if (pickupWarehouse === dropoffWarehouse) {
        showAlert("Select From and Select To can't be same");
      } else {
        props.navigation.navigate('BoxListScreen');
      }
    } else {
      showAlert('Please select Select From and Select To warehouse');
    }
  };

  return (
    <View style={styles.container}>
      {itemCount ? (
        <View style={styles.countContainer}>
          <ImageBackground style={styles.checkbox} source={SAL.image.checkBox}>
            <Image source={SAL.image.checkboxTick}></Image>
          </ImageBackground>
          <Text style={styles.selectedText}>
            {itemCount} {itemCount > 1 ? 'Products' : 'Product'} selected
          </Text>
        </View>
      ) : null}
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

          if (productList?.length === pageNumber.current * pageSize) {
            getWarehouseMovedData();
          }
        }}
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
