// src/shared/components/Navbar/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: colors.darkOpaque,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.padding,
    paddingVertical: metrics.padding * 1,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: metrics.padding * 0.5,
  },
  title: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xxlarge,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    marginHorizontal: metrics.padding * 0.5,
  },
  userLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: metrics.padding,
  },
  submenu: {
    position: 'absolute',
    top: height * 0.08,
    right: metrics.padding,
    backgroundColor: colors.dark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding * 0.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  submenuItem: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    paddingVertical: metrics.padding * 0.3,
  },
  signOut: {
    color: colors.error,
  },
})
