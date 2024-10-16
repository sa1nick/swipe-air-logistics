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
    height: 260,
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
    alignItems: 'center',
  },
  fromText: {
    color: SAL.colors.white,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 5,
  },
  headerContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginBottom: 10,
  },
  childContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  boxIcon: {
    marginTop: 5,
    width: 26,
    height: 22,
  },
  boxTitle: {
    color: '#8A8A8A',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  boxIdText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 3,
  },
});
