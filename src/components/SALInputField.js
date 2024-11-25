import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import SAL from '../SAL';
import useCustomTheme from '../hook/useCustomTheme';

const SALInputField = props => {
  const theme = useCustomTheme(); // Get current theme
  const isDark = theme === 'dark'; // Check if the theme is dark or light

  // Dynamically define styles based on theme
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 70,
      marginTop: 10,
    },
    subContainer: {
      height: 42,
      paddingLeft: 10,
      marginHorizontal: '6%',
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: isDark ? SAL.darkModeColors.tabInActive : '#B5B5B5',
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    },
    titleText: {
      color: isDark ? SAL.colors.white : SAL.colors.grey,
      fontSize: 14,
      fontFamily: 'Rubik-Regular',
      marginBottom: 5,
      marginHorizontal: '6%',
    },
    inputField: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontFamily: 'Rubik-Regular',
      fontSize: 14,
      height: 42,
    },
  });

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.titleText}>{props.title}</Text>
      <View style={[styles.subContainer, props.inputStyle]}>
        <TextInput
          ref={props.inputRef}
          style={[styles.inputField, props.inputStyle]}
          placeholder={props.placeholderText}
          placeholderTextColor={
            isDark ? SAL.darkModeColors.tabInActive : SAL.colors.grey
          }
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          value={props.value}
          tintColor={SAL.colors.black}
          autoCapitalize="none"
          selectionColor={
            isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple
          }
        />
      </View>
    </View>
  );
};

export default SALInputField;
