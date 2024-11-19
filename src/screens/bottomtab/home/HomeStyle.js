import {StyleSheet, Platform} from 'react-native';

import SAL from '../../../SAL';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: SAL.colors.white,
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
    backgroundColor: SAL.colors.white,
    borderRadius: 8,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warehouseStaticText: {
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 25,
    width: scaleFactor(75),
  },
  subDDContainer: {
    width: SAL.constant.screenWidth - 32 - 100,
    // height: 50,
  },

  searchContainer: {
    height: 50,
    width: SAL.constant.screenWidth - 32,
    marginLeft: 15,
    fontSize: 14,
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
    backgroundColor: SAL.colors.white,
    justifyContent: 'center',
    flex: 1,
  },
  emptyListContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  countText: {
    color: SAL.colors.black,
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
