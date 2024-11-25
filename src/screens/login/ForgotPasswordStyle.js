import {Platform, StyleSheet} from 'react-native';

import SAL from '../../SAL';

export const ForgotPasswordStyle = isDark => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
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
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
      alignItems: 'center',
    },
    headingText: {
      color: isDark ? SAL.colors.white : SAL.colors.black,
      fontSize: 18,
      fontFamily: 'Rubik-Medium',
      marginTop: 45,
    },
    subHeadingText: {
      color: isDark ? SAL.darkModeColors.tabInActive : '#676767',
      fontSize: 14,
      fontFamily: 'Rubik-Regular',
      marginTop: 12,
      marginBottom: 35,
      marginHorizontal: 27,
      textAlign: 'center',
    },
    backButton: {
      position: 'absolute',
      marginTop: Platform.OS === 'ios' ? 60 : 30,
      marginLeft: 16,
    },
  });
};

export default ForgotPasswordStyle;
