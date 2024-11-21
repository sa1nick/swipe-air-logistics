import {StyleSheet, Platform, Appearance} from 'react-native';

import SAL from '../../SAL';
const colorScheme = Appearance.getColorScheme();
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    alignItems: 'center',
  },
  topBackgroundContainer: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    backgroundColor: SAL.colors.purple,
  },
  linearGradient: {
    width: '100%',
    height: 398,
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
    backgroundColor:
      colorScheme === 'dark'
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
  },
  saLogo: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
  },
  headingText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    marginTop: 30,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
  },
  loginAsText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginTop: 30,
  },
  loginAsButton: {
    width: 110,
    height: 35,
    borderRadius: 20,
    borderColor: '#570E67',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  loginTypeText: {
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
  forgotPasswordContainer: {
    height: 27,
    width: '88%',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#F59D9D',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  loginButton: {
    width: 150,
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: SAL.colors.white,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 35,
    borderRadius: 20,
    borderColor: '#570E67',
    borderWidth: 0.5,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
    paddingRight: 40,
  },
  inputAndroid: {
    height: 35,
    borderRadius: 20,
    borderColor: '#570E67',
    borderWidth: 0.5,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 5,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});
