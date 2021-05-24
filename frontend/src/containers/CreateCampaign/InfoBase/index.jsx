import React from 'react';

import {
  Typography,
  Card,
  Grid,
  InputBase,
  Button,
  Tooltip,
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import Moment from 'moment';
import './editor.css';

import { toastMsgError } from '../../../commons/Toastify';
import InfoBaseStyle from './infoBase.style';

export default function InfoBase({
  campaign,
  onHandleCampaign,
  setCampaign,
  pageType,
  editorStateDesc,
  setEditorStateDesc,
}) {
  const { t } = useTranslation();
  const onEditorStateChange = async (editorState) => {
    setEditorStateDesc(editorState);
    await setCampaign((prev) => ({
      ...prev,
      desc: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    }));
  };
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
      Moment(date).isSameOrAfter(new Date()) &&
      Moment(date).isSameOrAfter(campaign.timeStart)
    ) {
      setCampaign((prev) => ({
        ...prev,
        timeEnd: date,
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
        timeStart: date,
      }));
    } else {
      toastMsgError(t('invalidDate'));
    }
  };
  return (
    <InfoBaseStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('infoCampaignBase')}
          </Typography>
        </div>
        <div className="cardBody">
          <Grid container className="campaign-container">
            <Grid item xs={2} sm={2}>
              <Typography variant="subtitle1" className="title">
                {t('campaignName')}
              </Typography>
            </Grid>
            <Grid item xs={10} sm={10}>
              <InputBase
                className="input-name-campaign"
                inputProps={{ 'aria-label': 'naked' }}
                name="name"
                value={campaign.name}
                onChange={onHandleCampaign}
                disabled={pageType === 'view'}
              />
            </Grid>
          </Grid>
          <Grid container className="campaign-container">
            <Grid item sx={2} sm={2}>
              <Typography variant="subtitle1" gutterBottom className="title">
                {t('campaignDescription')}
              </Typography>
            </Grid>
            <Grid item sx={10} sm={10}>
              <div className="editor">
                {pageType === 'view' && (
                  <Editor
                    toolbarHidden
                    editorState={editorStateDesc}
                    readOnly="true"
                  />
                )}
                {pageType !== 'view' && (
                  <Editor
                    editorState={editorStateDesc}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={2} sm={2}>
              <Typography variant="subtitle1" gutterBottom className="title">
                {t('campaignImage')}
              </Typography>
            </Grid>
            {pageType !== 'view' && (
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
            )}
          </Grid>
          <Grid container className="campaign-container">
            <Grid item xs={2} sm={2} className="date-container">
              <Typography variant="subtitle1" gutterBottom className="title">
                {t('timeStart')}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} className="date-container">
              <DateTimePicker
                inputVariant="outlined"
                margin="normal"
                format="yyyy-MM-dd HH:mm"
                className="datetime"
                cancelLabel={t('cancel')}
                okLabel={t('ok')}
                value={campaign.timeStart}
                onChange={(date) => onChangeTimeStart(date)}
                disabled={pageType === 'view'}
              />
            </Grid>
            <Grid item xs={2} sm={2} className="date-container">
              <Typography variant="subtitle1" gutterBottom className="title">
                {t('timeEnd')}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} className="date-container">
              <DateTimePicker
                inputVariant="outlined"
                margin="normal"
                format="yyyy-MM-dd HH:mm"
                className="datetime"
                cancelLabel={t('cancel')}
                okLabel={t('ok')}
                value={campaign.timeEnd}
                onChange={(date) => onChangeTimeEnd(date)}
                disabled={pageType === 'view'}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
    </InfoBaseStyle>
  );
}
