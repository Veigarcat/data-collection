import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Link } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
// import {} from '@material-ui/icons';
import routes from '../../../constants/route';

export default function MenuDrawer() {
  const menuList = [
    {
      title: 'Tổng quan',
      icon: <HomeWorkIcon />,
      link: routes.OVERVIEW,
    },
    {
      title: 'Quản lý người dùng',
      icon: <PeopleIcon />,
      link: routes.USER_MANAGE,
    },
    {
      title: 'Quản lý chiến dịch',
      icon: <ListAltIcon />,
      link: routes.CAMPAIGN_MANAGE,
    },
    {
      title: 'Quản lý tệp âm thanh',
      icon: <QueueMusicIcon />,
      link: routes.AUDIO_MANAGE,
    },
    {
      title: 'Thống kê - báo cáo',
      icon: <AssessmentIcon />,
      link: routes.REPORT,
    },
  ];
  return (
    <Drawer className="drawer" variant="permanent">
      <Toolbar />
      <div className="drawer-container">
        <List>
          {menuList.map((menu) => (
            <ListItem button key={menu.title}>
              <Link href={menu.link}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
              </Link>
              <Link href={menu.link} style={{ textDecoration: 'none' }}>
                <ListItemText primary={menu.title} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
