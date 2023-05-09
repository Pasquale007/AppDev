import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '85%'
    },
    text: {
        color: COLORS.textWhite,
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        textAlign: 'center'
    },
    airplane: {
        transform: [{ rotate: '-90deg' }],
        color: COLORS.textWhite,
        fontSize: 100,
        fontFamily: FONT.medium,
    },
    backrang: {
        marginTop: 150,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
});

export default styles;
