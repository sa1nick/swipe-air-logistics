import SAL from '../SAL';

export function scaleFactor(val) {
  let scaleVal = 0;
  scaleVal = val * (SAL.constant.screenWidth / 414);
  return scaleVal;
}
