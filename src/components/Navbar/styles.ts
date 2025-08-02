// src/shared/components/Navbar/styles.ts
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { metrics } from '../../constants/metrics'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: COLORS.darkOpaque,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.padding * 1,
    paddingVertical: metrics.padding * 1.3,
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
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xxlarge,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    marginHorizontal: metrics.padding * 0.5,
  },
  userLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: metrics.padding,
  },
  submenu: {
    position: 'absolute',
    width: 150,
    top: height * 0.07,
    right: metrics.padding * 0.4,
    backgroundColor: COLORS.dark,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding * 0.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  submenuItem: {
    color: COLORS.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.normal,
    paddingVertical: metrics.padding * 0.3,
    textAlign: "right",
  },
  signOut: {
    color: COLORS.error,
  },
})
