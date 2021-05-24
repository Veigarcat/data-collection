import React from 'react';
import UserMangeContainer from '../../containers/UserManage';

export default function UserManage(props) {
  const { history } = props;
  return (
    <div>
      <UserMangeContainer history={history} />
    </div>
  );
}
