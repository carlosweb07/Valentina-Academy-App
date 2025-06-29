// src/modules/Course/components/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')
const CATEGORY_HEIGHT = height * 0.25
const CATEGORY_WIDTH = width * 0.45

export default StyleSheet.create({
  header: {
    backgroundColor: colors.darkOpaque,
    paddingBottom: metrics.padding,
  },
  headerInfo: {
    paddingLeft: metrics.padding,
    paddingTop: height * 0.15,
  },
  greeting: {
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xxlarge,
    marginBottom: metrics.padding * 0.5,
  },
  subTitle: {
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    lineHeight: typography.fontSize.normal * 1.4,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: metrics.padding,
  },
  category: {
    width: CATEGORY_WIDTH,
    height: CATEGORY_HEIGHT,
    borderRadius: metrics.borderRadius,
    overflow: 'hidden',
  },
  imgContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryMoreOpaqueVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.large,
    backgroundColor: colors.dark + 'CC', // semi-transparente
    paddingHorizontal: metrics.padding * 0.3,
    paddingVertical: metrics.padding * 0.1,
    borderRadius: metrics.borderRadius * 0.5,
  },
})
