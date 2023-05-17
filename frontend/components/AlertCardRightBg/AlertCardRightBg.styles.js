import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.deleteColor,
        width: 60,
        borderRadius: SIZES.xSmall,
        paddingRight: SIZES.medium,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
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
