import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropDown from './SearchableDropdown';
import flightData from '../../data/flightData.json'
describe('DropDown', () => {
    const data = flightData;

    it('should render title and default selected item', () => {
        const title = 'Select an item';
        const { getByText } = render(<DropDown title={title} data={data} icon="aircraft-take-off" />);
        expect(getByText(title)).toBeDefined();
        expect(getByText('Select item')).toBeDefined();
    });

    it('should open the modal on press', () => {
        const { getByTestId } = render(<DropDown title="Select an item" data={data} icon="aircraft-take-off" />);
        const touchable = getByTestId('touchable');
        fireEvent.press(touchable);
        expect(getByTestId('modal')).toBeDefined();
    });
});