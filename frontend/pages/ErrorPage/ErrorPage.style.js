import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
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
        backgroundColor: COLORS.background,
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    errorText: {
        color: COLORS.textWhite,
        fontFamily: FONT.regular,
        fontSize: 20,
        textAlign: 'center',
        
    },
});

export default styles;