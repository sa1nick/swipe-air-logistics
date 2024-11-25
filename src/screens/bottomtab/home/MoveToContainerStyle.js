import {StyleSheet} from 'react-native';
import SAL from '../../../SAL';
import useCustomTheme from '../../../hook/useCustomTheme';

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme === 'dark' ? SAL.darkModeColors.black22262A : SAL.colors.white,
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
      backgroundColor:
        theme === 'dark' ? SAL.darkModeColors.black22262A : SAL.colors.white,
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
    createButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: '48%',
      height: 45,
      borderColor:
        theme === 'dark' ? SAL.darkModeColors.orangeFFC8A3 : SAL.colors.orange,
      borderWidth: 1,
      borderRadius: 30,
      alignSelf: 'center',
      bottom: 50,
    },
    createButtonText: {
      color:
        theme === 'dark' ? SAL.darkModeColors.orangeFFC8A3 : SAL.colors.orange,
      fontSize: 12,
      fontFamily: 'Rubik-Medium',
      marginLeft: 10,
    },
    emptyListContainer: {
      marginTop: 30,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      backgroundColor:
        theme === 'dark' ? SAL.darkModeColors.black22262A : SAL.colors.white,
    },
    noDataFoundText: {
      color: theme === 'dark' ? SAL.colors.white : SAL.colors.black,
      fontSize: 16,
      fontFamily: 'Rubik-Medium',
      marginHorizontal: 20,
      textAlign: 'center',
      alignSelf: 'center',
    },
  });

export default function moveToContainerStyle() {
  const theme = useCustomTheme();
  return createStyles(theme);
}
