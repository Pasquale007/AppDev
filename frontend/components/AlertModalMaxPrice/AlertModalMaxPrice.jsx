import React, { useState } from 'react';
import styles from './AlertModalMaxPrice.style';
import { Text, TextInput, View } from 'react-native';

import { COLORS } from "../../constants/theme";

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
                <Text style={styles.headline} testID="maxPriceHeadline">{headline}</Text>
            </View>
            <View style={styles.priceInputContainer}>
                <TextInput
                    value={price}
                    onChangeText={handleMaxPriceChange}
                    style={styles.priceInput}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textBlack}
                    keyboardType="numeric"
                    testID="maxPriceInput"
                />
                <Text style={styles.priceCurrency} testID="maxPriceCurrency">€</Text>
            </View>
        </View>
    )
}

export default AlertModalMaxPrice;