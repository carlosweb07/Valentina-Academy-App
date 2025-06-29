// src/modules/Course/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../constants/colors'
import { typography } from '../../../../constants/typography'
import { metrics } from '../../../../constants/metrics'

const { width, height } = Dimensions.get('window')
const VIDEO_HEIGHT = width * 0.5625

export default StyleSheet.create({
  container: {
    paddingBottom: metrics.padding,
    backgroundColor: colors.darkOpaque,
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    backgroundColor: colors.darkOpaque,
    paddingTop: metrics.padding * 3,
    alignItems: 'center',
  },
  videoSkeleton: {
    width: '60%',
    height: VIDEO_HEIGHT,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding,
    borderWidth: 10,
    borderColor: colors.skeletonLight,
    backgroundColor: colors.skeletonDark,
  },
  detailsSection: {
    width: '100%',
    backgroundColor: colors.darkOpaque,
    padding: metrics.padding,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: metrics.padding * 2,
  },
  detailBlock: {
    backgroundColor: colors.skeletonDark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
  },
  titleSkeleton: {
    width: '100%',
    height: typography.fontSize.xlarge,
    borderRadius: metrics.borderRadius,
  },
  descSkeleton: {
    width: '100%',
    height: typography.fontSize.normal,
    marginTop: metrics.padding,
    borderRadius: metrics.borderRadius,
  },
  authorContainerSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  authorImgSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.skeletonLight,
  },
  authorNameSkeleton: {
    width: '30%',
    height: typography.fontSize.normal,
    marginLeft: metrics.padding,
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.skeletonLight,
  },
  pdfContainerSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.padding,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.skeletonLight,
  },
  pdfIconSkeleton: {
    width: 50,
    height: 50,
    marginRight: metrics.padding,
    backgroundColor: colors.skeletonDark,
  },
  pdfTextSkeleton: {
    width: '40%',
    height: typography.fontSize.normal,
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.skeletonDark,
  },
  recipeSkeleton: {
    backgroundColor: colors.skeletonDark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
  },
  recipeTitleSkeleton: {
    width: '100%',
    height: typography.fontSize.large,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
  },
  recipeDescSkeleton: {
    width: '60%',
    height: typography.fontSize.normal,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding * 1.5,
  },
  recipeContainerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipePart: {
    backgroundColor: 'transparent',
  },
  recipeSectionTitleSkeleton: {
    width: '100%',
    height: typography.fontSize.large,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
  },
  listItemSkeleton: {
    width: '100%',
    height: typography.fontSize.normal * 0.6,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding * 0.5,
    backgroundColor: colors.skeletonLight,
  },
})
