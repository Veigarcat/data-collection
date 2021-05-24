import React from 'react';
import { Grid } from '@material-ui/core';

import Detail from './Detail';
import Ranking from './Ranking';
import CampaignDetailStyle from './campaignDetail.style';

export default function campaignDetail({ history }) {
  return (
    <CampaignDetailStyle>
      <Grid container className="campaign-detail-container" spacing={2}>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Detail history={history} />
        </Grid>
        <Grid item s={12} sm={12} md={3} lg={3} xl={3}>
          <Ranking />
        </Grid>
      </Grid>
    </CampaignDetailStyle>
  );
}
