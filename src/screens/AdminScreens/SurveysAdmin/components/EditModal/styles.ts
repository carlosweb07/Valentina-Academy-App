import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../../constants/colors'
import { typography } from '../../../../../constants/typography'
import { metrics } from '../../../../../constants/metrics'

const { width, height } = Dimensions.get('window')
const INPUT_W = width * 0.75

export default StyleSheet.create({
  container: {
    padding: metrics.padding,
    paddingLeft: metrics.padding * 0.3,
  },
  title: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginTop: metrics.padding,
    paddingBottom: 10,
  },
  header: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },

  /* Curso selector */
  label: {
    alignSelf: 'flex-start',
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.3,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
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
    fontFamily: typography.fontFamily,
  },
  courseBtnTextSelected: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },

  /* Inputs */
  input: {
    width: INPUT_W,
    backgroundColor: COLORS.darkMoreOpaque,
    color: COLORS.white,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
    borderColor: COLORS.primaryMoreOpaque,
    borderWidth: 1,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  textarea: {
    height: height * 0.08,
    textAlignVertical: 'top',
  },

  /* Preguntas */
  questionBlock: {
    width: INPUT_W,
    backgroundColor: COLORS.darkOpaque,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding,
    paddingLeft: metrics.padding * 0.3,
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
    fontFamily: typography.fontFamily,
  },
  questionBtns: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-between',
  },

  /* Respuestas */
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
    borderColor: COLORS.primaryMoreOpaque,
    borderWidth: 1,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },

  /* Controls */
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
    fontFamily: typography.fontFamily,
  },

  /* Loading / status / errors */
  center: {
    alignItems: 'center',
    padding: metrics.padding,
  },
  status: {
    marginTop: metrics.padding,
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  error: {
    color: COLORS.error,
    marginBottom: metrics.padding,
    textAlign: 'center',
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
})