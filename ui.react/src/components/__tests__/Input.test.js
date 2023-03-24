import { Input } from '../Input';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Input component', () => {
  test('it matches the snapshot', () => {
    const tree = renderer.create(<Input
      value='placeholder'
      autoComplete=''
      id='id'
      inputBoxLabel='>'
      key={123}
      label='MyInput'
      name="htmlName"
      onChange={() => {}}
      placeholder="placeholder"
      readOnly={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
