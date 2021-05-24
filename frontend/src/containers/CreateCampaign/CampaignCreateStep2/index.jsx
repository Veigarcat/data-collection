import React from 'react';
import { Grid } from '@material-ui/core';
import CreateCampaignStyle from './campaignCreateStep2.style';
import CalculatorScore from '../CalculatorScore';
import CreateUsecase from '../CreateUsecase';
import CreateIntent from '../CreateIntent';
import AppId from '../AppId';

export default function CreateCampaign({
  campaign,
  setCampaign,
  intentList,
  usecaseList,
  setIntentList,
  setUsecaseList,
  onHandleCampaign,
  pageType,
  intentListApi,
  setIntentListApi,
}) {
  return (
    <CreateCampaignStyle>
      <div className="create-campaign-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <AppId
              campaign={campaign}
              onHandleCampaign={onHandleCampaign}
              pageType={pageType}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <CalculatorScore
              campaign={campaign}
              setCampaign={setCampaign}
              pageType={pageType}
            />
          </Grid>
        </Grid>
        {campaign.collectType === 'usecase' && (
          <CreateUsecase
            campaign={campaign}
            setCampaign={setCampaign}
            usecaseList={usecaseList}
            setUsecaseList={setUsecaseList}
            pageType={pageType}
            intentListApi={intentListApi}
            setIntentListApi={setIntentListApi}
          />
        )}
        {campaign.collectType === 'intent' && (
          <CreateIntent
            campaign={campaign}
            setCampaign={setCampaign}
            intentList={intentList}
            setIntentList={setIntentList}
            pageType={pageType}
            intentListApi={intentListApi}
            setIntentListApi={setIntentListApi}
          />
        )}
      </div>
    </CreateCampaignStyle>
  );
}
