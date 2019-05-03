import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import FilterForm from './FilterForm';

const filter = {
  language: 'all',
  status: 'all',
  sortBy: 'reviews',
  sortDirection: 'desc'
};

it('should handle input change', () => {
  let inputChanged = 0;

  const handleInputChange = (e) => {
    inputChanged++;
  }

  const filterForm = shallow(
    <FilterForm
      filter={filter}
      handleInputChange={handleInputChange}
      handleFormSubmit={()=>{}}/>
  );

  filterForm.find('input[name="status"]').at(2).simulate('change');
  filterForm.find('select[name="language"]').simulate('change');

  expect(inputChanged).toEqual(2);
});

test('render FilterForm', () => {
  const component = renderer.create(
    <FilterForm
      filter={filter}
      handleInputChange={()=>{}}
      handleFormSubmit={()=>{}}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});