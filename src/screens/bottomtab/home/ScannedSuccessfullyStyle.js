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
  boxContainer: {
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 30,
    backgroundColor: SAL.colors.white,
    alignItems: 'center'
  },
  reportErrorButton: {
    width: 98,
    height: 32,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignSelf: 'flex-end',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 20
  },
  reportErrorText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: -10,
    borderRadius: 4,
    alignSelf: 'center'
  },
  countText: {
    color: SAL.colors.tabColor,
    fontSize: 14,
    fontFamily: 'Rubik-SemiBold',
  },
  dotContainer: {
    marginTop: 21,
    width: 50,
    height: 6,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dotView: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SAL.colors.tabColor
  },
  successImage: {
    marginTop: 35
  },
  scannedText: {
    marginTop: 13,
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-SemiBold',
  },
  barContainer: {
    marginTop: 6,
    borderRadius: 8,
    width: 158,
    height: 158
  },
  noteTex: {
    color: '#878787',
    fontSize: 13,
    fontFamily: 'Rubik-Italic',
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 27
  }
});
