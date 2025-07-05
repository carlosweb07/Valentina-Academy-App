import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.darkOpaque,
    padding: metrics.padding,
    minHeight: height,
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    color: COLORS.dark,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: COLORS.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding,
  },
  btnText: {
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  center: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: typography.fontSize.xxlarge || 80,
    color: COLORS.primary,
  },
  timer: {
    fontSize: typography.fontSize.xxlarge,
    color: COLORS.dark,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  error: {
    color: COLORS.white,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    textAlign: 'center',
    marginVertical: metrics.padding,
  },
  results: {
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  percentage: {
    fontSize: typography.fontSize.xxlarge,
    color: COLORS.dark,
    marginVertical: metrics.padding,
  },
})
