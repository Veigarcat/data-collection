/* eslint-disable no-console */
import React, { useState } from 'react';
import { Card, Link, Avatar, Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MessageHeaderStyle from './messageHeader.style';

export default function MessageHeader({ dataInfoCampaign }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { campaignId } = useParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <MessageHeaderStyle>
      <Card className="header-chat">
        <Card className="user-chat">
          <Link
            href={`/home/${campaignId}/info-campaign`}
            color="inherit"
            underline="none"
          >
            <Avatar
              className="campaign-avatar"
              alt="campaign name"
              src="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
            />
          </Link>
          <div className="info-user-chat-header">
            <Link
              href={`/home/${campaignId}/info-campaign`}
              color="inherit"
              underline="none"
            >
              {dataInfoCampaign && dataInfoCampaign.name}
            </Link>
          </div>
        </Card>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem>{t('search')}</MenuItem>
          {/* <MenuItem onClick={handleShowSearch}>{t('search')}</MenuItem> */}
          <MenuItem>
            <Link
              href={`/${campaignId}/result-user`}
              color="inherit"
              underline="none"
            >
              {t('progress')}
            </Link>
          </MenuItem>
        </Menu>
      </Card>
    </MessageHeaderStyle>
  );
}
