import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  button: {
    alignItems: 'center',
    width: '40%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.searchButtonColor,
  },
  buttonText: {
    padding: 8,
    fontSize: SIZES.medium,
    fontFamily: FONT.semiBold,
    color: COLORS.textWhite,
  },
});
