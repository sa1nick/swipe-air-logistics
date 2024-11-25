import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import PalletDetailStyle from './PalletDetailStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import {downloadFile, getData} from '../../../utils/Utils';
import ActivityIndicator from '../../../components/ActivityIndicator';
import BoxCell from '../../cells/BoxCell';
import {StorageKey} from '../../../utils/Enum';
import {showAlert} from '../../../utils/Utils';

import {
  getPalletDetailListApi,
  clearDetailPalletList,
} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {scaleFactor} from '../../../utils/ViewScaleUtil';
import useCustomTheme from '../../../hook/useCustomTheme';

function PalletDetailScreen(props) {
  const {data, item, isFromConsignment} = props.route.params;

  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = PalletDetailStyle(isDark);

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

  const detailPalletListData = useSelector(
    state => state.warehouse.detailPalletList,
  );
  const palletDetailApiError = useSelector(
    state => state.warehouse.detailPalletListError,
  );

  useEffect(() => {
    getPalletItemList();

    return () => dispatch(clearDetailPalletList());
  }, []);

  useEffect(() => {
    if (detailPalletListData) {
      console.log('detailPalletListData: ', detailPalletListData);
      if (detailPalletListData.code === SAL.codeEnum.code200) {
        if (productList) {
          setProductList(prevArray => [
            ...prevArray,
            ...detailPalletListData.data,
          ]);
        } else {
          setProductList(detailPalletListData.data);
        }
      } else {
        showAlert(detailPalletListData.message);
      }
      setLoading(false);
    }
  }, [detailPalletListData]);

  useEffect(() => {
    if (palletDetailApiError) {
      setLoading(false);
      showAlert(palletDetailApiError);
    }
  }, [palletDetailApiError]);

  const getPalletItemList = () => {
    setLoading(true);
    pageNumber.current = pageNumber.current + 1;

    const params = {
      pageNumber: pageNumber.current,
      pageSize: pageSize,
      palletId: item.productPackagingDetailId,
    };
    dispatch(getPalletDetailListApi(params));
  };

  const onPressOrderCell = () => {};

  const onPressDetailCell = index => {
    props.navigation.navigate(
      isFromConsignment ? 'BoxDetailScreenConsignment' : 'BoxDetailScreen',
      {
        item: productList[index],
      },
    );
  };

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

  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  const PalletHeaderRenderItem = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.childContainer}>
          <View style={{flexDirection: 'row', height: scaleFactor(120)}}>
            <Image style={styles.boxIcon} source={SAL.image.boxDimension} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.boxTitle}>Pallet ID</Text>
              <Text style={styles.boxIdText}>
                {item.packageQRCodeFile.split('.')[0]}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.boxTitle}>Box Inside</Text>
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
      <PalletHeaderRenderItem />
      <FlatList
        data={productList}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View
            style={{height: 50}}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              if (productList?.length === pageNumber.current * pageSize) {
                getPalletItemList();
              }
            }}
          />
        )}
      />

      {loading && <ActivityIndicator />}
    </View>
  );
}

export default PalletDetailScreen;
