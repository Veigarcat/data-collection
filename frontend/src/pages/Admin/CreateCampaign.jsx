import React from 'react';
import CreateCampaignContainer from '../../containers/CreateCampaign';

export default function CreateCampaign(props) {
  const { history } = props;
  return (
    <div>
      <CreateCampaignContainer history={history} />
    </div>
  );
}
