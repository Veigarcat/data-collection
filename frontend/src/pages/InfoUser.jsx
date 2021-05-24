import React from 'react';
import { Grid } from '@material-ui/core';

import NavigationContainer from '../containers/Dashboard/Navigation';
import InfoUserContainer from '../containers/InfoUser/InfoUser';
import OverviewCampaignContainer from '../containers/InfoUser/OverviewCampaign';
import routes from '../constants/route';

export default function InfoUser() {
  const navLink = [
    {
      title: 'Home',
      link: routes.HOME,
    },
    {
      title: 'Thông tin cá nhân',
    },
  ];
  return (
    <div>
      <NavigationContainer navLink={navLink} />
      <Grid container>
        <Grid item xs={6} sm={5}>
          <InfoUserContainer />
        </Grid>
        <hr />
        <Grid item xs={6} sm={5}>
          <OverviewCampaignContainer />
        </Grid>
      </Grid>
    </div>
  );
}
