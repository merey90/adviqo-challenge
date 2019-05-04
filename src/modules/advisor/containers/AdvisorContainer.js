import React from 'react';
import Axios from 'axios';
import {
  Paper,
  Grid,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CircularProgress from '@material-ui/core/CircularProgress';

import Advisor from '../components/Advisor';
import FilterDialog from '../components/FilterDialog';
import { withStyles } from '@material-ui/core/styles';
import AdvisorTableHead from '../components/AdvisorTableHead';

const styles = theme => ({
  mainPapers: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto'
  },
  advisorContainer: {
    justifyContent: 'center'
  },
  fab: {
    position: 'fixed',
    bottom: '50px',
    right: '50px'
  },
  fabProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  table: {
    minWidth: 340,
  }
});

class AdvisorContainer extends React.Component {
  constructor (props) {
    super(props);

    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.triggerFilterDialog = this.triggerFilterDialog.bind(this);
    this.sortAdvisorsBy = this.sortAdvisorsBy.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      advisors: [],
      fetching: true,
      error: null,
      isFiltering: false,
      filter: {
        language: 'all',
        status: 'all',
        sortBy: 'reviews',
        sortDirection: 'desc',
        page: 0,
        count: 20
      },
      endOfPage: false
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, false);
    this.getAdvisors();
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll () {
    const { advisors, fetching, endOfPage } = this.state;
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) &&
      advisors.length && !fetching && !endOfPage
    ) {
      this.onPaginatedSearch();
    }
  }

  onPaginatedSearch () {
		this.getAdvisors(this.state.filter.page+1);
  }

  async getAdvisors (page = 0) {
    await this.setState({
      fetching: true,
      filter: {
        ...this.state.filter,
        page
      },
      endOfPage: !(page === 0)
    });
    if(page === 0) window.scrollTo(0, 0);

    const { filter } = this.state;
    const statusMap = {
      'all': -1,
      'online': 1,
      'offline': 0
    };

    let advisors = [];
    let body = {
      ...filter,
      sortDirection: filter.sortDirection === 'desc' ? '-1' : '1',
      status: statusMap[filter.status]
    }

    try {
      const result = await Axios.post('http://localhost:5000/advisors', body);
      advisors = await (new Promise((resolve) => {
        setTimeout(() => {
          resolve(result.data);
        }, 1200);
      }));
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
      advisors: filter.page > 0 ?
        [...this.state.advisors, ...advisors]
        : advisors,
      endOfPage: filter.page > 0 && advisors.length < filter.count
    });
  }

  async sortAdvisorsBy (column) {
    const filter = {...this.state.filter};
    let sortDirection = 'desc';
    if(column === filter.sortBy) {
      sortDirection = filter.sortDirection === 'desc' ? 'asc' : 'desc';
    }

    filter.sortBy = column;
    filter.sortDirection = sortDirection;

    await this.setState({ filter });

    // Do not fetch from backend if we already have all results
    if(this.state.endOfPage) {
      const advisors = this.state.advisors.sort(
        (current, next) => {
          let comparatorA = current, comparatorB = next;
          if(sortDirection === 'desc') {
            comparatorA = next;
            comparatorB = current;
          }
          if(comparatorA[column] < comparatorB[column]) return -1;
          if(comparatorA[column] > comparatorB[column]) return 1;
          return 0;
        }
      );

      this.setState({ advisors });
    } else {
      this.getAdvisors();
    }
  }

  handleInputChange (e) {
    const { value, name } = e.target;
    const filter = {...this.state.filter};
    filter[name] = value;
    this.setState({
      filter
    });
  }

  handleFilterSubmit (e) {
    e.preventDefault();
    this.setState({ isFiltering: false });
    this.getAdvisors();
  }

  triggerFilterDialog () {
    this.setState({ isFiltering: !this.state.isFiltering });
  }

  render () {
    const { classes } = this.props;
    const { fetching, advisors } = this.state;
    return (
      <div>
        <div className={classes.fab}>
          <Fab color="secondary" aria-label="Search"
            onClick={this.triggerFilterDialog}
          >
            <FilterListIcon />
          </Fab>
          {fetching && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
        <Grid container className={classes.advisorContainer}>
          <Grid item xs={12} sm={10} md={6} lg={6}>
            <FilterDialog
              isFiltering={this.state.isFiltering}
              handleInputChange={this.handleInputChange}
              handleFilterSubmit={this.handleFilterSubmit}
              triggerFilterDialog={this.triggerFilterDialog}
              filter={this.state.filter}
            />
            <Paper className={classes.mainPapers}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <AdvisorTableHead
                  filter={this.state.filter}
                  sortHandler={this.sortAdvisorsBy}
                />
                <TableBody>
                  {advisors.map(advisor =>
                    <Advisor key={advisor.id} advisor={advisor} />)}
                  {!fetching && !advisors.length ? 
                    <TableRow>
                      <TableCell colSpan={4} className={classes.tableCell}>
                        No results found
                      </TableCell>
                    </TableRow> : null}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withStyles(styles)(AdvisorContainer);