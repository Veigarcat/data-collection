import React from 'react';
import CreateCampaignContainer from '../../containers/CreateCampaign';
import NavigationContainer from '../../containers/Dashboard/Navigation';
import routes from '../../constants/route';

export default function CreateCampaign(props) {
  const { history } = props;
  const navLink = [
    {
      title: 'Trang chủ',
      link: routes.HOME,
    },
    {
      title: 'Tạo chiến dịch',
    },
  ];
  return (
    <div>
      <NavigationContainer navLink={navLink} />
      <CreateCampaignContainer history={history} />
    </div>
  );
}
