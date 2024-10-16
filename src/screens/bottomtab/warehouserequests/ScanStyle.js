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
    backgroundColor: SAL.colors.purple,
  },
  cameraContainer: {
    width: '100%',
    height: SAL.constant.screenHeight,
    position: 'absolute',
    marginTop: 80
  }
});
