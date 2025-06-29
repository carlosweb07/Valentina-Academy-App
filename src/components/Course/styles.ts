import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.9

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.darkOpaque,
    borderRadius: metrics.borderRadius * 2,
    overflow: 'hidden',
    marginVertical: metrics.padding,
    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // sombra Android
    elevation: 3,
  },
  image: {
    width: '100%',
    height: metrics.screenHeight * 0.25,
  },
  imageRounded: {
    borderTopLeftRadius: metrics.borderRadius * 2,
    borderTopRightRadius: metrics.borderRadius * 2,
  },
  info: {
    backgroundColor: colors.darkMoreOpaque,
    padding: metrics.padding,
    minHeight: metrics.screenHeight * 0.18,
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.large,
    marginBottom: metrics.padding * 0.3,
  },
  description: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    lineHeight: typography.fontSize.normal * 1.4,
  },
  more: {
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
  },
})
