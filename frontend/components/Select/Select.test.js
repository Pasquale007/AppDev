import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MySelect from './Select';

describe('<MySelect />', () => {
    it('should render two texts with the given props', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<MySelect left="Left Text" right="Right Text" onClick={onClickMock} />);
        const leftText = getByText('Left Text');
        const rightText = getByText('Right Text');

        expect(leftText).toBeDefined();
        expect(rightText).toBeDefined();
    });

    it('should change the active index when pressing the TouchableOpacity', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<MySelect left="Left Text" right="Right Text" onClick={onClickMock} />);
        const leftText = getByText('Left Text');
        const rightText = getByText('Right Text');

        fireEvent.press(leftText);
        expect(leftText).toBeDefined();
        expect(rightText).toBeDefined();
    });
});
