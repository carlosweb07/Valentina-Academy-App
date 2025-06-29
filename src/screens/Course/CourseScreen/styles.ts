import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
import { typography } from '../../../constants/typography'
import { metrics } from '../../../constants/metrics'

const { width } = Dimensions.get('window')
const VIDEO_HEIGHT = width * 0.5625 // proporción 16:9

export default StyleSheet.create({
  container: {
    paddingBottom: metrics.padding,
    backgroundColor: colors.darkOpaque,
  },
  video: {
    width: '100%',
    height: VIDEO_HEIGHT,
    marginTop: metrics.padding,
  },
  detailsContainer: {
    padding: metrics.padding,
  },
  section: {
    marginBottom: metrics.padding * 1.5,
    backgroundColor: colors.darkOpaque,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding * 0.5,
  },
  subheading: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: metrics.padding * 0.5,
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: colors.white,
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
    backgroundColor: colors.primary,
  },
  authorName: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: colors.primary,
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white + "99", // semitransparente
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
    color: colors.dark,
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
    color: colors.white,
    marginBottom: metrics.padding * 0.3,
  },
})
