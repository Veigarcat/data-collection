/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertFromRaw, EditorState } from 'draft-js';

import { toastMsgError, toastSuccess } from '../../commons/Toastify';
import CampaignCreateStep1 from './CampaignCreateStep1';
import CampaignCreateStep2 from './CampaignCreateStep2';
import CreateCampaignStyle from './createCampaign.style';
import { LIST_INTENT } from '../../constants/params';
import {
  fetchCreateCampaign,
  fetchEditCampaign,
  fetchDeleteCampaign,
  fetchHandleCampaignSuccess,
} from '../../redux/campaign/actions';
import { apiGetDataCampaign } from '../../apis/campaign';
import routes from '../../constants/route';
import InputConfirmDialog from '../../components/Dialog/inputConfirmDialog';

export default function CreateCampaign(props) {
  const { t } = useTranslation();
  const { history } = props;
  const { step, pageType, campaignId } = useParams();
  const dispatch = useDispatch();
  const { notiHandleCampaignSuccess } = useSelector((state) => state.campaign);
  const numberStep = step ? Number(step.split('-')[1]) : 0;
  const [usecaseArr, setUsecaseArr] = useState([]);
  const [intentArr, setIntentArr] = useState([]);
  const [editorStateDesc, setEditorStateDesc] = useState(
    EditorState.createEmpty(),
  );
  const [intentListApi, setIntentListApi] = useState(LIST_INTENT);
  const [campaign, setCampaign] = useState({
    name: '',
    image: '',
    timeStart: new Date(Date.now()),
    timeEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    scope: 'public',
    criteria: [],
    participant: [],
    messageType: '',
    messageObject: '',
    collectType: '',
    appId: '',
  });
  const [open, setOpen] = useState(false);
  const onHandleCampaign = (e) => {
    e.persist();
    setCampaign((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    if (pageType === 'edit' && campaignId) {
      history.push(`/campaign/${campaignId}/edit/step-1`);
    } else {
      history.push('/campaign/create/step-1');
    }
  };
  const handleNext = () => {
    if (!campaign.name || !campaign.desc || !campaign.scope) {
      toastMsgError('Vui lòng điền các thông tin cơ bản về kịch bản');
      return;
    }
    if (pageType === 'edit' && campaignId) {
      history.push(`/campaign/${campaignId}/edit/step-2`);
    } else {
      history.push('/campaign/create/step-2');
    }
  };
  const handleAddCampaign = () => {
    if (!campaign.name || !campaign.desc || !campaign.scope) {
      toastMsgError('Vui lòng điền các thông tin cơ bản của chiến dịch');
      return;
    }
    if (!campaign.messageType) {
      toastMsgError('Vui lòng chọn loại tin nhắn');
      return;
    }
    if (!campaign.messageObject) {
      toastMsgError('Vui lòng chọn đối tượng chat');
      return;
    }
    if (!campaign.collectType) {
      toastMsgError('Vui lòng chọn kiểu thu thập');
      return;
    }
    if (
      numberStep === 2 &&
      campaign.collectType === 'intent' &&
      intentArr.length === 0
    ) {
      toastMsgError(
        'Chiến dịch thu thập ý định, vui lòng nhập thông tin về các ý định cần trao đổi',
      );
      return;
    }
    if (
      numberStep === 2 &&
      campaign.collectType === 'usecase' &&
      usecaseArr.length === 0
    ) {
      toastMsgError(
        'Chiến dịch thu thập kịch bản, vui lòng nhập thông tin về các kịch bản cần trao đổi',
      );
      return;
    }
    if (numberStep === 2 && !campaign.appId) {
      toastMsgError('Vui lòng điền appId');
      return;
    }
    if (pageType === 'create') {
      dispatch(
        fetchCreateCampaign({
          ...campaign,
          image:
            'https://png.pngtree.com/illustration/20190226/ourmid/pngtree-romantic-starry-sky-moonlight-reflection-image_2568.jpg',
          intentList: intentArr,
          usecaseList: usecaseArr,
        }),
      );
    } else {
      dispatch(
        fetchEditCampaign({
          campaignId,
          data: {
            ...campaign,
            usecaseList: usecaseArr,
            intentList: intentArr,
          },
        }),
      );
    }
  };
  const handleCampaignDelete = () => {
    dispatch(fetchDeleteCampaign({ campaignId }));
  };
  useEffect(() => {
    if (numberStep === 2 && !campaign.name) {
      history.push('/campaign/create/step-1');
    }
  }, [numberStep]);

  useEffect(() => {
    if (campaignId) {
      apiGetDataCampaign(campaignId)
        .then((res) => {
          setCampaign(res.result);
          const { usecaseList, intentList, desc } = res.result;
          let intentListTemp = intentListApi;
          if (usecaseList) {
            setUsecaseArr(usecaseList);
            usecaseList.forEach((elementUsecase) => {
              elementUsecase.intentList.forEach((elementIntent) => {
                intentListTemp = intentListTemp.filter(
                  (item) => item.id !== elementIntent.id,
                );
              });
            });
          }
          if (intentList) {
            setIntentArr(intentList);
            intentList.forEach((elementIntent) => {
              intentListTemp = intentListTemp.filter(
                (item) => item.id !== elementIntent.id,
              );
            });
          }
          setIntentListApi(intentListTemp);
          if (desc) {
            const campaignDesc = EditorState.createWithContent(
              convertFromRaw(JSON.parse(desc)),
            );
            setEditorStateDesc(campaignDesc);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  useEffect(() => {
    if (notiHandleCampaignSuccess) {
      if (pageType === 'create') {
        toastSuccess('Tạo mới chiến dịch thành công');
      }
      if (pageType === 'edit') {
        toastSuccess('Chỉnh sửa chiến dịch thành công');
      }

      dispatch(fetchHandleCampaignSuccess(false));
      history.push(routes.CAMPAIGN_MANAGE);
    }
  }, [notiHandleCampaignSuccess]);
  return (
    <CreateCampaignStyle>
      <Paper className="campaign-create-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {pageType === 'create' && t('createCampaign')}
            {pageType === 'edit' && t('editCampaign')}
            {pageType === 'view' && t('viewCampaign')}
          </Typography>
          {pageType === 'edit' && numberStep === 1 && (
            <div className="headButtons">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className="button-delete"
              >
                {t('delete')}
              </Button>
            </div>
          )}
          {pageType === 'view' && (
            <div className="headButtons">
              <Button
                onClick={() => {
                  history.push(`/campaign/${campaign.id}/edit/step-1`);
                }}
                color="primary"
                variant="contained"
                className="button-edit"
              >
                {t('edit')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className="button-delete"
              >
                {t('delete')}
              </Button>
            </div>
          )}
        </div>
        {numberStep === 1 && pageType !== 'view' && (
          <CampaignCreateStep1
            campaign={campaign}
            onHandleCampaign={onHandleCampaign}
            setCampaign={setCampaign}
            pageType={pageType}
            editorStateDesc={editorStateDesc}
            setEditorStateDesc={setEditorStateDesc}
          />
        )}
        {numberStep === 2 && pageType !== 'view' && (
          <CampaignCreateStep2
            campaign={campaign}
            setCampaign={setCampaign}
            onHandleCampaign={onHandleCampaign}
            usecaseList={usecaseArr}
            setUsecaseList={setUsecaseArr}
            intentList={intentArr}
            setIntentList={setIntentArr}
            pageType={pageType}
            intentListApi={intentListApi}
            setIntentListApi={setIntentListApi}
          />
        )}
        {pageType === 'view' && (
          <>
            <CampaignCreateStep1
              campaign={campaign}
              onHandleCampaign={onHandleCampaign}
              setCampaign={setCampaign}
              pageType={pageType}
              editorStateDesc={editorStateDesc}
              setEditorStateDesc={setEditorStateDesc}
            />
            {campaign.messageType === 'msg_text' &&
              campaign.messageObject === 'bot' && (
                <CampaignCreateStep2
                  campaign={campaign}
                  setCampaign={setCampaign}
                  onHandleCampaign={onHandleCampaign}
                  usecaseList={usecaseArr}
                  setUsecaseList={setUsecaseArr}
                  intentList={intentArr}
                  setIntentList={setIntentArr}
                  pageType={pageType}
                  intentListApi={intentListApi}
                  setIntentListApi={setIntentListApi}
                />
              )}
          </>
        )}
        {pageType !== 'view' && (
          <>
            {campaign.messageType === 'msg_text' &&
              campaign.messageObject === 'bot' &&
              (campaign.collectType === 'intent' ||
                campaign.collectType === 'usecase') && (
                <div className="button-step-container">
                  <Button
                    disabled={numberStep === 1}
                    onClick={handleBack}
                    color="primary"
                    variant="contained"
                    className="button"
                  >
                    {t('back')}
                  </Button>
                  <Button
                    disabled={numberStep === 2}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="button"
                  >
                    Bước 2
                  </Button>
                </div>
              )}
            {numberStep === 1 &&
              (campaign.messageType !== 'msg_text' ||
                campaign.messageObject !== 'bot' ||
                (campaign.collectType !== 'intent' &&
                  campaign.collectType !== 'usecase')) && (
                <div className="container-button">
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={handleAddCampaign}
                  >
                    {pageType === 'create'
                      ? 'Thêm chiến dịch'
                      : 'Chỉnh sửa chiến dịch'}
                  </Button>
                </div>
              )}
            {numberStep === 2 && (
              <div className="container-button">
                <Button
                  variant="contained"
                  color="primary"
                  className="button"
                  onClick={handleAddCampaign}
                >
                  {pageType === 'create'
                    ? 'Thêm chiến dịch'
                    : 'Chỉnh sửa chiến dịch'}
                </Button>
              </div>
            )}
          </>
        )}
      </Paper>
      {open && (
        <InputConfirmDialog
          open={open}
          handleClose={handleClose}
          title="Xác nhận xóa chiến dịch?"
          buttonText={t('delete')}
          onClick={handleCampaignDelete}
          validInput="DELETE"
        />
      )}
    </CreateCampaignStyle>
  );
}
