import React from 'react';
import {
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  tableCell: {
    paddingLeft: '5px',
    paddingRight: '4px'
  }
});

function AdvisorTableHead (props) {
  const { filter, sortHandler, classes } = props;
  
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableCell}>
          Full name
        </TableCell>
        <TableCell className={classes.tableCell}>
          Language
        </TableCell>
        <TableCell className={classes.tableCell}>
          Status
        </TableCell>
        <TableCell
          align={'right'}
          className={classes.tableCell}
          sortDirection={filter.sortBy === 'reviews' ? filter.sortDirection : false}
        >
          <Tooltip
            title="Sort"
            enterDelay={300}
          >
            <TableSortLabel
              active={filter.sortBy === 'reviews'}
              direction={filter.sortDirection}
              onClick={() => sortHandler('reviews')}
            >
              Reviews
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  )
};

export default withStyles(styles)(AdvisorTableHead);