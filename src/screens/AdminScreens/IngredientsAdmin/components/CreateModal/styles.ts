// src/modules/admin/components/CreateIngredientModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width } = Dimensions.get('window')
const INPUT_WIDTH = width * 0.85

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  header: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
  },
  picker: {
    width: INPUT_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    marginVertical: metrics.padding * 0.5,
  },
  button: {
    width: INPUT_WIDTH,
    padding: metrics.padding,
    backgroundColor: COLORS.primary,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  btnText: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
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
    color: COLORS.primary,
    marginTop: metrics.padding,
  },
})
