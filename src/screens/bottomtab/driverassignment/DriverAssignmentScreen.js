import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  RefreshControl,
  FlatList,
  Modal,
  useColorScheme,
  Appearance,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // Add this import

import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import {
  DriverAssignmentStyle,
  pickerSelectStyles,
} from './DriverAssignmentStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import DriverAssignmentCell from '../../cells/DriverAssignmentCell';
import BSRemindDriver from '../../../components/BSRemindDriver';
import BSAssignmentRejected from '../../../components/BSAssignmentRejected';
import ActivityIndicator from '../../../components/ActivityIndicator';
import {navigationLeftButton, showAlert} from '../../../utils/Utils';

import {getDriverAssignmentListApi} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import {scaleFactor} from '../../../utils/ViewScaleUtil';
import useCustomTheme from '../../../hook/useCustomTheme';

function DriverAssignmentScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = DriverAssignmentStyle(isDark);
  const pickerSelectStyle = pickerSelectStyles(isDark);

  const [loading, setLoading] = useState(false);
  const [showBS, setShowBS] = useState(false);
  const [showRemindDriver, setShowRemindDriver] = useState(false);
  const [showAssignmentRejected, setShowAssignmentRejected] = useState(false);
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedLabel, setSelectedLabel] = useState('Yet to Freeze');
  const [assignmentList, setAssignmentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const pickerWidth = SAL.constant.screenWidth - 32 - 100;

  const colorScheme = Appearance.getColorScheme();

  const pickerItems = [
    {label: 'Yet to Freeze', value: '1'},
    {label: 'Pending Acceptance', value: '2'},
    {label: 'Accepted', value: '3'},
    {label: 'Pickup Delayed', value: '4'},
    {label: 'In Transit', value: '5'},
    {label: 'Rejected', value: '6'},
  ];

  const statusColor = [
    '#000000',
    isDark ? SAL.darkModeColors.green082B24 : '#0DBC93',
    isDark ? SAL.darkModeColors.green082B24 : '#0DBC93',
    isDark ? '#03293A' : '#15AEF2',
    isDark ? SAL.darkModeColors.green082B24 : '#0DBC93',
    '#9E8F05',
    isDark ? SAL.darkModeColors.green082B24 : '#0DBC93',
    '#FF3333',
  ];

  const dispatch = useDispatch();

  const driverAssignmentListData = useSelector(
    state => state.warehouse.driverAssignmentList,
  );
  const driverAssignmentApiError = useSelector(
    state => state.warehouse.driverAssignmentError,
  );

  // Add useFocusEffect to refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      getAssignmentData();
    }, [selectedValue]),
  );

  // Remove the existing useEffect for initial data fetch
  useEffect(() => {
    if (driverAssignmentListData) {
      console.log('driverAssignmentListData: ', driverAssignmentListData);
      setLoading(false);
      if (driverAssignmentListData.code === SAL.codeEnum.code200) {
        setAssignmentList(driverAssignmentListData.data);
      } else {
        showAlert(driverAssignmentListData.message);
      }
    }
  }, [driverAssignmentListData]);

  useEffect(() => {
    if (driverAssignmentApiError) {
      setLoading(false);
      showAlert(driverAssignmentApiError);
    }
  }, [driverAssignmentApiError]);

  const getAssignmentData = () => {
    setLoading(true);
    dispatch(getDriverAssignmentListApi({status: parseInt(selectedValue)}));
  };

  const handleValueChange = (value, index) => {
    console.log('value: ', value);
    setSelectedLabel(index ? pickerItems[index - 1].label : null);
    setSelectedValue(value);
  };

  const onClosePicker = () => {
    if (selectedValue) {
      getAssignmentData();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
    getAssignmentData();
  };

  const arrowDownIcon = () => (
    <View style={{marginRight: 20, height: 50, justifyContent: 'center'}}>
      <Image
        source={SAL.image.downArrow}
        style={{tintColor: isDark ? '#F0C3F4' : ''}}
      />
    </View>
  );

  const showConsignmentButton = index => {
    props.navigation.navigate('ConsignmentScreen', {
      screen: 'ConsignmentList',
      params: {
        item: assignmentList[index],
      },
    });
  };

  const remindDriverButton = () => {
    setShowRemindDriver(true);
  };

  const assignmentRejectedButton = () => {
    setShowAssignmentRejected(true);
  };

  const closeModalButton = () => {
    setShowBS(false);
    setShowRemindDriver(false);
    setShowAssignmentRejected(false);
  };

  const renderItem = ({item, index}) => (
    <DriverAssignmentCell
      item={item}
      showConsignmentButton={() => showConsignmentButton(index)}
      remindDriverButton={remindDriverButton}
      assignmentRejectedButton={assignmentRejectedButton}
      selectedValue={selectedValue}
      selectedLabel={selectedLabel}
      color={statusColor[parseInt(selectedValue)]}
    />
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRemindDriver}
        onRequestClose={closeModalButton}>
        <BSRemindDriver close={closeModalButton} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAssignmentRejected}
        onRequestClose={closeModalButton}>
        <BSAssignmentRejected close={closeModalButton} />
      </Modal>
      <Image
        style={styles.topGradientContainer}
        source={SAL.image.gradientBg}></Image>
      <NavigationBar navigationLeftButton={navigationLeftButton} />
      <View style={styles.dropdownContainer}>
        <Text style={styles.warehouseStaticText}>Status</Text>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select status', value: null}}
            items={pickerItems}
            onValueChange={handleValueChange}
            onClose={onClosePicker}
            value={selectedValue}
            useNativeAndroidPickerStyle={false}
            Icon={arrowDownIcon}
            style={pickerSelectStyle}
            darkTheme={isDark}
          />
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <View style={{height: 25}} />
        {selectedValue ? (
          assignmentList && assignmentList.length > 0 ? (
            <FlatList
              contentContainerStyle={{gap: scaleFactor(39), paddingBottom: 40}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={assignmentList}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <View style={styles.emptyListContainer}>
              {!loading && (
                <Text style={styles.noDataFoundText}>
                  {driverAssignmentApiError?.message || 'No data found'}
                </Text>
              )}
            </View>
          )
        ) : (
          <View style={styles.emptyListContainer}>
            {!loading && (
              <Text style={styles.noDataFoundText}>Please select status</Text>
            )}
          </View>
        )}
      </View>
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default DriverAssignmentScreen;
