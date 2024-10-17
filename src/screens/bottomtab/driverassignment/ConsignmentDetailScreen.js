import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import {downloadFile, getData} from '../../../utils/Utils';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';
import {StorageKey} from '../../../utils/Enum';
import {showAlert} from '../../../utils/Utils';

import {
  getAssignmentDetailApi,
  clearConsignmentDetailList,
} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function ConsignmentDetailScreen(props) {
  const {item, consignmentData, selectedIndex} = props.route.params;

  const [loading, setLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const assignmentListData = useSelector(
    state => state.warehouse.assignmentDetailList,
  );
  const assignmentApiError = useSelector(
    state => state.warehouse.assignmentDetailError,
  );

  useEffect(() => {
    getAssignmentData();

    return () => dispatch(clearConsignmentDetailList());
  }, []);

  const getAssignmentData = () => {
    setLoading(true);

    pageNumber.current = pageNumber.current + 1;

    const params = {
      pageNumber: pageNumber.current,
      pageSize: pageSize,
      itmeType: consignmentData.itmeType,
      assignmentId: consignmentData.assignmentId,
    };

    console.log('params detail: ', params);

    dispatch(getAssignmentDetailApi(params));
  };

  useEffect(() => {
    if (assignmentListData) {
      console.log('assignmentListData: ', assignmentListData);
      setLoading(false);
      if (assignmentListData.code === SAL.codeEnum.code200) {
        if (assignmentData) {
          setAssignmentData(prevArray => [
            ...prevArray,
            ...assignmentListData.data,
          ]);
        } else {
          setAssignmentData(assignmentListData.data);
        }
      } else {
        showAlert(assignmentListData.message);
      }
    }
  }, [assignmentListData]);

  useEffect(() => {
    if (assignmentApiError) {
      setLoading(false);
      showAlert(assignmentApiError);
    }
  }, [assignmentApiError]);

  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  const onRefresh = () => {
    setAssignmentData(null);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    pageNumber.current = 0;
    getAssignmentData();
  };

  const renderItem = ({item, index}) => {
    return (
      <BoxCell
        selectedIndex={selectedIndex}
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
    console.log('onPressOrderCell');
  };

  const onPressDetailCell = index => {
    const item = assignmentData[index];

    let screenName = '';
    if (selectedIndex === 0) {
      screenName = 'BoxDetailScreenConsignment';
    } else if (selectedIndex === 1) {
      screenName = 'PalletDetailScreenConsignment';
    }

    props.navigation.navigate(screenName, {
      item: item,
      isFromConsignment: true,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar
        navigationLeftButton={navigationLeftButton}
        isBackButton={true}
      />
      <View style={styles.locationContainer}>
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.fromWarehouseWhite}></Image>
          <Text style={styles.fromText}>{item.pickupWarehouseName}</Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text style={styles.fromText}>{item.wareHouseName}</Text>
        </View>
      </View>
      <FlatList
        style={styles.headerContainer}
        data={assignmentData}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={{height: 25}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (assignmentData && !loading) {
            if (
              assignmentData?.length ===
              pageNumber.current * pageSize.current
            ) {
              getAssignmentData();
            }
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
    backgroundColor: SAL.colors.white,
  },
  topGradientContainer: {
    position: 'absolute',
    width: '100%',
    height: 260,
  },
  locationContainer: {
    marginTop: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromToContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fromText: {
    color: SAL.colors.white,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 5,
  },
  headerContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginBottom: 10,
  },
  childContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  boxIcon: {
    marginTop: 5,
    width: 26,
    height: 22,
  },
  boxTitle: {
    color: '#8A8A8A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  boxIdText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 3,
  },
});

export default ConsignmentDetailScreen;
