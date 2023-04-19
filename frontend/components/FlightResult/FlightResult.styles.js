import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    main: {
        marginTop: '8%',
        backgroundColor: COLORS.backgroundOpacityHight,
        borderRadius: 20,
        filter: 'blur(50%)',
        padding: "5%",
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    city: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.textWhite,
    },
    date: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
    },
    right: {
        textAlign: 'right'
    },
    costs: {
        color: COLORS.textWhite,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.bold
    }

});

export default styles;
