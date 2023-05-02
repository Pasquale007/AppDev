
import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    video: {
        width: '100%',
        height: '70%',
    },
    text: {
        color: COLORS.textWhite,
        fontFamily: FONT.bold,
        fontSize: 50,
        textAlign: 'center'
    },
});

export default styles;
