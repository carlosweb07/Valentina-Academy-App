// src/screens/IngredientsAdminScreen/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.95

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
    backgroundColor: COLORS.darkOpaque,
  },
  title: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
  },
  list: {
    padding: metrics.padding,
  },
  card: {
    width: CARD_WIDTH,
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
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginHorizontal: metrics.padding * 0.5,
  },
  caretOpen: {
    transform: [{ rotate: '90deg' }],
  },
  cardBody: {
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
  },
  detailLabel: {
    fontSize: typography.fontSize.normal,
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.5,
  },
  detailText: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
  },
})
