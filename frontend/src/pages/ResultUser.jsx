import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationContainer from '../containers/Dashboard/Navigation';
import { apiGetDataCampaign } from '../apis/campaign';
import ResultUser from '../containers/ResultUser';
import routes from '../constants/route';

export default function Home() {
  const { campaignId } = useParams();
  const [dataInfoCampaign, setDataInfoCampaign] = useState({});
  let navLink;
  useEffect(() => {
    apiGetDataCampaign(campaignId)
      .then((res) => {
        setDataInfoCampaign(res.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  if (dataInfoCampaign) {
    navLink = [
      {
        title: 'Home',
        link: routes.HOME,
      },
      {
        title: dataInfoCampaign.name,
        link: `/home/${campaignId}/info-campaign`,
      },
      {
        title: 'Kết quả chiến dịch',
      },
    ];
  }
  return (
    <div>
      <NavigationContainer navLink={navLink} />
      <ResultUser />
    </div>
  );
}
