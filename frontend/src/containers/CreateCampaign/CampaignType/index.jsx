import React from 'react';

import {
  Typography,
  Card,
  CardContent,
  FormControl,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import TitleHeader from '../../../components/TitleHeader';
import CampaignTypeStyle from './campaignType.style';

export default function CampaignType({
  campaign,
  // setCampaign,
  onHandleCampaign,
}) {
  return (
    <CampaignTypeStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader title="Thêm thông tin về loại chiến dịch" />
          <CardContent>
            <div className="add-type-campaign">
              <Grid container className="campaign-container">
                <Grid item xs={3} sm={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className="title"
                  >
                    Phạm vi chiến dịch
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9} className="grid-content">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="scope"
                      value={campaign.scope}
                      onChange={onHandleCampaign}
                    >
                      <FormControlLabel
                        value="public"
                        control={<Radio color="primary" />}
                        label="Public"
                        className="form-control-label"
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio color="primary" />}
                        label="Private"
                        className="form-control-label"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} sm={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className="title"
                  >
                    Loại tin nhắn
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9} className="grid-content">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="typeMessage"
                      value={campaign.typeMessage}
                      onChange={onHandleCampaign}
                    >
                      <FormControlLabel
                        value="text"
                        control={<Radio color="primary" />}
                        label="Text"
                        className="form-control-label"
                      />
                      <FormControlLabel
                        value="speech"
                        control={<Radio color="primary" />}
                        label="Speech"
                        className="form-control-label"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} sm={3}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className="title"
                  >
                    Đối tượng chat
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9} className="grid-content">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="objectMessage"
                      value={campaign.objectMessage}
                      onChange={onHandleCampaign}
                    >
                      <FormControlLabel
                        value="bot"
                        control={<Radio color="primary" />}
                        label="Bot"
                        className="form-control-label"
                      />
                      <FormControlLabel
                        value="human"
                        control={<Radio color="primary" />}
                        label="Người"
                        className="form-control-label"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </CampaignTypeStyle>
  );
}
