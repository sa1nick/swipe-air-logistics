import {Appearance, StyleSheet} from 'react-native';

import SAL from '../../../SAL';

const colorScheme = Appearance.getColorScheme();

const BoxDimensionStyle = isDark => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === 'dark'
          ? SAL.darkModeColors.black22262A
          : SAL.colors.white,
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
      flex: 1,
      width: '100%',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      marginTop: 30,
      backgroundColor:
        colorScheme === 'dark'
          ? SAL.darkModeColors.black22262A
          : SAL.colors.white,
    },
    dimensionContainer: {
      marginHorizontal: 16,
      height: 60,
      flexDirection: 'row',
      marginTop: 22,
    },
    boxDimensionText: {
      color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
      fontSize: 18,
      fontFamily: 'Rubik-Medium',
      marginLeft: 15,
      marginTop: -3,
      marginBottom: 4,
    },
    itemSelectedText: {
      color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
      fontSize: 16,
      fontFamily: 'Rubik-Regular',
      marginLeft: 15,
    },
    subDDContainer: {
      width: SAL.constant.screenWidth - 32,
      height: 50,
      borderRadius: 12,
      marginLeft: 16,
      marginTop: 10,
      marginBottom: 22,
      borderWidth: 0.5,
      borderColor: '#B5B5B5',
    },
  });
};

export default BoxDimensionStyle;
