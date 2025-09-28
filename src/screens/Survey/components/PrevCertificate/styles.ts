// src/modules/Survey/components/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../constants/colors'
import { typography } from '../../../../constants/typography'
import { metrics } from '../../../../constants/metrics'

const { width } = Dimensions.get('window')
const CONTAINER_WIDTH = width * 0.8

export default StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: metrics.padding,          // reducido para ganar espacio
    borderRadius: metrics.borderRadius,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLORS.white, 
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginVertical: metrics.padding,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },

  header: {
    alignItems: 'center',
    marginBottom: metrics.padding * 1,
  },
  headerH2: {
    fontSize: typography.fontSize.small,
    color: COLORS.dark,
    fontFamily: typography.fontFamily,
  },
  headerH3: {
    fontSize: typography.fontSize.xsmall,
    color: COLORS.dark,
    fontFamily: typography.fontFamily,
    marginTop: metrics.padding * 0.2,
  },

  body: {
    alignItems: 'center',
  },
  bodyH2: {
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginBottom: metrics.padding * 0.4,
  },
  bodyText: {
    fontSize: typography.fontSize.xsmall,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: metrics.padding * 0.4,
    lineHeight: typography.fontSize.small,
  },
  name: {
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    fontWeight: 'bold' as const,
    textDecorationLine: 'underline',
    marginBottom: metrics.padding * 0.6,
    textAlign: 'center',
  },
  bodyTextTitle: {
    fontSize: typography.fontSize.xsmall,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginBottom: metrics.padding * 0.4,
    textAlign: 'center',
  },
  courseTitle: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    fontWeight: 'bold' as const,
    marginBottom: metrics.padding * 0.4,
    textAlign: 'center',
  },
  details: {
    fontSize: typography.fontSize.xsmall,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    textAlign: 'center',
    width: '70%',
    marginBottom: metrics.padding * 1.5,
    lineHeight: typography.fontSize.normal * 1.3,
  },

  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: metrics.padding,
  },
  signature: {
    alignItems: 'center',
    flex: 1,
  },
  signatureName: {
    fontSize: typography.fontSize.small,    // antes normal
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
  signatureRole: {
    fontSize: typography.fontSize.small || typography.fontSize.small, // reduce un nivel
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginTop: metrics.padding * 0.3,
  },

  footer: {
    marginTop: metrics.padding,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.small || typography.fontSize.small, // reduce un nivel
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
})