// src/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')
const BOX_WIDTH = width * 0.8
const BOX_HEIGHT = height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding,
  },
  box: {
    width: BOX_WIDTH,
    padding: metrics.padding * 1.5,
    backgroundColor: colors.darkMoreOpaque,
    borderRadius: metrics.borderRadius,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  field: {
    marginVertical: metrics.padding * 0.5,
  },
  label: {
    color: colors.primary,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding * 0.2,
  },
  input: {
    width: '100%',
    padding: metrics.padding * 0.8,
    borderRadius: metrics.borderRadius * 1.5,
    backgroundColor: colors.dark,
    color: colors.primary,
    fontSize: typography.fontSize.normal,
  },
  inputPlaceholder: {
    color: colors.darkMoreOpaque,
  },
  redirect: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: typography.fontSize.normal,
    marginVertical: metrics.padding,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding,
  },
  buttonText: {
    color: colors.dark,
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
  message: {
    position: 'absolute',
    bottom: metrics.padding - 100,
    alignSelf: 'center',
    backgroundColor: colors.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
  },
  messageText: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
  },
})
