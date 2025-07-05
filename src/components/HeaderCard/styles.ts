// src/shared/components/HeaderCard/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = Math.min(600, height * 0.5)  // Máximo 600px, o 50% de la pantalla

export default StyleSheet.create({
  card: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: CARD_HEIGHT,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',  // oscurece la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '80%',
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xlarge,
    padding: metrics.padding,
  },
})
