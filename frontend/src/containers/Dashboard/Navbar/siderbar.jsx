import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Icon,
  Collapse,
  ListItemIcon,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { groupMenuNames } from '../../../configs/routeConfig';
import { SidebarWrapper, DrawerMobile } from './index.style';

const Sidebar = (props) => {
  const {
    menu,
    openSidebarWindow,
    openSidebarMobile,
    handleDrawerToggle,
  } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = useState(null);
  const [groupActived, setGroupActived] = useState(null);

  const checkMenuActive = (route) => pathname === route;

  const checkGroupMenuActive = (groupName) => groupName === groupActived;

  useEffect(() => {
    Object.keys(menu)
      .filter((key) => typeof menu[key] !== 'function')
      .every((key) => {
        const groupMenu = menu[key];
        const checked = groupMenu.items.every((item) => {
          const menuActive = checkMenuActive(item.route);
          if (menuActive && openGroup !== groupMenu.name) {
            setOpenGroup(groupMenu.name);
            setGroupActived(groupMenu.name);
            return false;
          }
          return true;
        });
        if (!checked) return false;
        return true;
      });
  }, []);

  const handleChangeOpenGroup = (name) => {
    setOpenGroup((group) => (group !== name ? name : null));
  };

  const renderMenu = (groupMenu, isRightTopMenu) => (
    <div className={classNames({ ' rightTopMenuWrapper': isRightTopMenu })}>
      <List
        component="div"
        disablePadding
        className={classNames({ ' rightTopMenu': isRightTopMenu })}
      >
        {groupMenu.items.map(({ name, logo, route }) => {
          const isMenuActive = checkMenuActive(route);

          return (
            <div key={route}>
              <Link to={route} className="router-link">
                <ListItem
                  button
                  className={classNames('nested', 'menuItem', {
                    ' backgroundPrimary': isMenuActive,
                  })}
                >
                  <ListItemIcon className="menuIcon">
                    <Icon aria-label={name}>{logo}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={t(name)} className="menuTitle" />
                </ListItem>
              </Link>
            </div>
          );
        })}
      </List>
    </div>
  );

  const renderGroupMenu = (groupName, isMenuActive, isMobile) => (
    <div key={groupName} className="groupMenu">
      <ListItem
        button
        onClick={() =>
          openSidebarWindow && handleChangeOpenGroup(menu[groupName].name)
        }
        className={classNames('menuItem', {
          ' backgroundPrimary':
            isMenuActive && openGroup !== menu[groupName].name,
        })}
      >
        <ListItemIcon
          className={classNames('menuIcon', {
            ' primary': isMenuActive,
          })}
        >
          <Icon>{menu[groupName].logo}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={t(menu[groupName].name)}
          className={classNames('menuTitle', {
            ' hide': !isMobile && !openSidebarWindow,
            ' primary': isMenuActive,
          })}
        />
        {openGroup === menu[groupName].name ? (
          <ExpandLess
            className={classNames({
              ' hide': !isMobile && !openSidebarWindow,
              ' primary': isMenuActive,
            })}
          />
        ) : (
          <ExpandMore
            className={classNames({
              ' hide': !isMobile && !openSidebarWindow,
              ' primary': isMenuActive,
            })}
          />
        )}
      </ListItem>
      <Collapse
        in={
          (isMobile || openSidebarWindow) && openGroup === menu[groupName].name
        }
        timeout="auto"
        unmountOnExit
      >
        {renderMenu(menu[groupName])}
      </Collapse>
      {!isMobile && !openSidebarWindow && renderMenu(menu[groupName], true)}
    </div>
  );

  const renderSidebarMobile = () => (
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="right"
        open={openSidebarMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerMobile>
          <div className="drawerMobile">
            <List>
              {groupMenuNames.map((groupName) => {
                if (menu[groupName]) {
                  const isMenuActive = checkGroupMenuActive(
                    menu[groupName].name,
                  );
                  return renderGroupMenu(groupName, isMenuActive, true);
                }
                return null;
              })}
            </List>
          </div>
        </DrawerMobile>
      </Drawer>
    </Hidden>
  );

  const renderSidebarWindow = () => (
    <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        open={openSidebarWindow}
        classes={{
          paper: classNames('drawer', {
            ' drawerOpen': openSidebarWindow,
            ' drawerClose': !openSidebarWindow,
          }),
        }}
      >
        <List>
          {groupMenuNames.map((groupName) => {
            if (menu[groupName]) {
              const isMenuActive = checkGroupMenuActive(menu[groupName].name);
              if (menu[groupName].items) {
                const items = menu[groupName].items.filter(
                  ({ isShow }) => !isShow,
                );
                if (items.length) {
                  menu[groupName].items = items;
                  return renderGroupMenu(groupName, isMenuActive);
                }
              }
            }
            return null;
          })}
        </List>
      </Drawer>
    </Hidden>
  );

  return (
    <SidebarWrapper>
      {renderSidebarWindow()}
      {renderSidebarMobile()}
    </SidebarWrapper>
  );
};

export default Sidebar;
