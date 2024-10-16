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
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subDDContainer: {
    width: '47%',
    height: 50,
    backgroundColor: SAL.colors.white,
    borderRadius: 8
  },
  flatlistContainer: {
    width: '100%',
    height: SAL.constant.screenHeight - 350,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 37,
    backgroundColor: SAL.colors.white,
    justifyContent: 'space-between'
  },
  noteText: {
    marginHorizontal: 30,
    marginVertical: 25,
    color: '#878787',
    fontSize: 13,
    fontFamily: 'Rubik-Italic',
    textAlign: 'center'
  },
  createBoxButton: {
    width: 160,
    height: 44,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  createBoxText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10
  },
  flatlistContainer1: {
    width: '100%',
    height: SAL.constant.screenHeight - 350,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 30,
    backgroundColor: SAL.colors.white,
    justifyContent: 'space-between'
  },
  moveToWarehouseButton: {
    width: 170,
    height: 45,
    borderRadius: 22,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveToWarehouseText: {
    color: SAL.colors.white,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
  },
  locationContainer: {
    marginTop: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromToContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fromText: {
    color: SAL.colors.white,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 5,
  },
});