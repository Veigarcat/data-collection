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
  pageType,
  editorStateDesc,
  setEditorStateDesc,
}) {
  return (
    <CreateCampaignStyle>
      <div>
        <InfoBase
          campaign={campaign}
          setCampaign={setCampaign}
          onHandleCampaign={onHandleCampaign}
          pageType={pageType}
          editorStateDesc={editorStateDesc}
          setEditorStateDesc={setEditorStateDesc}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ParticipantInfo
              campaign={campaign}
              setCampaign={setCampaign}
              pageType={pageType}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <CampaignType
              campaign={campaign}
              setCampaign={setCampaign}
              onHandleCampaign={onHandleCampaign}
              pageType={pageType}
            />
          </Grid>
        </Grid>
      </div>
    </CreateCampaignStyle>
  );
}
