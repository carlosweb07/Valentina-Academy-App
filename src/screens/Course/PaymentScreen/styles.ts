// src/modules/Course/screens/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: metrics.padding,
    backgroundColor: COLORS.primaryMoreOpaque,
  },
  details: {
    backgroundColor: COLORS.dark,
    borderRadius: metrics.borderRadius,
  },
  detailsContent: {
    padding: metrics.padding,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.5,
  },
  desc: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.white,
    marginBottom: metrics.padding,
  },
  price: {
    fontSize: typography.fontSize.large,
    color: COLORS.white,
    marginBottom: metrics.padding,
  },
  priceBold: {
    fontWeight: 'bold' as const,
    color: COLORS.primary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
  },
  buttonText: {
    fontSize: typography.fontSize.normal,
    color: COLORS.dark,
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
    color: COLORS.white,
    fontSize: typography.fontSize.normal,
    marginLeft: metrics.padding * 0.3,
    fontFamily: typography.fontFamily,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6,
  },
  imageMask: {
    resizeMode: 'cover',
    borderTopRightRadius: metrics.borderRadius,
    borderTopLeftRadius: metrics.borderRadius,
    // Opcional: add gradient mask using react-native-linear-gradient
  },
})
