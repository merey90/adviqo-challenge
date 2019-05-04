import React from 'react';
import {
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';

function AdvisorTableHead (props) {
  const { filter, sortHandler } = props;
	console.log("TCL: AdvisorTableHead -> filter", filter)
  
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          Full name
        </TableCell>
        <TableCell>
          Language
        </TableCell>
        <TableCell>
          Status
        </TableCell>
        <TableCell
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

export default AdvisorTableHead;