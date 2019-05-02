import React from 'react';

class AdvisorContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      advisors: [],
      fetching: true,
      error: null
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Merey</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default AdvisorContainer;