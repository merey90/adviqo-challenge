import React from 'react';
import { shallow } from 'enzyme';

import Advisor from './Advisor';

const advisor = {
  id: 1,
  fullName: 'Merey Zholdas',
  language: 'Kazakh',
  status: 'online',
  reviews: 4
};

test('render Advisor', () => {
  const component = shallow(<Advisor key={advisor.id} advisor={advisor} />);
  expect(component).toMatchSnapshot();
});