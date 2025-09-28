import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')
const VIDEO_HEIGHT = width * 0.5625 // proporción 16:9

export default StyleSheet.create({
  video: {
    width: '100%',
    height: VIDEO_HEIGHT
  },
  detailsContainer: {
    padding: metrics.padding,
  },
  section: {
    marginBottom: metrics.padding * 1.5,
    backgroundColor: COLORS.darkOpaque,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.5,
  },
  subheading: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginBottom: metrics.padding * 0.5,
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.white,
    marginBottom: metrics.padding,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.padding * 0.3,
    marginTop: metrics.padding,
  },
  authorImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
  authorName: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white + "99", // semitransparente
    borderRadius: metrics.borderRadius,
    padding: metrics.padding * 0.5,
  },
  pdfIcon: {
    width: 30,
    height: 30,
    marginRight: metrics.padding * 0.5,
  },
  pdfText: {
    fontSize: typography.fontSize.normal,
    color: COLORS.dark,
  },
  recipeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredients: {
    width: '45%',
  },
  instructions: {
    width: '50%',
  },
  listItem: {
    fontSize: typography.fontSize.normal,
    color: COLORS.white,
    marginBottom: metrics.padding * 0.3,
  },
})
