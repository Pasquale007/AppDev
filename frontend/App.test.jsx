import * as React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

jest.useFakeTimers()

describe('App', () => {
  it(`App renders correctly`, () => {
    const component = renderer.create(<App />).toJSON();
    expect(component).toBeDefined();
  });

});