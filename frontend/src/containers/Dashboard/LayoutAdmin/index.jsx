import React from 'react';
import MenuDrawer from '../MenuDrawer';
import TopBar from '../TopBar';
import LayoutAdminStyle from './layoutAdmin.style';

export default function LayoutAdmin(props) {
  const { children, history } = props;
  return (
    <LayoutAdminStyle>
      <TopBar history={history} />
      <MenuDrawer />
      <div className="content">{children}</div>
    </LayoutAdminStyle>
  );
}
