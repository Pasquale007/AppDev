import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateAlertModal from './CreateAlertModal';
import { Notifications } from 'expo-notifications';

jest.mock('expo-notifications', () => {
  return {
    ...jest.requireActual('expo-notifications'),
    getExpoPushTokenAsync: jest.fn().mockResolvedValue({ data: 'dummy-token' })
  };
});

describe('CreateAlertModal', () => {
    const onBackdropPress = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();

    const data = {
        origin: { name: 'München' },
        destination: { name: 'Berlin' },
        outFromDate: '2023-05-01',
        outToDate: '2023-05-05',
        lengthMin: 2,
        lengthMax: 5,
        onBackdropPress: onBackdropPress,
        onError: onError,
        onSuccess: onSuccess,
    }

    it('should render correctly', () => {
        const { getByTestId } = render(
            <CreateAlertModal
                isVisible={true}
                onBackdropPress={() => { }}
                data={data}
                onSuccess={() => { }}
                onError={() => { }}
            />
        );

        expect(getByTestId("headline")).not.toBeNull();
        expect(getByTestId("closeBtn")).not.toBeNull();
        expect(getByTestId("saveBtn")).not.toBeNull();
    });

    it('should close on closeButton press', () => {
        const { getByTestId } = render(
            <CreateAlertModal
                isVisible={true}
                onBackdropPress={onBackdropPress}
                data={data}
                onSuccess={() => { }}
                onError={() => { }}
            />
        );
        fireEvent.press(getByTestId("closeBtn"));
        expect(onBackdropPress).toHaveBeenCalled();
    });

    it('should show error message if maxPrice is empty', () => {
        const { getByTestId } = render(
            <CreateAlertModal
                isVisible={true}
                onBackdropPress={onBackdropPress}
                data={data}
                onSuccess={() => { }}
                onError={onError}
            />
        );

        fireEvent.press(getByTestId('saveBtn'));

        expect(onError).toHaveBeenCalledWith('Der Preis darf nicht leer sein!');
        expect(onBackdropPress).toHaveBeenCalled();
    });

    it('should show error message if maxPrice is too high', () => {
        const { getByPlaceholderText, getByText } = render(
            <CreateAlertModal
                isVisible={true}
                onBackdropPress={onBackdropPress}
                data={data}
                onSuccess={() => { }}
                onError={onError}
            />
        );

        const maxPriceInput = getByPlaceholderText('150,00');
        fireEvent.changeText(maxPriceInput, '2000000');
        fireEvent.press(getByText('Speichern'));

        expect(onError).toHaveBeenCalledWith('Der Preis ist zu hoch!');
        expect(onBackdropPress).toHaveBeenCalled();
    });
})