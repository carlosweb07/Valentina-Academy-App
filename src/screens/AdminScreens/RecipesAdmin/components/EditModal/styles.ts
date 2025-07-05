// src/modules/admin/components/EditRecipeModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width, height } = Dimensions.get('window')
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
  textarea: {
    height: height * 0.1,
    textAlignVertical: 'top',
  },
  subheading: {
    alignSelf: 'flex-start',
    fontSize: typography.fontSize.normal,
    color: COLORS.primary,
    marginTop: metrics.padding,
    marginBottom: metrics.padding * 0.5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: INPUT_WIDTH,
    marginVertical: metrics.padding * 0.3,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: metrics.padding * 0.5,
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
  },
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: INPUT_WIDTH,
    alignItems: 'center',
    marginTop: metrics.padding,
    marginBottom: metrics.padding * 0.5,
  },
  stepButtons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  button: {
    width: INPUT_WIDTH,
    padding: metrics.padding,
    backgroundColor: COLORS.primary,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding,
  },
  buttonText: {
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
