import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.searchFieldColor,
        borderRadius: 10,
        marginBottom: "5%",

    },
    label: {
        paddingLeft: 10,
        backgroundColor: COLORS.searchFieldTagColor,
        fontFamily: FONT.medium,
        color: COLORS.background,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        width: "auto",
        paddingRight: 5,
    },
    seachText: {
        fontFamily: FONT.bold,
        color: COLORS.textBlack,
        fontSize: SIZES.large,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export default styles;
