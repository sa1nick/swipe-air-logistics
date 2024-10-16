import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import styles from './MoveToContainerStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import ActivityIndicator from '../../../components/ActivityIndicator';
import {showAlert} from '../../../utils/Utils';
import BoxCell from '../../cells/BoxCell';

import {getAllContainerListApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';

function MoveToContainerScreen(props) {
  const {data, from} = props.route.params;

  const [loading, setLoading] = useState(true);
  const [containerList, setContainerList] = useState(null);

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const containerListData = useSelector(state => state.warehouse.containerList);
  const containerListApiError = useSelector(
    state => state.warehouse.containerListError,
  );

  useEffect(() => {
    const params = {
      dropoffWarehouseId: dropoffWarehouse.value,
      pickupWarehouseId: pickupWarehouse.value,
    };

    dispatch(getAllContainerListApi(params));
  }, []);

  useEffect(() => {
    if (containerListData) {
      console.log('containerListData: ', containerListData);
      setLoading(false);
      if (containerListData.code === SAL.codeEnum.code200) {
        setContainerList(containerListData.data.containerList);
      } else {
        showAlert(containerListData.message);
      }
    }
  }, [containerListData]);

  useEffect(() => {
    if (containerListApiError) {
      setLoading(false);
      showAlert(containerListApiError);
    }
  }, [containerListApiError]);

  const onPressOrderCell = index => {
    console.log('on press: ', containerList[index]);
    props.navigation.push('BoxDimensionScreen', {
      data: data,
      item: containerList[index],
      isExist: true,
      from: from
    });
  };

  const onPressDetailCell = () => {
    console.log('onPressDetailCell');
  };

  const renderItem = ({item, index}) => {
    return (
      <BoxCell
        selectedIndex={2}
        item={item}
        index={index}
        onPressOrderCell={onPressOrderCell}
        onPressDetailCell={onPressDetailCell}
        isRemainingWeight={true}
      />
    );
  };

  const navigationLeftButton = () => {
    props.navigation.goBack();
  };

  const createContainerButton = () => {
    props.navigation.navigate('BoxDimensionScreen', {
      data: data,
      from: from
    });
  };

  const RenderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {!loading ? (
        <Text style={styles.noDataFoundText}>
          No container found. Please create new container.
        </Text>
      ) : null}
    </View>
  );

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
      {containerList?.length ? null : <RenderListEmptyComponent />}
      <FlatList
        style={{
          backgroundColor: 'white',
          marginTop: 30,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
        data={containerList}
        renderItem={renderItem}
        ListHeaderComponent={() => <View style={{height: 30}} />}
        ListFooterComponent={() => <View style={{height: 50}} />}
      />

      <Pressable style={styles.createButton} onPress={createContainerButton}>
        <Image source={SAL.image.createContainerIcon} />
        <Text style={styles.createButtonText}>Create Container</Text>
      </Pressable>

      {loading && <ActivityIndicator />}
    </View>
  );
}

export default MoveToContainerScreen;
