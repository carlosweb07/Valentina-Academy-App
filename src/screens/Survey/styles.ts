import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkOpaque,
    padding: metrics.padding,
    minHeight: height,
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    color: colors.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    color: colors.dark,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: colors.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding,
  },
  btnText: {
    color: colors.primary,
    fontSize: typography.fontSize.normal,
  },
  center: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: typography.fontSize.xxlarge || 80,
    color: colors.primary,
  },
  timer: {
    fontSize: typography.fontSize.xxlarge,
    color: colors.dark,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  error: {
    color: colors.white,
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
    color: colors.dark,
    marginVertical: metrics.padding,
  },
})
