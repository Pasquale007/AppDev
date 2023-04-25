import React, { useState } from 'react';
import styles from './AlertModalMaxPrice.style';
import { Text, TextInput, View } from 'react-native';

import { COLORS, FONT, SIZES } from "../../constants/theme";

function AlertModalMaxPrice({ headline, placeholder, setMaxPrice, icon }) {
    const [price, setPrice] = useState();


    const handleMaxPriceChange = (text) => {
        const numericInput = text.replace(/[^0-9,]/g, '');
        setPrice(numericInput);
        setMaxPrice(parseFloat(numericInput.replace(",", ".")));
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                {icon && icon}
                <Text style={styles.headline}>{headline}</Text>
            </View>
            <View style={styles.priceInputContainer}>
                <TextInput
                    value={price}
                    onChangeText={handleMaxPriceChange}
                    style={styles.priceInput}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textBlack}
                    keyboardType="numeric"
                />
                <Text style={styles.priceCurrency}>€</Text>
            </View>
        </View>
    )
}

export default AlertModalMaxPrice;