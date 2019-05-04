import React from 'react';
import {
  TableCell,
  TableRow
} from '@material-ui/core';

function Advisor(props) {
  const { advisor } = props;
  return (
    <TableRow>
      <TableCell>{advisor.fullName}</TableCell>
      <TableCell>{advisor.language}</TableCell>
      <TableCell>{advisor.status}</TableCell>
      <TableCell align={'right'}>{advisor.reviews}</TableCell>
    </TableRow>
  );
}

export default Advisor;