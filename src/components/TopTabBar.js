import React from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';

import SAL from '../SAL';
const TopTabBar = ({selectedIndex, onTabPress, tabsArray}) => {
  return (
    <View style={{height: 40}}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}>
        {tabsArray.map((buttonText, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => onTabPress(index)}>
              <Text
                style={{
                  color:
                    index === selectedIndex
                      ? SAL.colors.tabColor
                      : SAL.colors.grey,
                  fontSize: 14,
                  fontFamily:
                    index === selectedIndex ? 'Rubik-Medium' : 'Rubik-Regular',
                }}>
                {buttonText}
              </Text>
              <View
                style={{
                  height: 2,
                  backgroundColor:
                    index === selectedIndex
                      ? SAL.colors.tabColor
                      : SAL.colors.white,
                  marginTop: 10,
                }}
              />
            </Pressable>
            {index < tabsArray.length - 1 ? (
              <View style={styles.separator}></View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    height: 30,
    marginHorizontal: 16,
  },
  separator: {
    width: 1,
    height: 10,
    marginTop: 4,
    backgroundColor: SAL.colors.grey,
  },
});

export default TopTabBar;
