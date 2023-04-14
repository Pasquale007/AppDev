import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './Splash';

jest.mock('lottie-react-native', () => 'LottieView');
jest.useFakeTimers();

describe('Splash Screen', () => {
    test('should call setIsLoading after 3 seconds', () => {
        const setIsLoading = jest.fn();
        render(<Splash setIsLoading={setIsLoading} />);
        jest.advanceTimersByTime(3000);
        expect(setIsLoading).toHaveBeenCalled();
    });
});
