import React from 'react';
import { Typography, Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import OverviewCampaignStyle from './overviewCampaign.style';

export default function OverviewCampaign() {
  const { t } = useTranslation();
  const arrBox = [
    {
      title: 'Tổng chiến dịch tham gia',
      number: 5,
    },
    {
      title: 'Tổng chiến dịch đang diễn ra',
      number: 3,
    },
    {
      title: 'Tổng chiến dịch sắp diễn ra',
      number: 1,
    },
    {
      title: 'Tổng chiến dịch đã kết thúc',
      number: 1,
    },
    {
      title: 'Tổng use case cần chat',
      number: 10,
    },
    {
      title: 'Tổng use case đã chat',
      number: 5,
    },
    {
      title: 'Tổng số phiên chat',
      number: 50,
    },
    {
      title: 'Tổng số câu chat',
      number: 100,
    },
  ];
  return (
    <OverviewCampaignStyle>
      <div className="overview-campaign-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="overview-campaign"
        >
          {t('generalInformationCampaign')}
        </Typography>
        <div className="container-box">
          {arrBox.map((item) => (
            <Card className="grid-item" key={item.title}>
              <div className="account-box title-account-box">
                <Typography gutterBottom className="sum-usecase">
                  {item.title}
                </Typography>
              </div>
              <hr className="divider" />
              <div className="account-box number-account-box">
                <Typography gutterBottom className="number-sum-usecase">
                  {item.number}
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </OverviewCampaignStyle>
  );
}
