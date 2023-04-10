import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.searchButtonColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        verticalAlign: 'middle'
    },
    seachText: {
        fontFamily: FONT.bold,
        color: COLORS.textWhite,
        fontSize: SIZES.xxLarge,
    },
});

export default styles;
