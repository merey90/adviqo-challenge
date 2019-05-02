import React from 'react';
import { shallow } from 'enzyme';

import AdvisorContainer from './AdvisorContainer';

it('renders without crashing', () => {
  shallow(<AdvisorContainer />);
});