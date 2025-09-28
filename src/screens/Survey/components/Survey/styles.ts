// src/modules/Survey/components/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../constants/colors'
import { typography } from '../../../../constants/typography'
import { metrics } from '../../../../constants/metrics'

const { width } = Dimensions.get('window')
const ANSWER_WIDTH = width * 0.8

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: metrics.padding,
  },
  question: {
    backgroundColor: COLORS.dark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
    marginBottom: metrics.padding,
  },
  questionText: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  answer: {
    width: ANSWER_WIDTH,
    backgroundColor: COLORS.primaryOpaque,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.3,
    alignSelf: 'center',
  },
  answerSelected: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  answerText: {
    fontSize: typography.fontSize.normal,
    color: COLORS.dark,
    textAlign: 'center',
  },
  answerTextSelected: {
    color: COLORS.primary,
    fontWeight: 'bold' as const,
  },
  btn: {
    backgroundColor: COLORS.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding * 0.3,
  },
  btnText: {
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
})
