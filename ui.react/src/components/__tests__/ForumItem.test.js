import { Button } from '../Button';
import React from 'react';
import renderer from 'react-test-renderer';
import dark from '../../containers/context/dark.json'
import ForumItem from '../ForumItem';

describe('ForumItem component', () => {
  test('it matches the snapshot', () => {
    const tree = renderer.create(
    <ForumItem 
      data={{
        id: 1,
        date: '2023-01-14 14:48:38.688870',
        author: 'test',
        body: 'lorem',
        title: 'title',
       views: 123,
        category: 'general',
        author_id: 123
      }}
    />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
