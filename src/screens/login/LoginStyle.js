import {Platform, StyleSheet} from 'react-native';

import SAL from '../../SAL';

export const LoginStyle = isDark => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
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
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
    },
    saLogo: {
      marginTop: Platform.OS === 'ios' ? 60 : 30,
    },
    headingText: {
      color: SAL.colors.white,
      marginTop: 30,
      marginBottom: 16,
      fontSize: 18,
      fontFamily: 'Rubik-Medium',
    },
    loginAsText: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: 18,
      fontFamily: 'Rubik-Medium',
      marginTop: 30,
    },
    loginAsButton: {
      width: 110,
      height: 35,
      borderRadius: 20,
      borderColor: isDark
        ? SAL.darkModeColors.purpleEEC5F7
        : SAL.colors.purple570E67,
      borderWidth: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 20,
    },
    loginTypeText: {
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
    },

    inputStyle: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
    },

    forgotPasswordContainer: {
      height: 27,
      width: '88%',
      alignItems: 'flex-end',
      marginTop: 5,
    },
    forgotPasswordText: {
      color: isDark ? SAL.darkModeColors.redF9C8C8 : '#F59D9D',
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
};

export const pickerSelectStyles = isDark => {
  return StyleSheet.create({
    inputIOS: {
      height: 35,
      borderRadius: 20,
      borderColor: isDark
        ? SAL.darkModeColors.purpleEEC5F7
        : SAL.colors.purple570E67,
      borderWidth: 0.5,
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
      paddingLeft: 20,
      paddingRight: 40,
    },
    inputAndroid: {
      height: 35,
      borderRadius: 20,
      borderColor: isDark
        ? SAL.darkModeColors.purpleEEC5F7
        : SAL.colors.purple570E67,
      borderWidth: 0.5,
      color: isDark ? SAL.darkModeColors.purpleF0C3F4 : SAL.colors.purple,
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
    placeholder: {
      color: isDark ? SAL.darkModeColors.tabInActive : '',
    },
  });
};
