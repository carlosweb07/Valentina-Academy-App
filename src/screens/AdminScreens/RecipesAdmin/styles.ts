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
    backgroundColor: COLORS.darkMoreOpaque,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
  },
  heading: {
    fontSize: typography.fontSize.mlarge,
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
  },
  list: {
    padding: metrics.padding,
  },

  /* Card / item */
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.darkMoreOpaque,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    fontFamily: typography.fontFamily,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: metrics.padding * 0.5,
    color: COLORS.primary,
  },
  deleteIcon: {
    marginLeft: metrics.padding * 0.5,
    color: COLORS.error,
  },
  caretRotated: {
    transform: [{ rotate: '90deg' }],
  },

  /* Expanded body */
  courseItem: {
    backgroundColor: COLORS.darkMoreOpaque,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseDetails: {
    marginTop: 8,
    padding: 12,
    backgroundColor: COLORS.primaryMoreOpaqueVariant,
    borderRadius: 8,
  },
  cardBody: {
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
  },
  subheading: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding * 0.5,
  },
  text: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding * 0.3,
  },
  listItem: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginLeft: metrics.padding,
    marginBottom: metrics.padding * 0.3,
    lineHeight: typography.fontSize.normal * 1.4,
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: typography.fontSize.large,
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },

  /* Background image (keeps parity with UsersAdmin) */
  image: {
    width: 'auto',
    height: 'auto',
    flex: 1,
    marginTop: 50,
    backgroundColor: COLORS.darkMoreOpaque,
  },
  imageRounded: {
    borderTopLeftRadius: metrics.borderRadius * 2,
    borderTopRightRadius: metrics.borderRadius * 2,
  },

  /* helpers */
  deleteButton: {
    backgroundColor: COLORS.darkOpaque,
    fontSize: typography.fontSize.normal,
    color: COLORS.error,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  section: {
    marginTop: metrics.padding * 0.5,
    marginBottom: metrics.padding * 0.5,
  },
})