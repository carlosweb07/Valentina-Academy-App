// src/shared/components/Footer/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { height } = Dimensions.get('window')

export default StyleSheet.create({
  footer: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding,
  },
  text: {
    color: COLORS.white,
    fontSize: typography.fontSize.normal,
    textAlign: 'center',
    marginVertical: metrics.padding * 0.2,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
  instagramContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.padding * 0.5,
  },
  instagramIcon: {
    marginRight: metrics.padding * 0.3,
    color: COLORS.white,
  },
  instagramText: {
    color: COLORS.white,
    textDecorationLine: 'underline',
    fontSize: typography.fontSize.normal,
  },
})
