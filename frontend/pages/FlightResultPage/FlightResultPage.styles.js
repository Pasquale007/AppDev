import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        margin: "5%",
        marginTop: "5%",
        marginBottom: '20%',
    },
    icon: {
        padding: 5,
        backgroundColor: COLORS.backgroundOpacity,
        borderRadius: 50,
        marginRight: SIZES.small,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    activityIndicator: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,

    },
    list: {
        marginBottom: 20,
    }
});

export default styles;