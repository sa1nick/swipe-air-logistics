import {StyleSheet} from 'react-native';

import SAL from '../../../SAL';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SAL.colors.white,
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
    backgroundColor: SAL.colors.white,
    justifyContent: 'space-between',
  },
  selectStatus: {
    color: SAL.colors.black,
    fontSize: 16,
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