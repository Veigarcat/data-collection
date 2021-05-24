import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toastMsgError, toastSuccess } from '../../commons/Toastify';
import CampaignCreateStep1 from './CampaignCreateStep1';
import CampaignCreateStep2 from './CampaignCreateStep2';
import CreateCampaignStyle from './createCampaign.style';
import {
  fetchCreateCampaign,
  fetchCreateCampaignSuccess,
} from '../../redux/campaign/actions';

export default function CreateCampaign(props) {
  const { t } = useTranslation();
  const { history } = props;
  const { step } = useParams();
  const dispatch = useDispatch();
  const { notiCreateCampaignSuccess } = useSelector((state) => state.campaign);
  const numberStep = Number(step.split('-')[1]);
  const [usecaseList, setUsecaseList] = useState([]);
  const [intentList, setIntentList] = useState([]);
  const [campaign, setCampaign] = useState({
    name: '',
    image: '',
    desc: '',
    timeStart: new Date(Date.now()),
    timeEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    scope: 'public',
    criteria: [],
    participant: [],
    listUsecase: [],
    listIntent: [],
    typeMessage: 'text',
    objectMessage: 'bot',
    typeCampaign: 0, // TODO: trước khi tạo kiểm tra typeCampaign !== 0
  });
  const onHandleCampaign = (e) => {
    e.persist();
    setCampaign((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleBack = () => {
    history.push('/create-campaign/step-1');
  };
  const handleNext = () => {
    if (!campaign.name || !campaign.desc || !campaign.scope) {
      toastMsgError('Vui lòng điền các thông tin cơ bản về kịch bản');
      return;
    }
    history.push('/create-campaign/step-2');
  };
  const handleAddCampaign = () => {
    if (campaign.typeCampaign === 0) {
      toastMsgError('Vui lòng chọn loại dữ liệu muốn thu thập');
      return;
    }
    if (!usecaseList && !intentList) {
      toastMsgError(
        'Vui lòng điền các thông tin cơ bản về kịch bản hoặc ý định',
      );
      return;
    }
    dispatch(fetchCreateCampaign(campaign));
  };
  useEffect(() => {
    if (notiCreateCampaignSuccess) {
      toastSuccess('Tạo mới chiến dịch thành công');
      dispatch(fetchCreateCampaignSuccess(false));
    }
  }, [notiCreateCampaignSuccess]);
  return (
    <CreateCampaignStyle>
      <div className="create-campaign-container">
        <Typography gutterBottom variant="h4" className="title-page">
          {t('createCampaign')}
        </Typography>
        {numberStep === 1 ? (
          <CampaignCreateStep1
            campaign={campaign}
            onHandleCampaign={onHandleCampaign}
            setCampaign={setCampaign}
          />
        ) : (
          <CampaignCreateStep2
            campaign={campaign}
            setCampaign={setCampaign}
            onHandleCampaign={onHandleCampaign}
            usecaseList={usecaseList}
            setUsecaseList={setUsecaseList}
            intentList={intentList}
            setIntentList={setIntentList}
          />
        )}
      </div>
      {numberStep === 2 && (
        <div className="container-button">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleAddCampaign}
          >
            Thêm chiến dịch
          </Button>
        </div>
      )}
      <div className="button-step-container">
        <Button
          disabled={numberStep === 1}
          onClick={handleBack}
          color="primary"
          variant="contained"
          className="button"
        >
          Back
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
    </CreateCampaignStyle>
  );
}
