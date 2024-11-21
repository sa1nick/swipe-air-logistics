import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  RefreshControl,
  SafeAreaView,
  Appearance,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';

import {getAssignedItemToDriver} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {showAlert} from '../../../utils/Utils';

const colorScheme = Appearance.getColorScheme();

function AssignToDriverLoosePackingScreen(props) {
  const [assignedList, setAssignedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const assignedDriverData = useSelector(
    state => state.warehouse.assignDriverItemList,
  );
  const warehouseApiError = useSelector(state => state.warehouse.error);

  // Reset and refresh data on screen focus
  useFocusEffect(
    React.useCallback(() => {
      // Always fetch fresh data when screen is focused
      const fetchData = () => {
        if (pickupWarehouse && dropoffWarehouse) {
          setLoading(true);
          setAssignedList([]); // Clear existing data
          pageNumber.current = 1; // Reset to first page
          getAssignedParcel(); // Fetch new data
        }
      };

      // Fetch data immediately when screen is focused
      fetchData();

      // Return a cleanup function
      return () => {
        // Any cleanup if needed
        setLoading(false);
      };
    }, [pickupWarehouse?.value, dropoffWarehouse?.value]),
  );

  // Reset and fetch data when warehouses change
  useEffect(() => {
    if (pickupWarehouse && dropoffWarehouse) {
      setLoading(true);
      setAssignedList([]); // Clear existing data
      pageNumber.current = 0; // Reset page number
      getAssignedParcel(); // Fetch new data
    }
  }, [pickupWarehouse?.value, dropoffWarehouse?.value]);

  useEffect(() => {
    if (assignedDriverData) {
      if (assignedDriverData.code === SAL.codeEnum.code200) {
        // If it's the first page, replace the list entirely
        if (pageNumber.current === 1) {
          setAssignedList(assignedDriverData.data.allList);
        }
        // If it's a subsequent page, append to existing list
        else {
          setAssignedList(prevArray => [
            ...prevArray,
            ...assignedDriverData.data.allList,
          ]);
        }
      } else {
        showAlert(assignedDriverData.message);
        // Reset the list if there's an error
        setAssignedList([]);
      }
      setLoading(false);
    }
  }, [assignedDriverData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const getAssignedParcel = () => {
    if (!pickupWarehouse?.value || !dropoffWarehouse?.value) {
      setLoading(false);
      setAssignedList([]); // Ensure list is cleared
      return;
    }

    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
      pageNumber: pageNumber.current + 1,
      pageSize: pageSize,
    };

    console.log('assignToDriver payload', params);

    pageNumber.current = params.pageNumber;
    dispatch(getAssignedItemToDriver(params));
  };

  const RenderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {!loading ? (
        <Text
          style={styles.noDataFoundText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          No data found
        </Text>
      ) : null}
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    pageNumber.current = 0;
    setAssignedList([]); // Clear existing data
    getAssignedParcel();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderItem = ({item, index}) => {
    return (
      <BoxCell
        selectedIndex={item.itmeType - 1}
        item={item}
        index={index}
        isDriver={true}
        onPressDetailCell={() =>
          console.log('Assigned to driver Box, onPressDetailCell')
        }
        onPressOrderCell={() =>
          console.log('Assigned to driver Box, onPressOrderCell')
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {assignedList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
        ItemSeparatorComponent={() => <View style={{height: 20}} />} // Global spacing between items
        keyExtractor={(item, index) => index.toString()}
        data={assignedList}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={{height: 25}} />}
        ListFooterComponent={() => <View style={{height: 35}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (assignedList?.length === pageNumber.current * pageSize) {
            getAssignedParcel();
          }
        }}
        onEndReachedThreshold={0.5}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
  },
  emptyListContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
});

export default AssignToDriverLoosePackingScreen;
