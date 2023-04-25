import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 1,
    },

    head: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },  

    headline: {
        color: COLORS.textWhite,
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium,
    },

    data:{
        color: COLORS.textWhite,
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        marginLeft: 21,
    },

});

export default styles;
