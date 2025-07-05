// src/modules/admin/components/EditSurveyModal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width, height } = Dimensions.get('window')
const INPUT_W = width * 0.9

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
  label: {
    alignSelf: 'flex-start',
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.3,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: metrics.padding,
    width: INPUT_W,
  },
  courseBtn: {
    padding: metrics.padding * 0.5,
    backgroundColor: COLORS.darkMoreOpaque,
    borderRadius: metrics.borderRadius * 0.5,
    marginRight: metrics.padding * 0.5,
  },
  courseBtnSelected: {
    backgroundColor: COLORS.primary,
  },
  courseBtnText: {
    color: COLORS.white,
    fontSize: typography.fontSize.normal,
  },
  courseBtnTextSelected: {
    color: COLORS.dark,
  },
  input: {
    width: INPUT_W,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.white,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
  },
  textarea: {
    height: height * 0.08,
    textAlignVertical: 'top',
  },
  questionBlock: {
    width: INPUT_W,
    backgroundColor: COLORS.darkOpaque,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.padding * 0.5,
  },
  subheading: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
  },
  questionBtns: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-between',
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  answerInput: {
    flex: 1,
    backgroundColor: COLORS.darkMoreOpaque,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
  },
  addRemove: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: INPUT_W,
    marginVertical: metrics.padding,
  },
  button: {
    width: INPUT_W,
    backgroundColor: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.padding,
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
  },
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    marginTop: metrics.padding,
    color: COLORS.primary,
  },
  error: {
    color: COLORS.error,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
})
