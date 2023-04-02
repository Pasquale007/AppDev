import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropDown from './SearchableDropdown';

describe('DropDown', () => {
    const data = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
    ];

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

    it('should filter data on search', () => {
        const { getByTestId, queryByText } = render(<DropDown title="Select an item" data={data} icon="aircraft-take-off" />);
        const touchable = getByTestId('touchable');
        fireEvent.press(touchable);
        const searchInput = getByTestId('search-input');
        fireEvent.changeText(searchInput, 'item 1');
        expect(queryByText('Item 2')).toBeNull();
        expect(queryByText('Item 3')).toBeNull();
        expect(queryByText('Item 1')).toBeDefined();
    });

});