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
    height: 398
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
    width: '100%',
    height: SAL.constant.screenHeight - 250,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 37,
    backgroundColor: SAL.colors.white,
    justifyContent: 'space-between'
  },
});
