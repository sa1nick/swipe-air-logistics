import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SAL from '../SAL';
import useCustomTheme from '../hook/useCustomTheme';

const Dimensions = props => {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const arrowDownIcon = () => (
    <View style={styles.arrownDownContainer}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  const styles = StyleSheet.create({
    commonContainer: {
      // flex:1,
      width: SAL.constant.screenWidth - 32,
      height: 50,
      backgroundColor: isDark
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
      color: isDark ? SAL.darkModeColors.tabInActive : SAL.colors.grey,
      fontFamily: 'Rubik-Regular',
      fontSize: 14,
    },
    unitText: {
      marginLeft: 15,
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
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
      backgroundColor: isDark
        ? SAL.darkModeColors.tabInActive
        : SAL.colors.grey,
    },
    inputField: {
      width: 200,
      height: '100%',
      marginLeft: 23,
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontFamily: 'Rubik-Regular',
      fontSize: 14,
    },
  });

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
          isDark ? SAL.darkModeColors.tabInActive : SAL.colors.grey
        }
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        editable={props.enabled ? true : false}
        selectionColor={
          isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple
        }
      />
    </ScrollView>
  );
};

export default Dimensions;
