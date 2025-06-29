import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.9
const IMAGE_HEIGHT = metrics.screenHeight * 0.25

export default StyleSheet.create({
  cardSkeleton: {
    width: CARD_WIDTH,
    borderRadius: metrics.borderRadius * 2,
    overflow: 'hidden',
    marginVertical: metrics.padding,
  },
  imgContainer: {
    padding: metrics.padding * 0.5,
    backgroundColor: colors.skeletonLight, // sólo para fallback
    borderTopLeftRadius: metrics.borderRadius * 2,
    borderTopRightRadius: metrics.borderRadius * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSkeleton: {
    width: '30%',
    height: IMAGE_HEIGHT * 0.5,
    borderRadius: metrics.borderRadius,
  },
  infoSkeleton: {
    padding: metrics.padding * 0.5,
    backgroundColor: colors.skeletonDark, // fallback
    minHeight: IMAGE_HEIGHT * 0.45,
  },
  titleSkeleton: {
    width: '100%',
    height: typography.fontSize.large,
    borderRadius: metrics.borderRadius * 1.5,
    marginBottom: metrics.padding,
  },
  descriptionSkeleton: {
    width: '100%',
    height: typography.fontSize.normal * 0.6,
    borderRadius: metrics.borderRadius * 1.5,
    marginTop: metrics.padding * 0.3,
  },
})
