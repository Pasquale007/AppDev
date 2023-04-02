import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    flex: {
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        fontSize: SIZES.large
    },
    element1: {
        flexGrow: 1
    },
    element2: {
        flexGrow: 4
    },
    date: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large
    }
});

export default styles;
