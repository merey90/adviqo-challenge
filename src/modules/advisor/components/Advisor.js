import React from 'react';
import {
  TableCell,
  TableRow
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  tableCell: {
    paddingLeft: '5px',
    paddingRight: '4px'
  }
});

function Advisor(props) {
  const { advisor, classes } = props;
  return (
    <TableRow>
      <TableCell className={classes.tableCell}>{advisor.fullName}</TableCell>
      <TableCell className={classes.tableCell}>{advisor.language}</TableCell>
      <TableCell className={classes.tableCell}>{advisor.status}</TableCell>
      <TableCell className={classes.tableCell} align={'right'}>
        {advisor.reviews}
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(Advisor);