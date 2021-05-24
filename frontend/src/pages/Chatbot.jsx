import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import MessageChat from '../containers/MessageChat';
import Usecase from '../containers/Usecase';
import NavigationContainer from '../containers/Dashboard/Navigation';
import { apiGetDataCampaign } from '../apis/campaign';
import routes from '../constants/route';

export default function ChatBot() {
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
        title: 'Chat Bot',
      },
    ];
  }

  return (
    <div>
      <NavigationContainer navLink={navLink} />
      <Grid container>
        <Grid item xs={6} sm={6}>
          <MessageChat dataInfoCampaign={dataInfoCampaign} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Usecase />
        </Grid>
      </Grid>
    </div>
  );
}
