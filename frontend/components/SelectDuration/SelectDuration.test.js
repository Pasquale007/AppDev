import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectDuration from './SelectDuration';

describe('SelectDuration', () => {
    it('should call setValues with correct start and end values', () => {
        const setValuesMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(<SelectDuration onSelect={setValuesMock} />);
        const startInput = getByPlaceholderText('1');
        const endInput = getByPlaceholderText('15');
        fireEvent.changeText(startInput, '10');
        fireEvent.changeText(endInput, '15');
        expect(setValuesMock).toHaveBeenCalledWith({ start: '10', end: '15' });
    });
});
