import {StyleSheet, Platform, Appearance} from 'react-native';

import SAL from '../../../SAL';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

const colorScheme = Appearance.getColorScheme();

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    // opacity: 0.7,
  },

  topGradientContainer: {
    position: 'absolute',
    width: '100%',
    height: 398,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    height: 50,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    borderRadius: 8,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warehouseStaticText: {
    color:
      colorScheme === 'dark'
        ? SAL.darkModeColors.purpleF0C3F4
        : SAL.colors.purple,
    fontSize: scaleFactor(14),
    fontFamily: 'Rubik-Medium',
    marginLeft: 25,
    // width: SAL.constant.screenWidth - 500,
    width: 77,
  },
  subDDContainer: {
    width: SAL.constant.screenWidth - 32 - 100,
    // height: 50,
  },

  searchContainer: {
    height: 50,
    fontSize: 14,
    paddingLeft: scaleFactor(10),
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontFamily: 'Rubik-Regular',
  },

  flatlistContainer: {
    width: '100%',
    // height:
    //   SAL.constant.screenHeight -
    //   (Platform.OS === 'ios'
    //     ? SAL.constant.screenHeight * 0.45
    //     : SAL.constant.screenHeight * 0.42),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 37,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    justifyContent: 'center',
    flex: 1,
  },
  emptyListContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  countText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
});

const pickerWidth = SAL.constant.screenWidth - 32 - 100;

export const pickerSelectStyles = StyleSheet.create({
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
});
