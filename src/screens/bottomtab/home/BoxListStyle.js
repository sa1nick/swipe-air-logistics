import {StyleSheet} from 'react-native';

import SAL from '../../../SAL';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

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
    fontSize: scaleFactor(16),
    fontFamily: 'Rubik-Medium',
    marginTop: 5,
  },
  totalBoxWeigthContainer: {
    marginHorizontal: 16,
    height: 92,
    borderRadius: 10,
    marginTop: scaleFactor(15),
    flexDirection: 'row',
    marginBottom: 10,
  },
  totalQuantityContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: SAL.colors.white,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    marginTop: 3,
  },
  separator: {
    width: 1,
    marginVertical: 17,
    backgroundColor: SAL.colors.white,
  },
  createContainer: {
    height: 45,
    borderColor: SAL.colors.orange,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '48%',
  },
  createButtonText: {
    color: SAL.colors.orange,
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
  buttonSeparator: {
    width: 1,
    marginVertical: 12,
    backgroundColor: SAL.colors.orange,
  },
  emptyListContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataFoundText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
});
