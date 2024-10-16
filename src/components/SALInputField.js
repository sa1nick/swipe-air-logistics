import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import SAL from '../SAL';

const SALInputField = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.title}</Text>
      <View style={styles.subContainer}>
        <TextInput
          ref={props.inputRef}
          style={styles.inputField}
          placeholder={props.placeholderText}
          placeholderTextColor={SAL.colors.black}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          value={props.value}
          tintColor={SAL.colors.black}
          autoCapitalize="none"
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
