import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 1,
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
    },

});

export default styles;
