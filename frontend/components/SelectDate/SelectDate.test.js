import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectDate from './SelectDate';

describe('SelectDate', () => {
    it('should show date pickers when user taps on Display components', () => {
        const onSelect = jest.fn();
        const { getByText, getByTestId } = render(<SelectDate onSelect={onSelect} />);

        fireEvent.press(getByText('Von'));
        expect(getByTestId('datePicker1')).not.toBeNull();

        fireEvent.press(getByText('Bis'));
        expect(getByTestId('datePicker2')).not.toBeNull();
    });
});
