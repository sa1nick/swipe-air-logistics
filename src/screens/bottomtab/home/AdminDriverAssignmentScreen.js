import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, Pressable, FlatList, Modal} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './AdminDriverAssignmentStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import DriverAssignmentCell from '../../cells/DriverAssignmentCell';
import BSConsignmentList from '../../../components/BSConsignmentList';
import BSRemindDriver from '../../../components/BSRemindDriver';
import BSAssignmentRejected from '../../../components/BSAssignmentRejected';

function AdminDriverAssignmentScreen(props) {
  const [showBS, setShowBS] = useState(false);
  const [showRemindDriver, setShowRemindDriver] = useState(false);
  const [showAssignmentRejected, setShowAssignmentRejected] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const pickerWidth = SAL.constant.screenWidth - 32 - 100;

  const pickerItems = [
    {label: 'Yet to Freeze', value: '0'},
    {label: 'Pending Acceptance', value: '1'},
    {label: 'Accepted', value: '2'},
    {label: 'Pickup Delayed', value: '3'},
    {label: 'In Transit', value: '4'},
    {label: 'Rejected', value: '5'},
  ];

  const statusColor = ['#0DBC93', '#15AEF2', '#0DBC93', '#9E8F05', '#0DBC93', '#FF3333']

  const handleValueChange = (value, index) => {
    setSelectedLabel(index ? pickerItems[index - 1].label : null);
    setSelectedValue(value);
  };

  const arrowDownIcon = () => (
    <View style={{marginRight: 20, height: 50, justifyContent: 'center'}}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  const showConsignmentButton = () => {
    setShowBS(true);
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
    setShowAssignmentRejected(false)
  };

  const renderItem = ({item, index}) => {
    return (
      <DriverAssignmentCell
        showConsignmentButton={showConsignmentButton}
        remindDriverButton={remindDriverButton}
        assignmentRejectedButton={assignmentRejectedButton}
        selectedValue={selectedValue}
        selectedLabel={selectedLabel}
        color={statusColor[parseInt(selectedValue)]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBS}
        onRequestClose={closeModalButton}>
        <BSConsignmentList close={closeModalButton} />
      </Modal>
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
      <NavigationBar />
      <View style={styles.dropdownContainer}>
        <Text style={styles.warehouseStaticText}>Status</Text>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select status', value: null}}
            items={pickerItems}
            onValueChange={handleValueChange}
            value={selectedValue}
            useNativeAndroidPickerStyle={false}
            Icon={arrowDownIcon}
            style={{
              inputIOS: {
                width: pickerWidth,
                height: 50,
                color: '#9A9A9A',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
                paddingLeft: 20,
              },
              inputAndroid: {
                width: pickerWidth,
                height: 50,
                color: '#9A9A9A',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
                paddingLeft: 20,
                paddingVertical: 5,
              },
              chevronDown: {
                display: 'none',
              },
              chevronUp: {
                display: 'none',
              },
            }}
          />
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <View style={{height: 25}} />
        <FlatList data={['1', '2', '3']} renderItem={renderItem} />
      </View>
    </View>
  );
}

export default AdminDriverAssignmentScreen;
