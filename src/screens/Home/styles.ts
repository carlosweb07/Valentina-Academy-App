// src/screens/styles.ts
import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'
import { metrics } from '../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  main: {
    flex: 1
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.padding,
  },
  notFoundText: {
    color: COLORS.darkOpaque,
    fontSize: 30,
    textAlign: 'left',
  },
})
