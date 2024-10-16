import {StyleSheet, Platform} from 'react-native';

import SAL from '../../SAL';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SAL.colors.white,
  },
  linearGradient: {
    width: '100%',
    height: 398,
    alignItems: 'center',
  },
  saLogo: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
  },
  bottomContainer: {
    width: '100%',
    height: SAL.constant.screenHeight - 400,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 50,
    backgroundColor: SAL.colors.white,
    alignItems: 'center'
  },
  headingText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 45,
  },
  subHeadingText: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginTop: 12,
    marginBottom: 35,
    marginHorizontal: 27,
    textAlign: "center"
  },
  backButton: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    marginLeft: 16
  }
});
