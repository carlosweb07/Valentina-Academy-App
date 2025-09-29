// src/screens/styles.ts (or src/screens/AdminScreen/styles.ts)
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.8

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkOpaque,
  },
  container: {
    flex: 1,
    padding: metrics.padding,
    paddingTop: metrics.padding * 2,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
    color: COLORS.primary,
    marginTop: metrics.padding,
  },
  subtitle: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: COLORS.white,
    marginVertical: metrics.padding,
    textAlign: 'center',
  },
  entitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: metrics.padding,
    gap: metrics.padding,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.primaryOpaque,
    borderRadius: metrics.borderRadius,
    paddingVertical: metrics.padding,
    alignItems: 'center',
    marginBottom: metrics.padding,
    // sombra ligera
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardText: {
    fontSize: typography.fontSize.large,
    fontFamily: typography.fontFamily,
    color: COLORS.dark,
  },
})
