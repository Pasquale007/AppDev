import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  test('calls onClick when button is pressed', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button text="Search" onClick={onClick} />);
    const button = getByText('Search');
    fireEvent.press(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
