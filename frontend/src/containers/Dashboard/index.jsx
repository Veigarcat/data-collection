import React from 'react';
// import TopBar from './TopBar';
import DashboardStyle from './dashboard.style';
import Navbar from './Navbar/navbar';

export default function Dashboard(props) {
  const { children, history } = props;
  return (
    <DashboardStyle>
      <Navbar />
      {/* <TopBar history={history} /> */}
      <div className="content">{children}</div>
    </DashboardStyle>
  );
}
