// src/modules/admin/skeleton/styles.ts
import { StyleSheet } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { metrics } from '../../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  container: {
    padding: metrics.padding,
    alignItems: 'center',
  },
  card: {
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
    padding: metrics.padding,
  },
  titleSkeleton: {
    height: 20,
    borderRadius: 4,
    marginBottom: metrics.padding * 0.5,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginLeft: metrics.padding * 0.5,
  },
})
