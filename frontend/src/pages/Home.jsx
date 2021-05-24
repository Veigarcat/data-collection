import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListCampaignContainer from '../containers/Home/ListCampaign';

export default function Home(props) {
  const { history } = props;
  const { type } = useParams();
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
      <ListCampaignContainer
        history={history}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        type={type || 'total'}
      />
    </div>
  );
}
