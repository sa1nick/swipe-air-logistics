import React, {useMemo, useRef, useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Appearance,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import SAL from '../SAL';
const colorScheme = Appearance.getColorScheme();

const Dimensions = props => {
  const arrowDownIcon = () => (
    <View style={styles.arrownDownContainer}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  return (
    <ScrollView
      style={styles.commonContainer}
      contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width: 70, justifyContent: 'space-evenly'}}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.unitText}>{props.unit}</Text>
        {/* <RNPickerSelect
          placeholder={{label: 'Select', value: null}}
          items={props.items}
          onValueChange={props.handleValueChange}
          value={props.selectedValue}
          useNativeAndroidPickerStyle={false}
          Icon={arrowDownIcon}
          style={pickerSelectStyles}
        /> */}
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.inputField}
        placeholder={'Enter value here'}
        value={props.value}
        placeholderTextColor={
          colorScheme === 'dark'
            ? SAL.darkModeColors.tabInActive
            : SAL.colors.grey
        }
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        editable={props.enabled ? true : false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commonContainer: {
    // flex:1,
    width: SAL.constant.screenWidth - 32,
    height: 50,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    borderRadius: 12,
    marginLeft: 16,
    marginBottom: 22,
    borderWidth: 0.5,
    borderColor: '#B5B5B5',
    flexDirection: 'row',
  },
  titleText: {
    marginLeft: 15,
    color:
      colorScheme === 'dark' ? SAL.darkModeColors.tabInActive : SAL.colors.grey,
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
  },
  unitText: {
    marginLeft: 15,
    color:
      colorScheme === 'dark'
        ? SAL.darkModeColors.purpleF0C3F4
        : SAL.colors.purple,
    fontFamily: 'Rubik-Medium',
    fontSize: 14,
  },
  arrownDownContainer: {
    height: 50,
    justifyContent: 'center',
    paddingTop: 18,
  },
  separator: {
    width: 1,
    height: 50,
    marginLeft: 15,
    backgroundColor:
      colorScheme === 'dark' ? SAL.darkModeColors.tabInActive : SAL.colors.grey,
  },
  inputField: {
    width: 200,
    height: '100%',
    marginLeft: 23,
    color: '#9A9A9A',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 70,
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 15,
    paddingTop: 16,
  },
  inputAndroid: {
    width: 70,
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 15,
    paddingTop: 16,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});

export default Dimensions;
