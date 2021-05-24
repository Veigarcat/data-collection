import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function MenuDrawer() {
  const menuList = [
    {
      title: 'Tổng quan',
      icon: <HomeWorkIcon />,
    },
    {
      title: 'Quản lý người dùng',
      icon: <PeopleIcon />,
    },
    {
      title: 'Quản lý chiến dịch',
      icon: <ListAltIcon />,
    },
    {
      title: 'Thống kê - báo cáo',
      icon: <AssessmentIcon />,
    },
  ];
  return (
    <Drawer className="drawer" variant="permanent">
      <Toolbar />
      <div className="drawer-container">
        <List>
          {menuList.map((menu) => (
            <ListItem button key={menu.title}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
