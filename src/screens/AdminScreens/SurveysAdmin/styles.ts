import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkOpaque },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: metrics.padding,
    alignItems: 'center',
  },
  title: { fontSize: typography.fontSize.xlarge, color: colors.primary },
  icon: { color: colors.primary },
  deleteIcon: { marginHorizontal: metrics.padding * 0.5, color: colors.error },
  list: { padding: metrics.padding },
  card: {
    backgroundColor: colors.darkMoreOpaque,
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
  cardTitle: { fontSize: typography.fontSize.large, color: colors.primary, flex: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  caretOpen: { transform: [{ rotate: '90deg' }] },
  cardBody: { backgroundColor: colors.darkOpaque, padding: metrics.padding },
  subheading: {
    fontSize: typography.fontSize.large,
    color: colors.primary,
    marginTop: metrics.padding,
  },
  text: {
    fontSize: typography.fontSize.normal,
    color: colors.white,
    marginBottom: metrics.padding * 0.5,
  },
  questionBlock: { marginVertical: metrics.padding * 0.3 },
  questionText: {
    fontSize: typography.fontSize.normal,
    color: colors.white,
  },
  answerText: {
    fontSize: typography.fontSize.small,
    color: colors.primaryOpaque,
    marginLeft: metrics.padding,
  },
})
