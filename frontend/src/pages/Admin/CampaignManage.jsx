import React from 'react';
import CampaignMangeContainer from '../../containers/CampaignManage';

export default function CampaignManage(props) {
  const { history } = props;
  return <CampaignMangeContainer history={history} />;
}
