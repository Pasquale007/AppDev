import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './Splash';

jest.useFakeTimers();

describe('Splash Screen', () => {
    test('should call setIsLoading after 4 seconds', () => {
        const setIsLoading = jest.fn();
        render(<Splash setIsLoading={setIsLoading} />);
        jest.advanceTimersByTime(4000);
        expect(setIsLoading).toHaveBeenCalled();
    });
});
