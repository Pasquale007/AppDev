import { StyleSheet } from "react-native";
import { FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    flex: {
        marginLeft: 15,
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'flex-start',
        gap: 20,
        fontSize: SIZES.large,
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
