import React from 'react';

import {
  Typography,
  Card,
  FormControl,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CampaignTypeStyle from './campaignType.style';

export default function CampaignType({ campaign, onHandleCampaign, pageType }) {
  const { t } = useTranslation();
  return (
    <CampaignTypeStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('addInfoCampaignType')}
          </Typography>
        </div>
        <div className="cardBody">
          <div className="add-type-campaign">
            <Grid container className="campaign-container">
              <Grid item xs={3} sm={3}>
                <Typography variant="subtitle1" className="title">
                  Phạm vi chiến dịch
                </Typography>
              </Grid>
              <Grid item xs={9} sm={9} className="grid-content">
                <FormControl
                  component="fieldset"
                  className="form-control-radio"
                >
                  <RadioGroup
                    row
                    aria-label="position"
                    name="scope"
                    value={campaign.scope}
                    onChange={onHandleCampaign}
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio color="primary" />}
                      label="Public"
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="private"
                      control={<Radio color="primary" />}
                      label="Private"
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Divider className="divider" />
            <Grid container>
              <Grid item xs={3} sm={3}>
                <Typography variant="subtitle1" className="title">
                  Loại tin nhắn
                </Typography>
              </Grid>
              <Grid item xs={9} sm={9} className="grid-content">
                <FormControl
                  component="fieldset"
                  className="form-control-radio"
                >
                  <RadioGroup
                    row
                    aria-label="position"
                    name="messageType"
                    value={campaign.messageType}
                    onChange={onHandleCampaign}
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="msg_text"
                      control={<Radio color="primary" />}
                      label={t('msg_text')}
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="msg_voice"
                      control={<Radio color="primary" />}
                      label={t('msg_voice')}
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Divider className="divider" />
            <Grid container>
              <Grid item xs={3} sm={3}>
                <Typography variant="subtitle1" className="title">
                  Đối tượng chat
                </Typography>
              </Grid>
              <Grid item xs={9} sm={9} className="grid-content">
                <FormControl
                  component="fieldset"
                  className="form-control-radio"
                >
                  <RadioGroup
                    row
                    aria-label="position"
                    name="messageObject"
                    value={campaign.messageObject}
                    onChange={onHandleCampaign}
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="bot"
                      control={<Radio color="primary" />}
                      label="Người với bot"
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="human"
                      control={<Radio color="primary" />}
                      label="Người với Người"
                      className="form-control-label"
                      disabled={pageType !== 'create'}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Divider className="divider" />
            <Grid container>
              <Grid item xs={3} sm={3}>
                <Typography variant="subtitle1" className="title">
                  Kiểu thu thập
                </Typography>
              </Grid>
              <Grid item xs={9} sm={9} className="grid-content">
                <FormControl
                  component="fieldset"
                  className="form-control-radio"
                >
                  <RadioGroup
                    row
                    aria-label="position"
                    value={campaign.collectType}
                    name="collectType"
                    onChange={onHandleCampaign}
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="usecase"
                      control={<Radio color="primary" />}
                      label="Tạo chiến dịch theo kịch bản"
                      className="form-control-label type-campaign"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="intent"
                      control={<Radio color="primary" />}
                      label="Tạo chiến dịch theo ý định"
                      className="form-control-label type-campaign"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="free"
                      control={<Radio color="primary" />}
                      label="Tạo chiến dịch tự do"
                      className="form-control-label type-campaign"
                      disabled={pageType !== 'create'}
                    />
                    <FormControlLabel
                      value="topic"
                      control={<Radio color="primary" />}
                      label="Tạo chiến dịch theo topic"
                      className="form-control-label type-campaign"
                      disabled={pageType !== 'create'}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
    </CampaignTypeStyle>
  );
}
