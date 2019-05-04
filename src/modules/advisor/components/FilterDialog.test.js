import React from 'react';
import { shallow } from 'enzyme';

import FilterDialog from './FilterDialog';

const filter = {
  language: 'all',
  status: 'all',
  sortBy: 'reviews',
  sortDirection: 'desc'
};

test('render FilterDialog', () => {
  const wrapper = shallow(
    <FilterDialog
      isFiltering
      filter={filter}
      handleInputChange={()=>{}}
      handleFilterSubmit={()=>{}}
      triggerFilterDialog={()=>{}}/>
  );
  expect(wrapper).toMatchSnapshot();
});