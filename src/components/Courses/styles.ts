import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: metrics.padding,
    backgroundColor: COLORS.primaryOpaque,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.padding,
  },
  title: {
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
  reloadButton: {
    marginLeft: metrics.padding * 0.5,
    padding: metrics.padding * 0.3,
  },
  coursesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // Cada CourseCard deberá tener margen horizontal y vertical
  },
})
