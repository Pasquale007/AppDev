import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectDate from './SelectDate';

describe('SelectDate', () => {
    it('should show date pickers when user taps on Display components', () => {
        const { getByText, getByTestId } = render(<SelectDate />);

        fireEvent.press(getByText('Von'));
        expect(getByTestId('datePicker')).not.toBeNull();

        fireEvent.press(getByText('Bis'));
        expect(getByTestId('datePicker')).not.toBeNull();
    });
});
