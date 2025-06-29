// src/shared/components/Modal/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: colors.dark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
  },
  closeBtn: {
    position: 'absolute',
    top: metrics.padding * 0.5,
    right: metrics.padding * 0.5,
    zIndex: 1,
  },
  closeText: {
    fontSize: typography.fontSize.xlarge,
    color: colors.error,
  },
  contentContainer: {
    paddingTop: typography.fontSize.xlarge * 1.2,
    paddingBottom: metrics.padding * 0.5,
  },
})
