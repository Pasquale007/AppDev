import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import { Dimensions } from 'react-native'

const styles = StyleSheet.create({

    flex: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: Dimensions.get('window').width,
    },

    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: "5%",
        marginTop: "30%",
        color: COLORS.background,
        height: Dimensions.get('window').height * 0.6,
    },

    container: {
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.background,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    errorText: {
        color: COLORS.textWhite,
        fontSize: 20,
        fontFamily: FONT.semiBold,
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'center',

    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default styles;