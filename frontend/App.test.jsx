import * as React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

jest.useFakeTimers()
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  useFonts: () => [true]
}));

describe('App', () => {
  it(`App renders correctly`, () => {
    act(() => {
      const component = renderer.create(<App />).toJSON();
      expect(component).toBeDefined();
    });
  });
});