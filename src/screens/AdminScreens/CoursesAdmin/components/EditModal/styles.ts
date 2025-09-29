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
  tittle: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginTop: metrics.padding * 1,
  },
  center: {
    padding: metrics.padding,
  },
  statusText: {
    marginTop: metrics.padding,
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  form: {
    paddingBottom: metrics.padding,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.10,
    borderColor: COLORS.primaryMoreOpaque,
    borderWidth: 1,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  textarea: {
    height: metrics.screenHeight * 0.15,
    textAlignVertical: 'top',
  },
  picker: {
    width: '100%',
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    marginVertical: metrics.padding * 0.1,
  },
  Viewpicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    borderColor: COLORS.primaryMoreOpaque,
    borderWidth: 1,
    borderRadius: metrics.borderRadius,
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
    width: '100%',
    padding: metrics.padding * 0.5,
    marginVertical: metrics.padding * 0.5,
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
