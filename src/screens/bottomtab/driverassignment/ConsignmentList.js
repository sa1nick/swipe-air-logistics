import React, {useMemo, useRef, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import { showAlert } from '../../../utils/Utils';
import ActivityIndicator from '../../../components/ActivityIndicator';

import {getConsignmentListApi, clearConsignmentList} from '../../../api/slice/warehouseSlice/warehouseApiSlice';


const ConsignmentList = props => {

  const {item} = props.route.params;

  const [loading, setLoading] = useState(false);
  const [consignmentData, setConsignmentData] = useState(null);

  const dispatch = useDispatch();

  const consignmentListData = useSelector(
    state => state.warehouse.consignmentList,
  );
  const consignmentApiError = useSelector(
    state => state.warehouse.consignmentError,
  );

  useEffect(() => {
    getAssignmentData();

    return () => dispatch(clearConsignmentList());

  }, []);

  const getAssignmentData = () => {
    setLoading(true);
    dispatch(getConsignmentListApi({assignmentId: item.assignmentId}));
  };

  useEffect(() => {
    if (consignmentListData) {
      console.log('consignmentListData: ', consignmentListData);
      setLoading(false);
      if (consignmentListData.code === SAL.codeEnum.code200) {

        setConsignmentData(consignmentListData.data);
      } else {
        showAlert(consignmentListData.message);
      }
    }
  }, [consignmentListData]);

  useEffect(() => {
    if (consignmentApiError) {
      setLoading(false);
      showAlert(consignmentApiError);
    }
  }, [consignmentApiError]);

  const onPressCell = (index) => {
    props.navigation.navigate("ConsignmentDetailScreen", {
      item: item,
      consignmentData: consignmentData[index],
      selectedIndex: index - 1
    })
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.cellContainer}>
        <Pressable style={styles.itemContainer} onPress={() => {
          onPressCell(index)
        }}>
          <View style={styles.subItemContainer}>
            <Text style={styles.itemQuantityText}>{item.itmeType}</Text>
            <Text style={styles.itemQuantityText}>{item.totalItem}</Text>
          </View>
          <Image style={{marginLeft: '5%'}} source={SAL.image.forwardArrow} />
        </Pressable>
        <View style={{height: 20}} />
      </View>
    );
  };

  const close = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <View style={{width: '100%', position: 'absolute'}}>
            <Text style={styles.titleText}>Consignment List</Text>
          </View>
          <Pressable style={styles.closeButton} onPress={close}>
            <Image source={SAL.image.closeModal}></Image>
          </Pressable>
        </View>
      </SafeAreaView>
      <FlatList
        data={consignmentData}
        renderItem={renderItem}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDCC4',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 50
  },
  closeButton: {
    marginLeft: 16,
  },
  titleText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    alignSelf: 'center',
  },
  cellContainer: {
    marginHorizontal: 16,
  },
  itemContainer: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SAL.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subItemContainer: {
    width: '78%',
    height: '100%',
    marginLeft: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantityText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  orderContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: SAL.colors.white,
  },
  orderImage: {
    width: 36,
    height: 36,
    marginTop: 18,
    marginLeft: 16,
  },
  infoContainer: {
    marginTop: 18,
    marginLeft: 12,
  },
  orderText: {
    width: 260,
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    height: 20,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FF7517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTypeText: {
    color: SAL.colors.purple,
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
  },
  pdfContainer: {
    marginVertical: 10,
    height: 20,
    flexDirection: 'row',
  },
  pdfName: {
    color: SAL.colors.black,
    fontSize: 13,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default ConsignmentList;
