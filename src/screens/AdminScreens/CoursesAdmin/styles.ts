// src/screens/CoursesAdminScreen/styles.ts
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
  heading: {
    fontSize: typography.fontSize.xlarge,
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
    // sombra
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
  },
  caretRotated: {
    transform: [{ rotate: '90deg' }],
  },
  cardBody: {
    padding: metrics.padding,
    backgroundColor: COLORS.darkOpaque,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: metrics.padding,
  },
  infoDetails: {
    width: '48%',
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
  bold: {
    fontWeight: 'bold' as const,
  },
  recipeLists: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipePart: {
    width: '48%',
  },
  listHeading: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    fontFamily: typography.fontFamily,
    marginBottom: metrics.padding * 0.5,
  },
  mediaSection: {
    marginTop: metrics.padding,
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cover: {
    width: '48%',
    height: metrics.screenHeight * 0.2,
    borderRadius: metrics.borderRadius,
  },
  video: {
    width: '48%',
    height: metrics.screenHeight * 0.2,
  },
})
