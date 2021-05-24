import React, { useState } from 'react';
import SearchCampaignContainer from '../containers/Home/SearchCampaign';
import ListCampaignContainer from '../containers/Home/ListCampaign';

export default function Home(props) {
  const { history } = props;
  const [search, setSearch] = useState({
    key: '',
    status: 'total',
    participantStatus: 'total',
    messageType: 'total',
    messageObject: 'total',
    timeStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    timeEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  const [page, setPage] = useState(1);

  return (
    <div>
      <SearchCampaignContainer
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
      />
      <ListCampaignContainer
        history={history}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
