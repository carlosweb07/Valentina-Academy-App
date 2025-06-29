// src/modules/admin/components/DeleteSurveyModal/styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    marginTop: metrics.padding,
    color: colors.primary,
    fontSize: typography.fontSize.normal,
  },
  container: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  header: {
    fontSize: typography.fontSize.large,
    color: colors.primary,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
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
    backgroundColor: colors.darkOpaque,
  },
  delete: {
    backgroundColor: colors.error,
  },
  btnText: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  cancelText: {
    color: colors.primary,
  },
  deleteText: {
    color: colors.light,
  },
})
