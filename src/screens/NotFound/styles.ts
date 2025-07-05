// src/screens/NotFoundScreen/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: metrics.padding,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    alignItems: 'center',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '65%',
  },
  title: {
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginBottom: metrics.padding,
  },
  text: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.white,
    marginBottom: metrics.padding * 0.5,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
  link: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    marginBottom: metrics.padding * 0.5,
  },
})
