import { Button } from '../Button'
import React from 'react'
import renderer from 'react-test-renderer'
import dark from '../../state/colorScheme/dark.json'

describe('Button component', () => {
  test('it matches the snapshot', () => {
    const tree = renderer.create(<Button colours={dark} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
