// src/modules/admin/components/DeleteIngredientModal/styles.ts
import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    marginTop: metrics.padding,
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  container: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  header: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: metrics.padding,
  },
  button: {
    flex: 1,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginHorizontal: metrics.padding * 0.5,
  },
  cancel: {
    backgroundColor: COLORS.darkOpaque,
  },
  delete: {
    backgroundColor: COLORS.error,
  },
  btnText: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  cancelText: {
    color: COLORS.primary,
  },
  deleteText: {
    color: COLORS.white,
  },
})