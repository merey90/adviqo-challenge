import React from 'react';

function Advisor(props) {
  const { advisor } = props;
  return (
    <tr>
      <td>{advisor.fullName}</td>
      <td>{advisor.language}</td>
      <td>{advisor.status}</td>
      <td>{advisor.reviews}</td>
    </tr>
  );
}

export default Advisor;