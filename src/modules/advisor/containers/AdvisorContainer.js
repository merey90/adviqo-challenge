import React from 'react';
import Advisor from '../components/Advisor';

class AdvisorContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      advisors: [{
        id: 1,
        fullName: 'Merey Zholdas',
        language: 'Kazakh',
        status: 'online',
        reviews: 4
      }],
      fetching: false,
      error: null
    }
  }

  render() {
    const { fetching, advisors } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>Full name</th>
            <th>Language</th>
            <th>Status</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {!fetching ?
            advisors.map(advisor => <Advisor key={advisor.id} advisor={advisor} />)
            : <tr><td colSpan='4'>Loading...</td></tr>
          }
        </tbody>
      </table>
    );
  }
};

export default AdvisorContainer;