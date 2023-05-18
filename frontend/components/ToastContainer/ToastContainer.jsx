import React from 'react';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';

import { COLORS, SIZES, FONT } from '../../constants/theme';

function ToastContainer() {
    const toastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                style={{
                    backgroundColor: COLORS.cardColor, borderLeftColor: COLORS.switchInactive,
                    height: "auto"
                }}
                text1Style={{
                    fontSize: SIZES.small,
                    fontFamily: FONT.medium,
                    color: COLORS.textWhite,
                    paddingVertical: SIZES.small,
                }}
                text1NumberOfLines={10}
            />
        ),

        success: (props) => (
            <SuccessToast
                {...props}
                style={{ backgroundColor: COLORS.cardColor, borderLeftColor: COLORS.switchActive, height: "auto" }}
                text1Style={{
                    fontSize: SIZES.small,
                    fontFamily: FONT.medium,
                    color: COLORS.textWhite,
                    paddingVertical: SIZES.small,
                }}
                text1NumberOfLines={10}
            />
        ),
    }

    return (
        <Toast config={toastConfig} />
    )
}

export default ToastContainer;