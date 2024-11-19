import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet, useColorScheme} from 'react-native';
import SAL from '../SAL';

const SALInputField = (props, {placeholderTextColor = SAL.colors.black}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.titleText}>{props.title}</Text>
      <View style={[styles.subContainer, props.inputStyle]}>
        <TextInput
          ref={props.inputRef}
          style={[
            styles.inputField,
            {borderBottomWidth: 0, borderBottomColor: '#1212', padding: 0},
            props.inputStyle,
          ]}
          placeholder={props.placeholderText}
          placeholderTextColor={props.placeholderTextColor}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          value={props.value}
          tintColor={SAL.colors.black}
          autoCapitalize="none"
          // underlineColorAndroid={
          //   colorScheme === 'dark' ? '#1111' : 'transparent'
          // }
          // underlineColorAndroid={colorScheme === 'dark' ? '#1111' : null}

          selectionColor={SAL.colors.purple}
        />
      </View>
    </View>
  );
};

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
    borderColor: '#B5B5B5',
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    color: '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginBottom: 5,
    marginHorizontal: '6%',
  },
  inputField: {
    color: SAL.colors.black,
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    height: 42,
  },
});

export default SALInputField;
