// src/modules/Course/screens/skeletonStyles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../constants/colors'
import { metrics } from '../../../../constants/metrics'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    padding: metrics.padding,
    backgroundColor: colors.primaryOpaque,
    alignItems: 'center',
  },
  detailsSkeleton: {
    width: '100%',
    height: 200,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
    backgroundColor: colors.skeletonDark,
  },
  imageSkeleton: {
    width: '100%',
    height: width * 0.6,
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.skeletonDark,
  },
})
