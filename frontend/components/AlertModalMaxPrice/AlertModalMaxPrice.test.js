import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AlertModalMaxPrice from './AlertModalMaxPrice';

describe('AlertModalMaxPrice', () => {
    const headline = "Test Headline";
    const placeholder = "Test Placeholder";
    const setMaxPrice = jest.fn();

    it('should render correctly', () => {
        const { getByTestId } = render(<AlertModalMaxPrice headline={headline} placeholder={placeholder} setMaxPrice={setMaxPrice} />);
        const headline = getByTestId("maxPriceHeadline");
        const inputField = getByTestId("maxPriceInput");
        const currency = getByTestId("maxPriceCurrency");
        expect(headline).toBeDefined();
        expect(inputField).toBeDefined();
        expect(currency).toBeDefined();
    });

    it('should set max price on text input change', () => {
        const { getByTestId } = render(
            <AlertModalMaxPrice headline={headline} placeholder={placeholder} setMaxPrice={setMaxPrice} />
        );

        fireEvent.changeText(getByTestId('maxPriceInput'), '100,00');
        expect(setMaxPrice).toHaveBeenCalledWith(100);
    });

    it('should only allow numeric input and comma in the text input', () => {
        const { getByPlaceholderText } = render(
            <AlertModalMaxPrice headline={headline} placeholder={placeholder} setMaxPrice={setMaxPrice} />
        );

        fireEvent.changeText(getByPlaceholderText(placeholder), 'abc123');
        expect(setMaxPrice).toHaveBeenCalledWith(123);

        fireEvent.changeText(getByPlaceholderText(placeholder), '100,00');
        expect(setMaxPrice).toHaveBeenCalledWith(100);
    });
});