import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: COLORS.background,
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.backgroundOpacity,
        borderRadius: 20,
        width: '90%',

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        margin: "5%",
        marginTop: "10%",
        height: '100%',
    },
    icon: {
        backgroundColor: COLORS.backgroundOpacity,
        borderRadius: 20,
        marginRight: SIZES.small,
    },
    iconWithoutBackground: {
        borderRadius: 20,
        marginRight: SIZES.small,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default styles;
