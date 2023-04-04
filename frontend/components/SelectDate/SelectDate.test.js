import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectDate from './SelectDate';

describe('SelectDate', () => {
  it('should render "Von" and "Bis" labels', () => {
    const { getByText } = render(<SelectDate />);
    expect(getByText('Von')).toBeDefined();
    expect(getByText('Bis')).toBeDefined();
  });
});
