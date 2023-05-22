import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FlightResult from './FlightResult';

describe('FlightResult component', () => {
  const data = {
    origin: "NUE",
    destination: "BNX",
    outboundDate: "2023-05-02T00:00:00.000Z",
    outboundPrice: 19.95,
    inboundDate: "2023-05-13T00:00:00.000Z",
    inboundPrice: 16.99,
    bookingLink: 'https:some-link.com',
    totalPrice: 36.94
  };

  test('renders the flight information correctly', () => {
    const { getByText } = render(<FlightResult data={data} />);
    expect(getByText('Hinflug')).toBeTruthy();
    expect(getByText('Rückflug')).toBeTruthy();
    expect(getByText('Zusammen ab')).toBeTruthy();
    expect(getByText('Jetzt buchen')).toBeTruthy();
  });
});
