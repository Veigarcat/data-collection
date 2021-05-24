import React from 'react';

import {
  Typography,
  Card,
  CardContent,
  Grid,
  InputBase,
  TextareaAutosize,
  Button,
  Tooltip,
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { toastMsgError } from '../../../commons/Toastify';
import InfoBaseStyle from './infoBase.style';
import TitleHeader from '../../../components/TitleHeader';

export default function InfoBase({ campaign, onHandleCampaign, setCampaign }) {
  const { t } = useTranslation();

  const handleFileSelected = () => async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('file', file);
    // const { data } = await api.upload.uploadFile({ formData });
    // if (data.status) {
    //   handleUpdateCatalog({ id, file: data.result.link });
    // } else {
    //   enqueueSnackbar(t('fileUploadError'), {
    //     variant: 'error',
    //   });
    // }
  };

  const onChangeTimeEnd = (date) => {
    if (
      Moment(date).isSameOrBefore(new Date()) &&
      Moment(date).isSameOrBefore(campaign.timeStart)
    ) {
      setCampaign((prev) => ({
        ...prev,
        timeStart: date,
      }));
    } else {
      toastMsgError(t('invalidDate'));
    }
  };
  const onChangeTimeStart = (date) => {
    if (
      Moment(date).isSameOrAfter(new Date()) &&
      Moment(date).isSameOrBefore(campaign.timeEnd)
    ) {
      setCampaign((prev) => ({
        ...prev,
        timeEnd: date,
      }));
    } else {
      toastMsgError(t('invalidDate'));
    }
  };
  return (
    <InfoBaseStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader title="Điền các thông tin cơ bản của chiến dịch" />
          <CardContent className="card-content">
            <Grid container className="campaign-container">
              <Grid item xs={2} sm={2}>
                <Typography variant="subtitle1" gutterBottom className="title">
                  Tên chiến dịch
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <InputBase
                  className="input-name-campaign"
                  inputProps={{ 'aria-label': 'naked' }}
                  name="name"
                  value={campaign.name}
                  onChange={onHandleCampaign}
                />
              </Grid>
            </Grid>
            <Grid container className="campaign-container">
              <Grid item sx={2} sm={2}>
                <Typography variant="subtitle1" gutterBottom className="title">
                  Nội dung chiến dịch
                </Typography>
              </Grid>
              <Grid item sx={8} sm={8}>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={5}
                  className="textarea"
                  name="desc"
                  value={campaign.desc}
                  onChange={onHandleCampaign}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sx={2} sm={2}>
                <Typography variant="subtitle1" gutterBottom className="title">
                  Hình ảnh chiến dịch
                </Typography>
              </Grid>
              <Grid item sx={5} sm={5}>
                <Button variant="contained" component="label">
                  <Tooltip title={t('upload')}>
                    <CloudUpload color="primary" className="-cloud-upload" />
                  </Tooltip>
                  <input
                    accept="image/*"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelected}
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid container className="campaign-container">
              <Grid item xs={6} sm={6} className="date-container">
                <Typography variant="subtitle1" gutterBottom className="title">
                  Thời gian bắt đầu
                </Typography>
                <DateTimePicker
                  inputVariant="outlined"
                  margin="normal"
                  format="yyyy-MM-dd HH:mm"
                  className="datetime"
                  cancelLabel={t('cancel')}
                  okLabel={t('ok')}
                  value={campaign.timeStart}
                  onChange={(date) => onChangeTimeStart(date)}
                />
              </Grid>
              <Grid item xs={6} sm={6} className="date-container">
                <Typography variant="subtitle1" gutterBottom className="title">
                  Thời gian kết thúc
                </Typography>
                <DateTimePicker
                  inputVariant="outlined"
                  margin="normal"
                  format="yyyy-MM-dd HH:mm"
                  className="datetime"
                  cancelLabel={t('cancel')}
                  okLabel={t('ok')}
                  value={campaign.timeEnd}
                  onChange={(date) => onChangeTimeEnd(date)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </InfoBaseStyle>
  );
}
