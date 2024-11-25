import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import SALGradientButton from '../../../components/SALGradientButton';
import {StorageKey} from '../../../utils/Enum';
import {downloadFile, getData, showAlert} from '../../../utils/Utils';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';

import {getAllScannedProductWarehouseApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import useCustomTheme from '../../../hook/useCustomTheme';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

function ScannedScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
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

  // const refreshData = async () => {
  //   if (loadingRef.current) return;
  //   // setProductList([]);
  //   setItemCount(0);
  //   pageNumber.current = 0;
  //   await getWarehouseMovedData();
  // };

  const refreshData = async () => {
    console.log('Refresh Data Called');
    console.log('Current Loading State:', loadingRef.current);

    if (loadingRef.current) return;

    // setRefreshing(true);
    pageNumber.current = 0; // Always reset to first page
    await getWarehouseMovedData();

    setRefreshing(false);
  };
  useEffect(() => {
    if (isFocused && pickupWarehouse && dropoffWarehouse) {
      setItemCount(0);
      refreshData();
    }
  }, [pickupWarehouse, dropoffWarehouse, isFocused]);

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

      // Always reset to first page if it's the initial load
      const currentPage = pageNumber.current === 0 ? 1 : pageNumber.current + 1;

      const payload = {
        warehouseId: dropoffWarehouse.value,
        pickupWarehouseId: pickupWarehouse.value,
        status: 3,
        pageNumber: currentPage,
        pageSize: pageSize,
      };

      console.log('Scanned payload:', payload);

      // Reset list only for the first page
      if (currentPage === 1) {
        setProductList([]);
      }

      const response = await dispatch(
        getAllScannedProductWarehouseApi(payload),
      ).unwrap();

      if (response?.code === SAL.codeEnum.code200) {
        const updatedArray = (response.data || []).map(item => ({
          ...item,
          isSelected: false,
        }));

        // If data is received, update page number and list
        if (updatedArray.length > 0) {
          pageNumber.current = currentPage;
          setProductList(prevArray =>
            currentPage === 1 ? updatedArray : [...prevArray, ...updatedArray],
          );
        } else if (currentPage === 1) {
          // If no data on first page, set empty list
          setProductList([]);
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

  // Styles remain unchanged
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    },
    emptyListContainer: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noDataFoundText: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: scaleFactor(16),
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
      borderColor: isDark ? SAL.darkModeColors.orangeFFC8A3 : '#FF6D09',
      borderWidth: 0.5,
      borderRadius: 22,
      alignSelf: 'center',
      marginTop: 22,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    createBoxText: {
      color: isDark ? SAL.darkModeColors.orangeFFC8A3 : '#FF6D09',
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
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
      marginLeft: 5,
    },
  });

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
          console.log('End Reached', {
            distanceFromEnd,
            loading,
            listLength: productList.length,
            expectedNextPageItems: pageNumber.current * pageSize,
          });

          if (distanceFromEnd < 0) return;
          if (!loading && productList.length >= pageNumber.current * pageSize) {
            getWarehouseMovedData();
          }
        }}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.createBoxButton}
          onPress={onPressCreateBoxButton}>
          <Image
            source={SAL.image.createBox}
            style={{
              tintColor: isDark ? SAL.darkModeColors.orangeFFC8A3 : '#FF6D09',
            }}
          />
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

export default ScannedScreen;
