import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  RefreshControl,
  FlatList,
  Modal,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';

import styles from './HomeStyle';
import {pickerSelectStyles} from './HomeStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import ActivityIndicator from '../../../components/ActivityIndicator';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';
import BSPickupDropoffOrder from '../../../components/BSPickupDropoffOrder';
import BSMoveToWarehouseSuccess from '../../../components/BSMoveToWarehouseSuccess';
import SALGradientButton from '../../../components/SALGradientButton';
import {showAlert, removeValueAsyncStorage} from '../../../utils/Utils';
import ArrowDownIcon from '../../../components/ArrowDownIcon';
import {StorageKey} from '../../../utils/Enum';
import RNRestart from 'react-native-restart';
import {getData} from '../../../utils/Utils';

import {
  getAllWarehouseApi,
  getAllProductByWarehouseIdApi,
  moveToWarehouseApi,
} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {useFocusEffect} from '@react-navigation/native';
import SALInputField from '../../../components/SALInputField';

function HomeScreen(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [pickupWarehoue, setPickupWarehoue] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showBS, setShowBS] = useState(false);
  const [showMovedWarehouseBS, setShowMovedWarehouseBS] = useState(false);
  const [warehouseProductList, setWarehouseProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pickerWarehouseList, setPickerWarehouseList] = useState([]);
  const [dropOffList, setDropOffList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  // Add these new state variables at the top of your component
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const warehouseListData = useSelector(state => state.warehouse.warehouseList);
  const productList = useSelector(state => state.warehouse.productList);
  const moveToWarehouseResponse = useSelector(
    state => state.warehouse.moveToWarehouse,
  );
  const warehouseApiError = useSelector(state => state.warehouse.error);

  // This effect will run whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        // Reset totalCount before fetching
        setTotalCount(productList?.totalCount);
        dispatch(getAllWarehouseApi({}));
        fetchProductList(pageNumber.current);
      }, 500);
      return () => {
        // Optionally reset state here if needed
      };
    }, [dispatch]),
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllWarehouseApi({}));
      fetchProductList(pageNumber.current);
    }, 500);
  }, []);

  useEffect(() => {
    // console.log('warehouseListData: ', warehouseListData);
    if (warehouseListData) {
      if (warehouseListData.code === SAL.codeEnum.code200) {
        const arrayWarehouseList = warehouseListData.data.map(item => {
          return {
            label: item.name,
            value: item.id.toString(),
          };
        });
        console.log('arrayWarehouseList', arrayWarehouseList);

        if (arrayWarehouseList == null) {
          setTimeout(() => {
            setRefreshing(false);
            setPickerWarehouseList(arrayWarehouseList);
          }, 1000);
        } else {
          setPickerWarehouseList(arrayWarehouseList);
          // setPickerWarehouseList([]); // Reset if there's an error
        }
      }
    }
  }, [warehouseListData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      setInitialLoad(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  useEffect(() => {
    console.log('productList: ', productList);
    if (productList) {
      setLoading(false);
      setInitialLoad(false); // Add this to ensure we're not in initial load state

      const updatedArray = productList.data.map(item => ({
        ...item,
        isSelected: false,
      }));

      if (pageNumber.current > 1) {
        setWarehouseProductList(prevArray => [...prevArray, ...updatedArray]);
      } else {
        setWarehouseProductList(updatedArray); // This will now set an empty array when there's no data
      }
      setTotalCount(productList.totalCount);
    }
  }, [productList]);

  useEffect(() => {
    if (moveToWarehouseResponse) {
      console.log('moveToWarehouseResponse: ', moveToWarehouseResponse);
      setLoading(false);
      if (moveToWarehouseResponse.code === SAL.codeEnum.code200) {
        setShowMovedWarehouseBS(true);
      } else {
        showAlert(moveToWarehouseResponse.message);
      }
    }
  }, [moveToWarehouseResponse]);

  useEffect(() => {
    if (warehouseProductList) {
      if (searchTerm) {
        const filtered = warehouseProductList.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredProductList(filtered);
        setFilteredCount(filtered.length);
      } else {
        setFilteredProductList([]);
        setFilteredCount(0);
      }
    }
  }, [searchTerm, warehouseProductList]);

  // Add this search handler function
  const handleSearch = value => {
    setSearchTerm(value);
  };

  const onRefresh = () => {
    pageNumber.current = 0;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    fetchProductList(selectedValue);
  };

  const fetchProductList = value => {
    pageNumber.current = pageNumber.current + 1;
    setLoading(true);
    dispatch(
      getAllProductByWarehouseIdApi({
        warehouseId: value,
        pageNumber: pageNumber.current,
        pageSize: pageSize,
      }),
    );
  };

  const handleValueChange = (value, index) => {
    // Allow selection of placeholder by checking value directly
    setPickupWarehoue(
      value === 'default' ? '' : pickerWarehouseList[index - 1].label,
    );
    setSelectedValue(value);
    if (Platform.OS === 'android') {
      pageNumber.current = 0;
      setWarehouseProductList(null);
      fetchProductList(value);
    }
  };

  const onClosePicker = () => {
    pageNumber.current = 0;
    setWarehouseProductList(null);
    fetchProductList(selectedValue);
  };

  const onPressOrderCell = index => {
    const updatedArray = warehouseProductList.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : false,
    }));

    setWarehouseProductList(updatedArray);
  };

  const renderItem = ({item, index}) => {
    if (!item) return null; // Add a null check
    const categoryArray = item.categoryHierarchicalName.split('/');

    return (
      <WarehouseOrderCell
        item={item}
        index={index}
        categoryArray={categoryArray}
        onPressOrderCell={onPressOrderCell}
        isPdf={false}
      />
    );
  };

  const moveToWarehouseButton = async () => {
    if (selectedValue !== null) {
      const selectedItems = warehouseProductList.filter(
        item => item.isSelected,
      );
      if (selectedItems.length) {
        const tempArray = pickerWarehouseList;
        const indexToRemove = tempArray.findIndex(
          item => item.label === pickupWarehoue,
        );

        const newArray = [...tempArray];

        if (indexToRemove !== -1) {
          newArray.splice(indexToRemove, 1);
          setDropOffList(newArray);
        }

        setSelectedOrder(selectedItems[0]);
        setShowBS(true);
      } else {
        showAlert('Please select order');
      }
    } else {
      showAlert('Please select warehouse');
    }
  };

  const closeModalButton = () => {
    setShowBS(false);
    if (showMovedWarehouseBS) {
      setShowMovedWarehouseBS(false);
      // pageNumber
      // fetchProductList(selectedValue);

      const indexFind = warehouseProductList.findIndex(
        item => item === selectedOrder,
      );

      const newArray = [...warehouseProductList];

      if (selectedOrder.stockQuantityRemaining == orderData.quantity) {
        newArray.splice(indexFind, 1);
        setWarehouseProductList(newArray);
      } else {
        newArray[indexFind].stockQuantityRemaining =
          selectedOrder.stockQuantityRemaining - parseInt(orderData.quantity);
        setWarehouseProductList(newArray);
      }
    }
  };

  const scanProductButton = () => {
    setShowMovedWarehouseBS(false);
    props.navigation.navigate('ScanScreen');
  };

  const modalMoveToWareHouseButton = ({
    quantity,
    dropOffValue,
    toWarehouseName,
  }) => {
    setShowBS(false);
    setLoading(true);

    setOrderData({quantity, toWarehouseName});

    const params = {
      productId: selectedOrder.id,
      qty: quantity,
      wareHouseName: pickupWarehoue,
      dropOffWareHouseId: dropOffValue,
      pickUpWarehouseId: selectedValue,
    };
    console.log('params', params);
    dispatch(moveToWarehouseApi(params));
  };

  const renderListEmptyComponent = () => {
    // Only show empty state if we're not loading and we've completed the initial load
    if (loading || initialLoad) return null;

    // If searching and no results found, show search-specific message
    if (
      searchTerm &&
      Array.isArray(filteredProductList) &&
      filteredProductList.length === 0
    ) {
      return (
        <View style={[styles.emptyListContainer, {top: -20}]}>
          <Text style={styles.noDataFoundText}>
            No results for "{searchTerm}"
          </Text>
        </View>
      );
    }

    // If a warehouse is selected and there's no data, show "No data found"
    if (
      selectedValue &&
      Array.isArray(warehouseProductList) &&
      warehouseProductList.length === 0
    ) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.noDataFoundText}>No data found</Text>
        </View>
      );
    }

    // If no warehouse is selected, show the selection message
    if (!selectedValue) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.noDataFoundText}>
            Please select a warehouse to view products
          </Text>
        </View>
      );
    }

    return null;
  };

  const navigationLeftButton = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            removeValueAsyncStorage(StorageKey.userData);
            RNRestart.restart();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBS}
        onRequestClose={closeModalButton}>
        <BSPickupDropoffOrder
          close={closeModalButton}
          moveToWareHouse={modalMoveToWareHouseButton}
          order={selectedOrder}
          pickupWarehoue={pickupWarehoue}
          dropOffList={dropOffList}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMovedWarehouseBS}
        onRequestClose={closeModalButton}>
        <BSMoveToWarehouseSuccess
          close={closeModalButton}
          scanProduct={scanProductButton}
          data={moveToWarehouseResponse}
          order={selectedOrder}
          orderData={orderData}
        />
      </Modal>
      <Image
        style={styles.topGradientContainer}
        source={SAL.image.gradientBg}></Image>
      <NavigationBar navigationLeftButton={navigationLeftButton} />
      <View style={styles.dropdownContainer}>
        <Text
          style={styles.warehouseStaticText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          Warehouse
        </Text>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select warehouse', value: 'default'}}
            items={pickerWarehouseList}
            onValueChange={handleValueChange}
            onClose={onClosePicker}
            itemKey={selectedValue}
            useNativeAndroidPickerStyle={false}
            Icon={ArrowDownIcon}
            style={pickerSelectStyles}
          />
        </View>
      </View>

      <SALInputField
        inputStyle={styles.searchContainer}
        placeholderText={'Search Products'}
        placeholderTextColor={'#9A9A9A'}
        keyboardType={'default'}
        secureTextEntry={false}
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <View style={styles.flatlistContainer}>
        <View style={{height: 30, marginLeft: 16, marginTop: 15}}>
          {!loading &&
          (warehouseProductList?.length || filteredProductList?.length) ? (
            <Text style={styles.countText}>
              Total product: {searchTerm ? filteredCount : totalCount}
            </Text>
          ) : null}
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={searchTerm ? filteredProductList : warehouseProductList}
          extraData={[
            loading,
            searchTerm ? filteredProductList : warehouseProductList,
          ]}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderListEmptyComponent}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            if (
              warehouseProductList?.length ===
              pageNumber.current * pageSize
            ) {
              fetchProductList(selectedValue);
            }
          }}
        />
      </View>
      <SALGradientButton
        buttonTitle={'Move to Warehouse'}
        image={SAL.image.warehouseButton}
        buttonPressed={moveToWarehouseButton}
        style={{
          backgroundColor: SAL.colors.white,
        }}
      />

      {loading && <ActivityIndicator />}
    </SafeAreaView>
  );
}

export default HomeScreen;
