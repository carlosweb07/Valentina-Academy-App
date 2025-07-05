import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.padding,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    color: COLORS.primary,
  },
  icon: { color: COLORS.primary },
  deleteIcon: {
    marginHorizontal: metrics.padding * 0.5,
    color: COLORS.error,
  },
  list: {
    padding: metrics.padding,
  },
  card: {
    backgroundColor: COLORS.darkMoreOpaque,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.padding,
  },
  cardTitle: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caretOpen: {
    transform: [{ rotate: '90deg' }],
  },
  cardBody: {
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
  },
  detail: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginBottom: metrics.padding * 0.5,
  },
  bold: {
    fontWeight: 'bold' as const,
    color: COLORS.primary,
  },
})
