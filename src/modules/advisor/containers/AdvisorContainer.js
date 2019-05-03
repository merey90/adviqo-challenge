import React from 'react';
import Advisor from '../components/Advisor';

class AdvisorContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      advisors: [],
      fetching: true,
      error: null,
      filter: {
        language: 'all',
        status: 'all',
        sortBy: 'reviews',
        sortDirection: 'desc'
      }
    }
  }

  componentDidMount () {
    this.getAdvisors();
  }

  async getAdvisors () {
    this.setState({
      fetching: true
    });

    let advisors = [];
    try {
      advisors = await this.mockBackend(this.state.filter);
    } catch (error) {
      this.setState({
        error
      });
    } finally {
      this.setState({
        fetching: false
      });
    }

    this.setState({
      advisors
    });
  }

  async mockBackend (filter) {
    return new Promise((resolve) => {
      const dbAdvisors = [{
        id: 2,
        fullName: 'Merey Zholdas',
        language: 'kazakh',
        status: 'online',
        reviews: 4
      }, {
        id: 1,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'online',
        reviews: 10
      }];

      let result = [];

      result = dbAdvisors.filter(advisor => 
        ((filter.status !== 'all' && advisor.status === filter.status) || filter.status === 'all')
        && ((filter.language !== 'all' && advisor.language === filter.language) || filter.language === 'all')
      );

      result = result.sort(
        (current, next) => {
          let comparatorA = current, comparatorB = next;
          if(filter.sortDirection === 'desc') {
            comparatorA = next;
            comparatorB = current;
          }
          if(comparatorA[filter.sortBy] < comparatorB[filter.sortBy]) return -1;
          if(comparatorA[filter.sortBy] > comparatorB[filter.sortBy]) return 1;
          return 0;
        }
      );
      setTimeout(() => {
        resolve(result);
      }, 1500);
    });
  }

  async sortAdvisorsBy (column) {
    const { filter } = this.state;
    let sortDirection = 'desc';
    if(column === filter.sortBy) {
      sortDirection = filter.sortDirection === 'desc' ? 'asc' : 'desc';
    }

    const newFilter = {
      ...filter,
      sortBy: column,
      sortDirection
    };

    await this.setState({
      filter: newFilter
    });

    this.getAdvisors();
  }

  render () {
    const { fetching, advisors } = this.state;
    return (
      <div className='advisor-container'>
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Language</th>
              <th>Status</th>
              <th onClick={() => this.sortAdvisorsBy('reviews')}>Reviews</th>
            </tr>
          </thead>
          <tbody>
            {!fetching ?
              advisors.map(advisor => <Advisor key={advisor.id} advisor={advisor} />)
              : <tr><td colSpan='4'>Loading...</td></tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
};

export default AdvisorContainer;