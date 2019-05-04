import React from 'react';
import { shallow } from 'enzyme';

import AdvisorTableHead from './AdvisorTableHead';

const filter = {
  language: 'all',
  status: 'all',
  sortBy: 'reviews',
  sortDirection: 'desc'
};

test('render AdvisorTableHead', () => {
  const wrapper = shallow(
    <AdvisorTableHead
      filter={filter}
      sortHandler={()=>{}}
    />
  );
  expect(wrapper).toMatchSnapshot();
});