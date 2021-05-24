import React from 'react';

import { Typography, Grid, InputBase, Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AppIdStyle from './appId.style';

export default function AppId({ campaign, onHandleCampaign, pageType }) {
  const { t } = useTranslation();
  return (
    <AppIdStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('addAppId')}
          </Typography>
        </div>
        <div className="cardBody">
          <Grid container className="campaign-container">
            <Grid item xs={2} sm={2}>
              <Typography variant="subtitle1">{t('appId')}</Typography>
            </Grid>
            <Grid item xs={10} sm={10}>
              <InputBase
                className="input-appId-campaign"
                inputProps={{ 'aria-label': 'naked' }}
                name="appId"
                value={campaign.appId}
                onChange={onHandleCampaign}
                disabled={pageType !== 'create'}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
    </AppIdStyle>
  );
}
