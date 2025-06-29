// src/screens/styles.ts (or src/screens/AdminScreen/styles.ts)
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.45

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkOpaque,
  },
  container: {
    padding: metrics.padding,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxlarge,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginTop: metrics.padding,
  },
  subtitle: {
    fontSize: typography.fontSize.normal,
    fontFamily: typography.fontFamily,
    color: colors.white,
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
    backgroundColor: colors.primaryOpaque,
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
    color: colors.dark,
  },
})
