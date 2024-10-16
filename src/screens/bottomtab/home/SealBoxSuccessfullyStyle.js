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
    height: 263,
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
  successImage: {
    alignSelf: 'center',
    marginTop: 50,
  },
  headingText: {
    color: SAL.colors.black,
    fontSize: 18,
    fontFamily: 'Rubik-SemiBold',
    marginTop: 13,
    alignSelf: 'center'
  },
  infoBarContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21
  },
  boxContainer: {
    width: '60%',
    marginBottom: 20,
    marginLeft: 11,
  },
  itemSelectedText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    marginTop: 5
  },
  pdfContainer: {
    width: '90%',
    height: 50,
    borderRadius: 8,
    marginTop: 18,
    backgroundColor: SAL.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#FFBC8E',
    borderWidth: 0.5,
    marginLeft: '5%'
  },
  pdfNameContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfNameText: {
    color: SAL.colors.black,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    marginLeft: 5,
  },
  printTex: {
    color: '#878787',
    fontSize: 13,
    fontFamily: 'Rubik-Italic',
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 27,
    marginBottom: 50
  }
});
