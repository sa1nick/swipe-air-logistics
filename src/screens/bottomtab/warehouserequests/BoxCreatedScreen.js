import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BSAssignToDriver from '../../../components/BSAssignToDriver';
import BSSuccessfullyAssigned from '../../../components/BSSuccessfullyAssigned';
import SALGradientButton from '../../../components/SALGradientButton';
import {downloadFile, showAlert} from '../../../utils/Utils';
import BoxCell from '../../cells/BoxCell';

import {useFocusEffect} from '@react-navigation/native';
import {getBoxListApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import useCustomTheme from '../../../hook/useCustomTheme';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

function BoxCreatedScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const [boxCreatedList, setBoxCreatedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showAssignToDriver, setShowAssignToDriver] = useState(false);
  const [showSuccessDriverAssign, setShowSuccessDriverAssign] = useState(false);
  const [driverAssignResponse, setDriverAssignResponse] = useState(null);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const boxSelectedIdArray = useRef([]);

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const boxListData = useSelector(state => state.warehouse.boxList);
  const warehouseApiError = useSelector(state => state.warehouse.error);

  // Refresh data on screen focus
  useFocusEffect(
    useCallback(() => {
      // Reset page number and data on screen focus
      pageNumber.current = 0;
      setBoxCreatedList([]);
      getBoxCreated();
    }, []),
  );

  useEffect(() => {
    if (boxListData) {
      if (boxListData.code === SAL.codeEnum.code200) {
        const updatedArray = boxListData.data.boxlist.map(item => ({
          ...item,
          isSelected: false,
        }));

        if (boxCreatedList) {
          setBoxCreatedList(prevArray => [...prevArray, ...updatedArray]);
        } else {
          setItemCount(0);
          setBoxCreatedList(updatedArray);
        }
      } else {
        showAlert(boxListData.message);
      }
      setLoading(false);
    }
  }, [boxListData]);

  useEffect(() => {
    if (warehouseApiError) {
      setLoading(false);
      showAlert(warehouseApiError);
    }
  }, [warehouseApiError]);

  const getBoxCreated = () => {
    setLoading(true);
    pageNumber.current = pageNumber.current + 1;
    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
      pageNumber: pageNumber.current,
      pageSize: pageSize,
    };

    dispatch(getBoxListApi(params));
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
        selectedIndex={0}
        item={item}
        index={index}
        onPressOrderCell={onPressOrderCell}
        downloadPdf={downloadPdf}
        onPressDetailCell={onPressDetailCell}
      />
    );
  };

  const downloadPdf = async item => {
    setLoading(true);
    await downloadFile(item.packageQRCodeFile, item.qrCodeFilePath);
    setLoading(false);
  };

  const onPressOrderCell = index => {
    const updatedArray = boxCreatedList.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));

    const numberOfSelectedItems = updatedArray.reduce((count, item) => {
      return count + (item.isSelected ? 1 : 0);
    }, 0);

    setItemCount(numberOfSelectedItems);
    setBoxCreatedList(updatedArray);
  };

  const onPressDetailCell = index => {
    props.navigation.navigate('BoxDetailScreen', {
      item: boxCreatedList[index],
    });
  };

  const onRefresh = () => {
    setBoxCreatedList(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getBoxCreated();
  };

  const createPalletButton = () => {
    if (itemCount) {
      createPalletContainer('Pallet', SAL.image.palletTickIcon);
    } else {
      showAlert('Please select box');
    }
  };

  const createContainerButton = () => {
    if (itemCount) {
      createPalletContainer('Container', SAL.image.containerTickIcon);
    } else {
      showAlert('Please select box');
    }
  };

  const createPalletContainer = (title, imagePath) => {
    const selectedItemsIds = boxCreatedList
      .filter(item => item.isSelected)
      .map(item => item.productPackagingDetailId);
    const params = {
      productTrackingDetailIdList: selectedItemsIds,
      title: title,
      image: imagePath,
    };

    let screenName =
      title === 'Container' ? 'MoveToContainerScreen' : 'BoxDimensionScreen';

    console.log('createPalletContainer params', params);

    props.navigation.push(screenName, {
      data: params,
      from: 0,
    });
  };

  const moveToDriverAssignButton = () => {
    if (itemCount) {
      const selectedItemsIds = boxCreatedList
        .filter(item => item.isSelected)
        .map(item => item.productPackagingDetailId);

      boxSelectedIdArray.current = selectedItemsIds;
      setShowAssignToDriver(true);
    } else {
      showAlert('Please select box');
    }
  };

  const closeModalButton = () => {
    setShowAssignToDriver(false);
    setShowSuccessDriverAssign(false);
    setBoxCreatedList(null);
    pageNumber.current = 0;
    getBoxCreated();
  };

  const trackShipment = () => {
    props.navigation.navigate('Driver Assignment');
  };

  const successfullyAssigned = data => {
    closeModalButton();
    setDriverAssignResponse(data);
    setShowSuccessDriverAssign(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // height: SAL.constant.screenHeight * 1.5,
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
      fontSize: 16,
      fontFamily: 'Rubik-Medium',
    },
    createContainer: {
      height: 45,
      borderColor: isDark ? SAL.darkModeColors.orangeFFC8A3 : SAL.colors.orange,
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
      width: '48%',
    },
    createButtonText: {
      color: isDark ? SAL.darkModeColors.orangeFFC8A3 : SAL.colors.orange,
      fontSize: 12,
      fontFamily: 'Rubik-Medium',
      marginLeft: 10,
    },
    buttonSeparator: {
      width: 1,
      marginVertical: 12,
      backgroundColor: isDark
        ? SAL.darkModeColors.orangeFFC8A3
        : SAL.colors.orange,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {showAssignToDriver ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAssignToDriver}
          onRequestClose={closeModalButton}>
          <BSAssignToDriver
            selectedIndex={1}
            selectedIds={boxSelectedIdArray.current}
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
      {boxCreatedList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
        data={boxCreatedList}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 20}} />} // Global spacing between items
        ListHeaderComponent={() => <View style={{height: 25}} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (boxCreatedList?.length === pageNumber.current * pageSize) {
            getBoxCreated();
          }
        }}
      />

      <View style={[styles.createContainer, {width: '80%'}]}>
        <>
          <Pressable style={styles.createButton} onPress={createPalletButton}>
            <Image
              source={SAL.image.createPalletIcon}
              style={{
                tintColor: isDark ? SAL.darkModeColors.orangeFFC8A3 : '#FF6D09',
              }}
            />
            <Text
              style={styles.createButtonText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              Create Pallet
            </Text>
          </Pressable>
          <View style={styles.buttonSeparator} />
        </>
        <Pressable
          style={[styles.createButton, {width: '50%'}]}
          onPress={createContainerButton}>
          <Image
            source={SAL.image.createContainerIcon}
            style={{
              tintColor: isDark ? SAL.darkModeColors.orangeFFC8A3 : '#FF6D09',
            }}
          />
          <Text
            style={styles.createButtonText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            Move To Container
          </Text>
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

export default BoxCreatedScreen;
