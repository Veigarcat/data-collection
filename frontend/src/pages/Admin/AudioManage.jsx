import React from 'react';
import AudioMangeContainer from '../../containers/AudioManage';


export default function AudioManage(props) {
  const { history } = props;

  return (
    <div>
      <AudioMangeContainer history={history} />
    </div>
  );
}
