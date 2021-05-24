import React from 'react';

import { Grid } from '@material-ui/core';
import CreateCampaignStyle from './campaignCreateStep1.style';
import ParticipantInfo from '../ParticipantInfo';
import InfoBase from '../InfoBase';
import CampaignType from '../CampaignType';

export default function CreateCampaignStep1({
  campaign,
  setCampaign,
  onHandleCampaign,
}) {
  return (
    <CreateCampaignStyle>
      <div>
        <InfoBase
          campaign={campaign}
          setCampaign={setCampaign}
          onHandleCampaign={onHandleCampaign}
        />
        <Grid container>
          <Grid item sm={6} sx={12}>
            <ParticipantInfo campaign={campaign} setCampaign={setCampaign} />
          </Grid>
          <Grid item sm={6} sx={12}>
            <CampaignType
              campaign={campaign}
              setCampaign={setCampaign}
              onHandleCampaign={onHandleCampaign}
            />
          </Grid>
        </Grid>
      </div>
    </CreateCampaignStyle>
  );
}
