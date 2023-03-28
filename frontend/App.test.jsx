import * as React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it(`App renders correctly`, () => {
    const component = renderer.create(<App />).toJSON();
    expect(component).toBeDefined();
  });

});