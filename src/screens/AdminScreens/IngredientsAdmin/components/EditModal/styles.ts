// src/modules/admin/components/EditIngredientModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../../constants/colors'
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
    color: colors.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: colors.darkMoreOpaque,
    color: colors.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
  },
  picker: {
    width: INPUT_WIDTH,
    backgroundColor: colors.darkMoreOpaque,
    color: colors.primary,
    marginVertical: metrics.padding * 0.5,
  },
  button: {
    width: INPUT_WIDTH,
    padding: metrics.padding,
    backgroundColor: colors.primary,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  btnText: {
    color: colors.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  error: {
    color: colors.error,
    marginBottom: metrics.padding,
  },
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    color: colors.primary,
    marginTop: metrics.padding,
  },
})
