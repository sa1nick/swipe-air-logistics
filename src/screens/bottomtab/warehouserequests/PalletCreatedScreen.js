import React, {useState, useRef, useEffect, useCallback} from 'react';
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
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';
import SALGradientButton from '../../../components/SALGradientButton';
import {showAlert, downloadFile} from '../../../utils/Utils';
import BSAssignToDriver from '../../../components/BSAssignToDriver';
import BSSuccessfullyAssigned from '../../../components/BSSuccessfullyAssigned';

import {getPalletListApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {useFocusEffect} from '@react-navigation/native';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

function PalletCreatedScreen(props) {
  const [palletCreatedList, setPalletCreatedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showAssignToDriver, setShowAssignToDriver] = useState(false);
  const [showSuccessDriverAssign, setShowSuccessDriverAssign] = useState(false);
  const [driverAssignResponse, setDriverAssignResponse] = useState(null);

  const palletSelectedIdArray = useRef([]);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const palletListData = useSelector(state => state.warehouse.palletList);
  const warehouseApiError = useSelector(state => state.warehouse.error);

  useFocusEffect(
    useCallback(() => {
      // Reset data and page number when the screen gains focus
      pageNumber.current = 0;
      setPalletCreatedList([]);
      getPalletCreated();
    }, []),
  );
  useEffect(() => {
    if (palletListData) {
      console.log('palletListData: ', palletListData);
      if (palletListData.code === SAL.codeEnum.code200) {
        const updatedArray = palletListData.data.palletList.map(item => ({
          ...item,
          isSelected: false,
        }));

        if (palletCreatedList) {
          setPalletCreatedList(prevArray => [...prevArray, ...updatedArray]);
        } else {
          setItemCount(0);
          setPalletCreatedList(updatedArray);
        }
      } else {
        showAlert(boxListData.message);
      }
      setLoading(false);
    }
  }, [palletListData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const getPalletCreated = () => {
    setLoading(true);
    pageNumber.current = pageNumber.current + 1;
    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
      pageNumber: pageNumber.current,
      pageSize: pageSize,
    };

    console.log('Params in pallet list api', params);

    dispatch(getPalletListApi(params));
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
        selectedIndex={1}
        item={item}
        index={index}
        onPressOrderCell={onPressOrderCell}
        downloadPdf={downloadPdf}
        onPressDetailCell={onPressDetailCell}
      />
    );
  };

  const onPressOrderCell = index => {
    const updatedArray = palletCreatedList.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));

    const numberOfSelectedItems = updatedArray.reduce((count, item) => {
      return count + (item.isSelected ? 1 : 0);
    }, 0);

    setItemCount(numberOfSelectedItems);
    setPalletCreatedList(updatedArray);
  };

  const downloadPdf = async item => {
    setLoading(true);
    await downloadFile(`Package/${item.packageQRCodeFile}`);
    setLoading(false);
  };

  const onPressDetailCell = index => {
    props.navigation.navigate('PalletDetailScreen', {
      item: palletCreatedList[index],
    });
  };

  const onRefresh = () => {
    setPalletCreatedList(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getPalletCreated();
  };

  const moveToDriverAssignButton = () => {
    if (itemCount) {
      const selectedItemsIds = palletCreatedList
        .filter(item => item.isSelected)
        .map(item => item.productPackagingDetailId);

      palletSelectedIdArray.current = selectedItemsIds;
      setShowAssignToDriver(true);
    } else {
      showAlert('Please select pallet');
    }
  };

  const closeModalButton = () => {
    setShowAssignToDriver(false);
    setShowSuccessDriverAssign(false);
    setPalletCreatedList(null);
    pageNumber.current = 0;
    getPalletCreated();
  };

  const trackShipment = () => {
    props.navigation.navigate('Driver Assignment');
  };

  const successfullyAssigned = data => {
    closeModalButton();
    setDriverAssignResponse(data);
    setShowSuccessDriverAssign(true);
  };

  const createContainerButton = () => {
    if (itemCount) {
      createContainer(SAL.image.containerTickIcon);
    } else {
      showAlert('Please select pallet');
    }
  };

  const createContainer = imagePath => {
    const selectedItemsIds = palletCreatedList
      .filter(item => item.isSelected)
      .map(item => item.productPackagingDetailId);
    const params = {
      productTrackingDetailIdList: selectedItemsIds,
      title: 'Container',
      image: imagePath,
    };

    props.navigation.push('MoveToContainerScreen', {
      data: params,
      from: 1,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {showAssignToDriver ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAssignToDriver}
          onRequestClose={closeModalButton}>
          <BSAssignToDriver
            selectedIndex={2}
            selectedIds={palletSelectedIdArray.current}
            close={closeModalButton}
            success={successfullyAssigned}
          />
        </Modal>
      ) : null}
      {showSuccessDriverAssign ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSuccessDriverAssign}
          onRequestClose={closeModalButton}>
          <BSSuccessfullyAssigned
            close={closeModalButton}
            trackShipment={trackShipment}
            data={driverAssignResponse}
          />
        </Modal>
      ) : null}
      {palletCreatedList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
        data={palletCreatedList}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={{height: 25}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (palletCreatedList?.length === pageNumber.current * pageSize) {
            getPalletCreated();
          }
        }}
      />
      <View style={[styles.createContainer, {width: '50%'}]}>
        <Pressable style={styles.createButton} onPress={createContainerButton}>
          <Image source={SAL.image.createContainerIcon} />
          <Text style={styles.createButtonText}>Move To Container</Text>
        </Pressable>
      </View>
      <SALGradientButton
        image={SAL.image.truckDriverWhite}
        buttonTitle={'Assign to Driver'}
        buttonPressed={moveToDriverAssignButton}
        style={{marginBottom: scaleFactor(10)}}
      />
      {loading && <ActivityIndicator />}
    </SafeAreaView>
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
  createContainer: {
    height: 45,
    borderColor: SAL.colors.orange,
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
    color: SAL.colors.orange,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
  buttonSeparator: {
    width: 1,
    marginVertical: 12,
    backgroundColor: SAL.colors.orange,
  },
});

export default PalletCreatedScreen;
