import React from 'react';
import {
  TableCell,
  TableRow,
  Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

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
      <TableCell className={classes.tableCell}>
      <Tooltip
        title={!!advisor.status ? 'online':'offline'}
        enterDelay={300}
      >
        {!!advisor.status ?
          <RadioButtonChecked
            fontSize="large"
            color="primary"
          /> :
          <RadioButtonUnchecked
            fontSize="large"
            color="error"
          />
        }
      </Tooltip>
      </TableCell>
      <TableCell className={classes.tableCell} align={'right'}>
        {advisor.reviews}
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(Advisor);