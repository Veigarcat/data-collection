import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, IconButton, MenuItem, Menu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import TopBarStyle from './topBar.style';

export default function MenuAppBar(props) {
  const { history } = props;
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TopBarStyle>
      <div>
        <AppBar position="fixed" className="root">
          <Toolbar className="topbar">
            <div className="topbar-left">
              <a href="/home" variant="h6" className="text">
                {t('LOGO')}
              </a>
            </div>
            <div className="topbar-right">
              <div>
                <a href="/info-user" className="text">
                  Trần Thị Thu Hương
                </a>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history.push('/info-user')}>
                    {t('profile')}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>{t('logout')}</MenuItem>
                </Menu>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </TopBarStyle>
  );
}
