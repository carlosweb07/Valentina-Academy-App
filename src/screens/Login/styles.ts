// src/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')
const BOX_WIDTH = width * 0.8

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    width: BOX_WIDTH,
    padding: metrics.padding * 1.5,
    backgroundColor: COLORS.darkOpaque,
    borderRadius: metrics.borderRadius,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  field: {
    marginVertical: metrics.padding * 0.5,
  },
  label: {
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding * 0.2,
  },
  input: {
    width: '100%',
    padding: metrics.padding * 0.8,
    borderRadius: metrics.borderRadius * 1.5,
    backgroundColor: COLORS.dark,
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  inputPlaceholder: {
    color: COLORS.darkMoreOpaque,
  },
  redirect: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontSize: typography.fontSize.normal,
    marginVertical: metrics.padding,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding,
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  message: {
    position: 'absolute',
    bottom: metrics.padding - 100,
    alignSelf: 'center',
    backgroundColor: COLORS.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
  },
  messageText: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
})
