// src/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkOpaque,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: metrics.padding,
  },
  carouselContainer: {
    width,
  },
  section: {
    width: '90%',
    marginVertical: metrics.padding,
    backgroundColor: colors.primaryOpaque,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
  },
  heading: {
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding * 0.5,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: colors.white,
    lineHeight: typography.fontSize.normal * 1.4,
    textAlign: 'justify',
  },
  list: {
    marginTop: metrics.padding * 0.5,
    paddingLeft: metrics.padding,
  },
  listItem: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: colors.white,
    marginVertical: metrics.padding * 0.2,
  },
  finalSection: {
    width: '90%',
    marginVertical: metrics.padding * 2,
    alignItems: 'center',
  },
  finalHeading: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: metrics.padding,
  },
  finalSubheading: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: colors.white,
    textAlign: 'center',
  },
})
