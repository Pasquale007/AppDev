import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyFlights from './EmptyFlights';

describe('EmptyFlights', () => {
    it('should render text', () => {
        const { getByText } = render(<EmptyFlights />);
        expect(getByText('Für deine Suche wurden leider Keine Flüge gefunden. Setzte doch einen Alert um über Änderrungen informiert zu werden.')).toBeTruthy();
    });
});
