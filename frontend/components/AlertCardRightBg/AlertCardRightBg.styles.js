import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.deleteColor,
        width: 100,
        borderRadius: SIZES.xSmall,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    text: {
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },

    trashIcon: {
        color: COLORS.textWhite,
    },

});

export default styles;
