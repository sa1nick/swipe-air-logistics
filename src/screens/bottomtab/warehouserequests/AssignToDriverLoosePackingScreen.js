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
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';

import {getAssignedItemToDriver} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {showAlert} from '../../../utils/Utils';

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

  useEffect(() => {
    if (pickupWarehouse && dropoffWarehouse && assignedDriverData)
      getAssignedParcel();
  }, []);

  useEffect(() => {
    if (assignedDriverData) {
      console.log('assignedDriverData: ', assignedDriverData);
      if (assignedDriverData.code === SAL.codeEnum.code200) {
        if (assignedList) {
          setAssignedList(prevArray => [
            ...prevArray,
            ...assignedDriverData.data.allList,
          ]);
        } else {
          setAssignedList(assignedDriverData.data.allList);
        }
      } else {
        showAlert(assignedDriverData.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [assignedDriverData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const getAssignedParcel = () => {
    setLoading(true);
    pageNumber.current = pageNumber?.current + 1;
    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
      pageNumber: pageNumber.current,
      pageSize: pageSize,
    };

    dispatch(getAssignedItemToDriver(params));
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {!loading ? (
        <Text style={styles.noDataFoundText}>No data found</Text>
      ) : null}
    </View>
  );

  const onRefresh = () => {
    setAssignedList(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getAssignedParcel();
  };

  const renderItem = ({item, index}) => {
    return (
      <BoxCell
        selectedIndex={item.itmeType - 1}
        item={item}
        index={index}
        isDriver={true}
        // onPressDetailCell={onPressDetailCell}
      />
    );
  };

  return (
    <View style={styles.container}>
      {assignedList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
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
      />
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default AssignToDriverLoosePackingScreen;
