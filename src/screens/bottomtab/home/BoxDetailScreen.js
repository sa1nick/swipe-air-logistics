import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import styles from './BoxDetailStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import {downloadFile, getData} from '../../../utils/Utils';
import ActivityIndicator from '../../../components/ActivityIndicator';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';
import {StorageKey} from '../../../utils/Enum';
import {showAlert} from '../../../utils/Utils';

import {
  getBoxDetailListApi,
  clearDetailBoxList,
} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function BoxDetailScreen(props) {
  const {item} = props.route.params;

  const [movedBy, setMovedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState(null);

  const pageNumber = useRef(0);
  const pageSize = 15;

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const detailBoxListData = useSelector(state => state.warehouse.detailBoxList);
  const boxDetailApiError = useSelector(
    state => state.warehouse.detailBoxListError,
  );

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getData(StorageKey.userData);
      setMovedBy(userData.firstName + ' ' + userData.lastName);
    };
    getUserData();
    getBoxItemList();

    return () => dispatch(clearDetailBoxList());
  }, []);

  useEffect(() => {
    if (detailBoxListData) {
      console.log('boxListData: ', detailBoxListData);
      if (detailBoxListData.code === SAL.codeEnum.code200) {
        if (productList) {
          setProductList(prevArray => [
            ...prevArray,
            ...detailBoxListData.data,
          ]);
        } else {
          setProductList(detailBoxListData.data);
        }
      } else {
        showAlert(detailBoxListData.message);
      }
      setLoading(false);
    }
  }, [detailBoxListData]);

  useEffect(() => {
    if (boxDetailApiError) {
      setLoading(false);
      showAlert(boxDetailApiError);
    }
  }, [boxDetailApiError]);

  const getBoxItemList = () => {
    setLoading(true);
    pageNumber.current = pageNumber.current + 1;

    const params = {
      pageNumber: pageNumber.current,
      pageSize: pageSize,
      boxId: item.productPackagingDetailId,
    };
    dispatch(getBoxDetailListApi(params));
  };

  const onPressOrderCell = () => {};

  const renderItem = ({item, index}) => {
    const categoryArray = item.categoryHierarchicalName?.split('/');
    return (
      <WarehouseOrderCell
        item={item}
        index={index}
        categoryArray={categoryArray}
        isPdf={true}
        onPressOrderCell={onPressOrderCell}
        downloadPdf={downloadPdf}
        movedBy={movedBy}
      />
    );
  };

  const downloadPdf = async item => {
    setLoading(true);
    await downloadFile(item.qrCodeFileNamePath, item.qrCodeFilePath);
    setLoading(false);
  };

  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  const BoxHeaderRenderItem = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.childContainer}>
          <View style={{flexDirection: 'row', height: 50}}>
            <Image style={styles.boxIcon} source={SAL.image.boxDimension} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.boxTitle}>Box ID</Text>
              <Text style={styles.boxIdText}>
                {item.packageQRCodeFile.split('.')[0]}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.boxTitle}>Item Inside</Text>
            <Text style={styles.boxIdText}>{item.totalItem}</Text>
          </View>
        </View>
      </View>
    );
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
          <Text style={styles.fromText}>{pickupWarehouse.label}</Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text style={styles.fromText}>{dropoffWarehouse.label}</Text>
        </View>
      </View>
      <BoxHeaderRenderItem />
      <FlatList
        data={productList}
        renderItem={renderItem}
        ListFooterComponent={() => <View style={{height: 50}} />}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          if (productList?.length === pageNumber.current * pageSize) {
            getBoxItemList();
          }
        }}
      />

      {loading && <ActivityIndicator />}
    </View>
  );
}

export default BoxDetailScreen;
