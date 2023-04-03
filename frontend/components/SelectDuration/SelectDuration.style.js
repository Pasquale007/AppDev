import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        width: 50,
        margin: 10,
        height: 50,
        fontFamily: FONT.bold,
        fontSize: SIZES.xxLarge,
        backgroundColor: COLORS.searchFieldColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: 'center'
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        alignSelf: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        textAlign: 'center',
        justifyContent: 'space-evenly',
        fontSize: SIZES.large,
        alignItems: 'baseline' // add this line
    }
});

export default styles;
