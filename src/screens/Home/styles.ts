// src/screens/styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'
import { metrics } from '../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkOpaque,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkOpaque,
  },
  main: {
    flex: 1,
    paddingHorizontal: metrics.padding,
    paddingTop: metrics.padding,
  },
})
