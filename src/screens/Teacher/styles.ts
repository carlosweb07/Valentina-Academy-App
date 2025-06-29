// src/screens/styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'
import { metrics } from '../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkOpaque,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    paddingTop: metrics.padding * 2,
  },
  container: {
    padding: metrics.padding,
  },
})
