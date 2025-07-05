// src/modules/Survey/components/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../../constants/colors'
import { typography } from '../../../../constants/typography'
import { metrics } from '../../../../constants/metrics'

const { width } = Dimensions.get('window')
const CONTAINER_WIDTH = width * 0.9

export default StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: metrics.padding * 2,
    borderRadius: metrics.borderRadius,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLORS.white, // fallback
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
    marginBottom: metrics.padding * 2,
  },
  headerH2: {
    fontSize: typography.fontSize.large,
    color: COLORS.dark,
    fontFamily: typography.fontFamily,
  },
  headerH3: {
    fontSize: typography.fontSize.normal,
    color: COLORS.dark,
    fontFamily: typography.fontFamily,
    marginTop: metrics.padding * 0.2,
  },
  body: {
    alignItems: 'center',
  },
  bodyH2: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginBottom: metrics.padding,
  },
  bodyText: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: metrics.padding * 0.5,
  },
  name: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    fontWeight: 'bold' as const,
    textDecorationLine: 'underline',
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  bodyTextTitle: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginBottom: metrics.padding * 0.5,
    textAlign: 'center',
  },
  courseTitle: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    fontWeight: 'bold' as const,
    marginBottom: metrics.padding,
    textAlign: 'center',
  },
  details: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    textAlign: 'center',
    width: '70%',
    marginBottom: metrics.padding * 2,
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signature: {
    alignItems: 'center',
    flex: 1,
  },
  signatureName: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
  signatureRole: {
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
    marginTop: metrics.padding * 0.5,
  },
  footer: {
    marginTop: metrics.padding * 2,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
})
