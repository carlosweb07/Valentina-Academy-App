import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardView: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: height / 1.3,
    backgroundColor: COLORS.darkOpaque,
    alignItems: "center"
  },
  heading: {
    fontSize: typography.fontSize.xlarge,
    color: COLORS.primary,
    marginBottom: metrics.padding,
    textAlign: 'center'
  },
  paragraph: {
    fontSize: typography.fontSize.normal,
    color: COLORS.primaryOpaque,
    marginBottom: metrics.padding * 1.5,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: COLORS.dark,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginVertical: metrics.padding * 0.3,
  },
  btnText: {
    color: COLORS.primary,
    fontSize: typography.fontSize.normal,
  },
  counter: {
    fontSize: typography.fontSize.xxlarge || 80,
    color: COLORS.primary,
  },
  timer: {
    fontSize: typography.fontSize.xxlarge,
    color: COLORS.primaryOpaque,
    marginVertical: metrics.padding,
    textAlign: 'center',
  },
  error: {
    color: COLORS.white,
    padding: metrics.padding * 0.5,
    borderRadius: metrics.borderRadius,
    textAlign: 'center',
    marginVertical: metrics.padding,
  },
  results: {
    marginTop: metrics.padding,
  },
  percentage: {
    fontSize: typography.fontSize.xxlarge,
    color: COLORS.primary,
    marginVertical: metrics.padding,
    textAlign: "center"
  },
})
