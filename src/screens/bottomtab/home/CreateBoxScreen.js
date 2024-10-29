import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './CreateBoxStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import OrderCreateBoxCell from '../../cells/OrderCreateBoxCell';

function CreateBoxScreen(props) {
  const [selectFrom, setSelectFrom] = useState(null);
  const [selectTo, setSelectTo] = useState(null);

  const [showBS, setShowBS] = useState(false);

  const pickerItems = [
    {label: 'New York', value: '0'},
    {label: 'California', value: '1'},
    {label: 'Florida', value: '2'},
  ];

  const arrowDownIcon = () => (
    <View style={{marginRight: 20, height: 50, justifyContent: 'center'}}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  const handleSelectFromValueChange = value => {
    setSelectFrom(value);
  };

  const handleSelectToValueChange = value => {
    setSelectTo(value);
  };

  const renderItem = ({item, index}) => {
    return <OrderCreateBoxCell />;
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar />
      <View style={styles.dropdownContainer}>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select From', value: null}}
            items={pickerItems}
            onValueChange={handleSelectFromValueChange}
            value={selectFrom}
            useNativeAndroidPickerStyle={false}
            Icon={arrowDownIcon}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.subDDContainer}>
          <RNPickerSelect
            placeholder={{label: 'Select To', value: null}}
            items={pickerItems}
            onValueChange={handleSelectToValueChange}
            value={selectTo}
            useNativeAndroidPickerStyle={false}
            Icon={arrowDownIcon}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <Text style={styles.noteText}>
          Note: Select warehouse movement to create box/pallet/container
        </Text>
        <FlatList data={['1', '2', '3']} renderItem={renderItem} />
      </View>
      <Pressable
        style={styles.createBoxButton}
        onPress={() => {
          props.navigation.navigate('Parcel');
        }}>
        <Image source={SAL.image.createBox} />
        <Text style={styles.createBoxText}>Create Box</Text>
      </Pressable>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
    paddingVertical: 5,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});

export default CreateBoxScreen;
