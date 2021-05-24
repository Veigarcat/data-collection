import React from 'react';
import TopBar from './TopBar';
import DashboardStyle from './dashboard.style';

export default function Dashboard(props) {
  const { children, history } = props;
  return (
    <DashboardStyle>
      <TopBar history={history} />
      <div className="content">{children}</div>
    </DashboardStyle>
  );
}
