import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Advisor from './Advisor';

const advisor = {
  id: 1,
  fullName: 'Merey Zholdas',
  language: 'Kazakh',
  status: 'online',
  reviews: 4
};

it('renders without crashing', () => {
  shallow(<Advisor key={advisor.id} advisor={advisor} />);
});

test('render Advisor with proper values', () => {
  const component = renderer.create(
    <Advisor key={advisor.id} advisor={advisor} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});