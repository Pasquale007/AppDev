import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CalendarPicker from './CalendarPicker';

describe('CalendarPicker', () => {
    it('shows modal when visible prop is true', () => {
        const { getByTestId } = render(<CalendarPicker visible={true} onSelect={() => { }} onClose={() => { }} />);
        const modal = getByTestId('modal');
        expect(modal).toBeDefined();
    });

    it('hides modal when visible prop is false', () => {
        const { queryByTestId } = render(<CalendarPicker visible={false} onSelect={() => { }} onClose={() => { }} />);
        const modal = queryByTestId('modal');
        expect(modal).toBeNull();
    });

    it('calls handleCancel when Abbruch button is pressed', () => {
        const onClose = jest.fn();
        const { getByText } = render(<CalendarPicker visible={true} onSelect={() => { }} onClose={onClose} />);
        const cancelButton = getByText('Abbruch');
        fireEvent.press(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });
});
