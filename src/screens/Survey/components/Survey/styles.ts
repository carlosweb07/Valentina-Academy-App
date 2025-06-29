// src/modules/Survey/components/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../constants/colors'
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
    backgroundColor: colors.dark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
    marginBottom: metrics.padding,
  },
  questionText: {
    fontSize: typography.fontSize.large,
    color: colors.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  answer: {
    width: ANSWER_WIDTH,
    backgroundColor: colors.primaryOpaque,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.3,
    alignSelf: 'center',
  },
  answerSelected: {
    borderWidth: 2,
    borderColor: colors.white,
  },
  answerText: {
    fontSize: typography.fontSize.normal,
    color: colors.dark,
    textAlign: 'center',
  },
  answerTextSelected: {
    color: colors.primary,
    fontWeight: 'bold' as const,
  },
})
