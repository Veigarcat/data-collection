import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import NavigationContainer from '../containers/Dashboard/Navigation';
import SearchCampaignContainer from '../containers/Home/SearchCampaign';
import ListCampaignContainer from '../containers/Home/ListCampaign';
import routes from '../constants/route';

export default function Home(props) {
  const { history } = props;
  const [search, setSearch] = useState({
    key: '',
    status: 'total',
    typeCampaign: 'total',
    typeMessage: 'total',
    objectMessage: 'total',
    timeStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    timeEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  const [page, setPage] = useState(1);

  const navLink = [
    {
      title: 'Home',
      link: routes.HOME,
    },
  ];
  return (
    <div>
      <NavigationContainer navLink={navLink} />
      <Grid container>
        <Grid item xs={3} sm={3}>
          <SearchCampaignContainer
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        </Grid>
        <Grid item xs={9} sm={9}>
          <ListCampaignContainer
            history={history}
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}
