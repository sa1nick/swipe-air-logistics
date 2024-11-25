import {StyleSheet} from 'react-native';
import SAL from '../../../SAL';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

const pickerWidth = SAL.constant.screenWidth - 32 - 100;

// Function to create styles dynamically based on the theme
export const createStyles = theme => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 10,
      justifyContent: 'space-between',
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    },
    topGradientContainer: {
      position: 'absolute',
      width: '100%',
      height: 398,
    },
    dropdownContainer: {
      marginHorizontal: 16,
      height: 50,
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
      borderRadius: 8,
      marginTop: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
    warehouseStaticText: {
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
      fontSize: scaleFactor(14),
      fontFamily: 'Rubik-Medium',
      marginLeft: 25,
      width: 77,
    },
    subDDContainer: {
      width: pickerWidth,
    },
    searchContainer: {
      height: 50,
      fontSize: 14,
      paddingHorizontal: scaleFactor(12),
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontFamily: 'Rubik-Regular',
      borderColor: 'transparent',
    },
    flatListContainer: {
      width: '100%',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      marginTop: 37,
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
      justifyContent: 'center',
      flex: 1,
    },

    flatListSubContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 30,
      marginHorizontal: 16,
      marginTop: 15,
    },
    emptyListContainer: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noDataFoundText: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: 16,
      fontFamily: 'Rubik-Medium',
    },
    countText: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
    },
  });
};

export const createPickerSelectStyles = theme => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    inputIOS: {
      width: pickerWidth,
      height: 50,
      color: isDark ? SAL.colors.white : '#9A9A9A',
      fontSize: 14,
      fontFamily: 'Rubik-Regular',
      paddingLeft: 20,
    },
    inputAndroid: {
      width: pickerWidth,
      height: 50,
      color: isDark ? SAL.colors.white : '#9A9A9A',
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
    placeholder: {
      color: isDark ? SAL.darkModeColors.tabInActive : '#9A9A9A',
    },
  });
};
