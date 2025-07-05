// src/shared/components/Carousel/styles.ts
import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'

export default StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: COLORS.dark,   // puedes cambiar o quitar
    overflow: 'hidden',
    paddingTop: 15
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 2,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  arrowText: {
    color: COLORS.primary,
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
  },
})
