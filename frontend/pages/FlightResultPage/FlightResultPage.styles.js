import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.backgroundOpacity,
        borderRadius: 20,
        width: '90%',
        alignItems: "center"
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        margin: "5%",
        marginTop: "10%",
        marginBottom: '15%',
    },
    icon: {
        backgroundColor: COLORS.backgroundOpacity,
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
    activityIndicator: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
    }
});

export default styles;
