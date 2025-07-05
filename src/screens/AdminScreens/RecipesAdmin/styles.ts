// src/screens/RecipesAdminScreen/styles.ts
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
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    color: COLORS.primary,
  },
  icon: {
    color: COLORS.primary,
  },
  deleteIcon: {
    marginHorizontal: metrics.padding * 0.5,
    color: COLORS.error,
  },
  list: {
    paddingHorizontal: metrics.padding,
    paddingBottom: metrics.padding,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    borderRadius: metrics.borderRadius,
    marginVertical: metrics.padding * 0.5,
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
    backgroundColor: COLORS.dark,
  },
  subheading: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginTop: metrics.padding,
    marginBottom: metrics.padding * 0.5,
  },
  text: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginBottom: metrics.padding,
  },
  listItem: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginLeft: metrics.padding,
    marginBottom: metrics.padding * 0.3,
  },
})
