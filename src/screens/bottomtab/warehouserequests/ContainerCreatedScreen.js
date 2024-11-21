/* eslint-disable react-native/no-inline-styles */
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
  ScrollView,
  Appearance,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';
import SALGradientButton from '../../../components/SALGradientButton';
import {showAlert} from '../../../utils/Utils';
import BSAssignToDriver from '../../../components/BSAssignToDriver';
import BSSuccessfullyAssigned from '../../../components/BSSuccessfullyAssigned';

import {getAllContainerListApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import {useFocusEffect} from '@react-navigation/native';

const colorScheme = Appearance.getColorScheme();
function ContainerCreatedScreen(props) {
  const [containerCreatedList, setContainerCreatedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showAssignToDriver, setShowAssignToDriver] = useState(false);
  const [showSuccessDriverAssign, setShowSuccessDriverAssign] = useState(false);
  const [driverAssignResponse, setDriverAssignResponse] = useState(null);
  const [assignDriveModal, setAssignDriveModal] = useState(false);
  const containerSelectedIdArray = useRef([]);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const containerListData = useSelector(state => state.warehouse.containerList);

  useFocusEffect(
    React.useCallback(() => {
      // Reset data and page number when the screen gains focus
      pageNumber.current = 0;
      setContainerCreatedList([]);
      getContainerCreated();
    }, []),
  );

  useEffect(() => {
    if (containerListData) {
      // console.log('containerListData: ', containerListData);
      if (containerListData.code === SAL.codeEnum.code200) {
        const updatedArray = containerListData.data.containerList.map(item => ({
          ...item,
          isSelected: false,
        }));

        if (containerCreatedList) {
          setContainerCreatedList(prevArray => [...prevArray, ...updatedArray]);
        } else {
          setItemCount(0);
          setContainerCreatedList(updatedArray);
        }
      } else {
        showAlert(boxListData.message);
      }
      setLoading(false);
    }
  }, [containerListData]);

  const getContainerCreated = () => {
    setLoading(true);
    pageNumber.current = pageNumber.current + 1;
    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
      pageNumber: pageNumber.current,
      pageSize: pageSize,
    };

    dispatch(getAllContainerListApi(params));
  };

  const RenderListEmptyComponent = () => (
    <ScrollView
      contentContainerStyle={styles.emptyListContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {!loading ? (
        <Text style={styles.noDataFoundText}>No data found</Text>
      ) : null}
    </ScrollView>
  );

  const renderItem = ({item, index}) => {
    return (
      <BoxCell
        key={`${item.productPackagingDetailId}-${index}`}
        selectedIndex={2}
        item={item}
        index={index}
        onPressOrderCell={onPressOrderCell}
        // downloadPdf={downloadPdf}
        onPressDetailCell={onPressDetailCell}
      />
    );
  };

  const onPressOrderCell = index => {
    const updatedArray = containerCreatedList.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));

    const numberOfSelectedItems = updatedArray.reduce((count, item) => {
      return count + (item.isSelected ? 1 : 0);
    }, 0);

    setItemCount(numberOfSelectedItems);
    setContainerCreatedList(updatedArray);
  };

  const onPressDetailCell = index => {
    // props.navigation.navigate('PalletDetailScreen', {
    //   item: containerCreatedList[index],
    // });
  };

  const onRefresh = () => {
    setContainerCreatedList(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getContainerCreated();
  };

  const moveToDriverAssignButton = () => {
    if (itemCount) {
      const selectedItemsIds = containerCreatedList
        .filter(item => item.isSelected)
        .map(item => item.productPackagingDetailId);

      containerSelectedIdArray.current = selectedItemsIds;
      setShowAssignToDriver(true);
    } else {
      showAlert('Please select box');
    }
  };

  const closeModalButton = () => {
    // setShowAssignToDriver(false);
    setShowSuccessDriverAssign(false);
    setContainerCreatedList(null);
    pageNumber.current = 0;
    getContainerCreated();
  };

  const trackShipment = () => {
    props.navigation.navigate('Driver Assignment');
  };

  const successfullyAssigned = data => {
    // closeModalButton();
    setDriverAssignResponse(data);
    setShowSuccessDriverAssign(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showAssignToDriver ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAssignToDriver}
          onRequestClose={() => setShowAssignToDriver(false)}>
          <BSAssignToDriver
            selectedIndex={3}
            selectedIds={containerSelectedIdArray.current}
            close={() => setShowAssignToDriver(false)}
            success={successfullyAssigned}
          />
        </Modal>
      ) : null}
      {showSuccessDriverAssign ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSuccessDriverAssign}
          onRequestClose={() => {
            setShowSuccessDriverAssign(false);
            setShowAssignToDriver(false);
          }}>
          <BSSuccessfullyAssigned
            close={() => {
              setShowSuccessDriverAssign(false);
              setShowAssignToDriver(false);
            }}
            trackShipment={trackShipment}
            data={driverAssignResponse}
          />
        </Modal>
      ) : null}
      {containerCreatedList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
        data={containerCreatedList}
        contentContainerStyle={{gap: 15, paddingBottom: 20}}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.productPackagingDetailId}-${index}`
        } // Unique key for each item
        ListHeaderComponent={() => <View style={{height: 25}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (containerCreatedList?.length === pageNumber.current * pageSize) {
            getContainerCreated();
          }
        }}
      />
      <SALGradientButton
        style={{
          paddingBottom: 30,
          backgroundColor: 'transparent',
          // opacity: 0.1,
        }}
        image={SAL.image.truckDriverWhite}
        buttonTitle={'Assign to Driver'}
        buttonPressed={moveToDriverAssignButton}
      />
      {loading && <ActivityIndicator />}
    </SafeAreaView>
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
  createContainer: {
    height: 45,
    borderColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.orangeFFC8A3
        : SAL.colors.orange,

    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  createButtonText: {
    color:
      colorScheme === 'dark'
        ? SAL.darkModeColors.orangeFFC8A3
        : SAL.colors.orange,

    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
  buttonSeparator: {
    width: 1,
    marginVertical: 12,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.orangeFFC8A3
        : SAL.colors.orange,
  },
});

export default ContainerCreatedScreen;
