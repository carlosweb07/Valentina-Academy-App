// src/modules/Course/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryOpaque,
  },
  container: {
    padding: metrics.padding,
    backgroundColor: colors.primaryOpaque,
  },
  details: {
    backgroundColor: colors.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding * 0.5,
  },
  desc: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: colors.white,
    marginBottom: metrics.padding,
  },
  price: {
    fontSize: typography.fontSize.large,
    color: colors.white,
    marginBottom: metrics.padding,
  },
  priceBold: {
    fontWeight: 'bold' as const,
    color: colors.primary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
  },
  buttonText: {
    fontSize: typography.fontSize.normal,
    color: colors.dark,
    marginLeft: metrics.padding * 0.5,
    fontFamily: typography.fontFamily,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    marginTop: metrics.padding,
  },
  messageText: {
    color: colors.white,
    fontSize: typography.fontSize.normal,
    marginLeft: metrics.padding * 0.3,
    fontFamily: typography.fontFamily,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6,
    marginTop: metrics.padding,
  },
  imageMask: {
    resizeMode: 'cover',
    // Opcional: add gradient mask using react-native-linear-gradient
  },
})
