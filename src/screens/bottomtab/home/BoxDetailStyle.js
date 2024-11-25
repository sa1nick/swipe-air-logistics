import {StyleSheet} from 'react-native';

import SAL from '../../../SAL';

const BoxDetailStyle = isDark => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
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
      // borderWidth: 1,
    },
    fromText: {
      color: SAL.colors.white,
      fontSize: 14,
      fontFamily: 'Rubik-Medium',
      marginTop: 5,
    },
    headerContainer: {
      backgroundColor: isDark
        ? SAL.darkModeColors.black22262A
        : SAL.colors.white,
      // paddingBottom: 10,
      // marginTop: 50,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      // marginBottom: 50,
      // borderWidth: 1,
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
      color: isDark ? SAL.darkModeColors.tabInActive : '#8A8A8A',
      // fontSize: 14,
      fontFamily: 'Rubik-Regular',
    },
    boxIdText: {
      color: isDark ? SAL.colors.white : '#000000',
      // fontSize: 14,
      fontFamily: 'Rubik-Medium',
      marginTop: 3,
    },
  });
};

export default BoxDetailStyle;
