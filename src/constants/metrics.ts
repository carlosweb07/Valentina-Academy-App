// src/constants/metrics.ts
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  padding: width * 0.05,
  modalWidth: Math.min(600, width * 0.9),
  modalMaxHeight: Math.min(400, height * 0.6),
  borderRadius: 10,
  fontBase: width * 0.045,
};
