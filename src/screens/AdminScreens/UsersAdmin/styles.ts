import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkOpaque,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.padding,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    color: colors.primary,
  },
  icon: { color: colors.primary },
  deleteIcon: {
    marginHorizontal: metrics.padding * 0.5,
    color: colors.error,
  },
  list: {
    padding: metrics.padding,
  },
  card: {
    backgroundColor: colors.darkMoreOpaque,
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
    color: colors.primary,
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
    backgroundColor: colors.darkOpaque,
  },
  detail: {
    fontSize: typography.fontSize.normal,
    color: colors.white,
    marginBottom: metrics.padding * 0.5,
  },
  bold: {
    fontWeight: 'bold' as const,
    color: colors.primary,
  },
})
