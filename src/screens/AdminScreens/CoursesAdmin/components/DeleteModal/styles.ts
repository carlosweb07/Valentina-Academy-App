// src/modules/admin/components/DeleteCourseModal/styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  statusText: {
    marginTop: metrics.padding,
    color: colors.primary,
    fontSize: typography.fontSize.normal,
  },
  content: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  header: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginHorizontal: metrics.padding * 0.5,
  },
  cancelBtn: {
    backgroundColor: colors.darkOpaque,
  },
  deleteBtn: {
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
