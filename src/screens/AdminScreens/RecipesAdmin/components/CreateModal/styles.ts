// src/modules/admin/components/CreateRecipeModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width, height } = Dimensions.get('window')
const INPUT_WIDTH = width * 0.77

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
    marginTop: metrics.padding,
    paddingBottom: 10,
  },
  form: {
    paddingBottom: metrics.padding,
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.primary,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
    borderColor: COLORS.primaryMoreOpaque,
    borderWidth: 1,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  textarea: {
    height: height * 0.12,
    textAlignVertical: 'top',
  },
  subheading: {
    fontSize: typography.fontSize.normal,
    color: COLORS.primary,
    alignSelf: 'flex-start',
    marginTop: metrics.padding,
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
  loading: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  loadingText: {
    color: COLORS.primary,
    marginTop: metrics.padding,
    fontSize: typography.fontSize.normal,
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