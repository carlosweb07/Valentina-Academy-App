import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.darkOpaque },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: metrics.padding,
    alignItems: 'center',
  },
  title: { fontSize: typography.fontSize.xlarge, color: COLORS.primary },
  icon: { color: COLORS.primary },
  deleteIcon: { marginHorizontal: metrics.padding * 0.5, color: COLORS.error },
  list: { padding: metrics.padding },
  card: {
    backgroundColor: COLORS.darkMoreOpaque,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.padding,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: metrics.padding,
    alignItems: 'center',
  },
  cardTitle: { fontSize: typography.fontSize.large, color: COLORS.primary, flex: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  caretOpen: { transform: [{ rotate: '90deg' }] },
  cardBody: { backgroundColor: COLORS.darkOpaque, padding: metrics.padding },
  subheading: {
    fontSize: typography.fontSize.large,
    color: COLORS.primary,
    marginTop: metrics.padding,
  },
  text: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginBottom: metrics.padding * 0.5,
  },
  questionBlock: { marginVertical: metrics.padding * 0.3 },
  questionText: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
  },
  answerText: {
    fontSize: typography.fontSize.small,
    color: COLORS.primaryOpaque,
    marginLeft: metrics.padding,
  },
})
