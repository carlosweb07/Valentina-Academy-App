// src/modules/admin/components/EditCourseModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width } = Dimensions.get('window')
const INPUT_WIDTH = width * 0.85

export default StyleSheet.create({
  header: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  statusText: {
    marginTop: metrics.padding,
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  form: {
    alignItems: 'center',
    paddingBottom: metrics.padding,
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
  },
  textarea: {
    height: metrics.screenHeight * 0.15,
    textAlignVertical: 'top',
  },
  picker: {
    width: INPUT_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    marginVertical: metrics.padding * 0.5,
    color: COLORS.primary,
  },
  mediaButton: {
    width: INPUT_WIDTH,
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding * 0.5,
  },
  mediaText: {
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  error: {
    color: COLORS.error,
    fontSize: typography.fontSize.normal,
    marginBottom: metrics.padding,
  },
  button: {
    width: INPUT_WIDTH,
    padding: metrics.padding,
    backgroundColor: COLORS.primary,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
})
