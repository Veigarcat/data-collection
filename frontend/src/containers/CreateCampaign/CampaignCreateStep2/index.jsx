import React from 'react';

import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
// import { useTranslation } from 'react-i18next';
import CreateCampaignStyle from './campaignCreateStep2.style';
import CalculatorScore from '../CalculatorScore';
import CreateUsecase from '../CreateUsecase';
import CreateIntent from '../CreateIntent';

export default function CreateCampaign({
  campaign,
  setCampaign,
  onHandleCampaign,
  intentList,
  usecaseList,
  setIntentList,
  setUsecaseList,
}) {
  // const { t } = useTranslation();
  return (
    <CreateCampaignStyle>
      <div className="create-campaign-container">
        {/* <Typography gutterBottom variant="h4" className="title-page">
          {t('createCampaign')}
        </Typography> */}
        <CalculatorScore campaign={campaign} setCampaign={setCampaign} />
        <div className="type-campaign">
          <Grid container className="select-container">
            <Grid item sm={4} sx={4} className="select-item">
              <Typography variant="subtitle1">Chọn kịch bản</Typography>
            </Grid>
            <Grid item sm={8} sx={8} className="select-item">
              <FormControl className="form-control-select">
                <Select
                  // defaultValue={1}
                  value={campaign.typeCampaign}
                  name="typeCampaign"
                  onChange={onHandleCampaign}
                >
                  <MenuItem value={1} className="select-component-item">
                    Tạo chiến dịch theo kịch bản
                  </MenuItem>
                  <MenuItem value={2} className="select-component-item">
                    Tạo chiến dịch theo ý định
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {campaign.typeCampaign === 1 && (
          <CreateUsecase
            campaign={campaign}
            setCampaign={setCampaign}
            usecaseList={usecaseList}
            setUsecaseList={setUsecaseList}
          />
        )}
        {campaign.typeCampaign === 2 && (
          <CreateIntent
            campaign={campaign}
            setCampaign={setCampaign}
            intentList={intentList}
            setIntentList={setIntentList}
          />
        )}
      </div>
    </CreateCampaignStyle>
  );
}
