import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'
const { width } = Dimensions.get('window')
const INPUT_W = width * 0.85

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  header: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginBottom: metrics.padding,
  },
  input: {
    width: INPUT_W,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.white,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
  },
  button: {
    width: INPUT_W,
    backgroundColor: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  btnText: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
  },
  error: {
    color: COLORS.error,
    marginBottom: metrics.padding,
  },
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    marginTop: metrics.padding,
    color: COLORS.primary,
  },
})
