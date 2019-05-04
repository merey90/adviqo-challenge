import React from 'react';
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

    this.state = {
      advisors: [],
      fetching: true,
      error: null,
      isFiltering: false,
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
        id: 1,
        fullName: 'Merey Zholdas',
        language: 'kazakh',
        status: 'online',
        reviews: 4
      }, {
        id: 2,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 3,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 4,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 5,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 6,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 7,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 8,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 9,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 10,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 11,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 12,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 13,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 14,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 15,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 16,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 17,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 18,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 19,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 20,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 21,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 22,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 23,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 24,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 25,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 26,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 27,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 28,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
        reviews: 10
      }, {
        id: 29,
        fullName: 'Bruce Wayne',
        language: 'english',
        status: 'offline',
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
		console.log("TCL: sortAdvisorsBy -> column", column)
    const filter = {...this.state.filter};
    let sortDirection = 'desc';
    if(column === filter.sortBy) {
      sortDirection = filter.sortDirection === 'desc' ? 'asc' : 'desc';
    }

    filter.sortBy = column;
    filter.sortDirection = sortDirection;

    await this.setState({ filter });

    this.getAdvisors();
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