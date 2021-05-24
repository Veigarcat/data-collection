import React from 'react';

import './Status.css';

export default function Status(props) {
  const { message, userRole } = props;

  const convertMessage = (line) => {
    if (userRole === 'client') {
      return line
        .replace(new RegExp('Client', 'g'), 'Bạn')
        .replace(new RegExp('client', 'g'), 'bạn');
    }
    if (userRole === 'servant') {
      return line
        .replace(new RegExp('Agent', 'g'), 'Bạn')
        .replace(new RegExp('agent', 'g'), 'bạn');
    }

    return line;
  };

  return (
    <>
      <div>
        <div
          style={{ paddingRight: '20px', paddingLeft: '20px', zIndex: '1000' }}
        >
          <p className={`glow glow_${userRole}`}>{convertMessage(message)}</p>
        </div>
      </div>
    </>
  );
}
