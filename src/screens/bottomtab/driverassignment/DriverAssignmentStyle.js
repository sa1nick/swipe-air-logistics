import {Appearance, StyleSheet} from 'react-native';

import SAL from '../../../SAL';

const colorScheme = Appearance.getColorScheme();

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      colorScheme === 'dark'
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
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 25,
    width: 75,
  },
  subDDContainer: {
    width: SAL.constant.screenWidth - 32 - 100,
    height: 50,
  },
  flatlistContainer: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 37,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    justifyContent: 'space-between',
  },
  selectStatus: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  emptyListContainer: {
    height: SAL.constant.screenHeight * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
});

const pickerWidth = SAL.constant.screenWidth - 32 - 100;

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: pickerWidth,
    height: 50,
    color: colorScheme === 'dark' ? SAL.darkModeColors.tabInActive : '#9A9A9A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 20,
  },
  inputAndroid: {
    width: pickerWidth,
    height: 50,
    color: colorScheme === 'dark' ? SAL.darkModeColors.tabInActive : '#9A9A9A',
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
