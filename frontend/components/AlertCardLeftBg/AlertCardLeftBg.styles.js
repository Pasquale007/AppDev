import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.switchActive,
        width: 60,
        paddingLeft: SIZES.medium,
        borderRadius: SIZES.xSmall,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        gap: 5,
    },

    text: {
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },

    searchIcon: {
        color: COLORS.textWhite,
    },

});

export default styles;
