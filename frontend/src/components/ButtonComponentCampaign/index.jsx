// import React from 'react';
// import { Button } from '@material-ui/core';
// import ButtonAddStyle from './index.style';

// export function handleUserJoinCampaign() {
//   dispatch(userJoinCampaign({ campaignId, email }));
// }
// export function handleUserLeaveCampaign() {
//   dispatch(userLeaveCampaign({ campaignId, email }));
// }
// export function onChangeAcceptInvite() {
//   dispatch(handleAcceptInvite({ campaignId, email }));
// }
// export function handleContinue() {
//   if (
//     dataInfoCampaign.messageObject === 'bot' &&
//     dataInfoCampaign.messageType === 'msg_text'
//   ) {
//     history.push(`/home/${campaignId}/604b13555d214f0efc57428d/chatbot`);
//   }
// }
// export function showSelectButton({ campaignParticipant, campaignstatus }) {
//   return (
//     <>
//       {!campaignParticipant &&
//         (campaignstatus === 'waiting' || campaignstatus === 'running') && (
//           <div className="button-container">
//             <Button
//               variant="contained"
//               color="primary"
//               className="button button-participate"
//               onClick={() => handleUserJoinCampaign()}
//             >
//               {t('participate')}
//             </Button>
//           </div>
//         )}
//       {campaignParticipant &&
//         campaignParticipant.status === '1' &&
//         (campaignstatus === 'waiting' || campaignstatus === 'running') && (
//           <Button
//             variant="contained"
//             color="primary"
//             className="button button-participate"
//             onClick={() => onChangeAcceptInvite()}
//           >
//             Chấp nhận lời mời
//           </Button>
//         )}
//       {campaignParticipant &&
//         campaignParticipant.status === '2' &&
//         campaignstatus === 'running' && (
//           <div className="button-container">
//             <Button
//               variant="contained"
//               color="primary"
//               className="button button-continue"
//               onClick={handleContinue}
//             >
//               {t('continue')}
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               className="button button-exit"
//               onClick={() => handleUserLeaveCampaign()}
//             >
//               {t('exit')}
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               className="button button-progress"
//               onClick={() => history.push(`/${campaignId}/result-user`)}
//             >
//               {t('progress')}
//             </Button>
//           </div>
//         )}
//       {campaignParticipant &&
//         campaignParticipant.status === '2' &&
//         campaignstatus === 'waiting' && (
//           <div className="text-warning">
//             <Typography gutterBottom variant="body1">
//               Chiến dịch chưa bắt đầu, chờ chiến dịch bắt đầu
//             </Typography>
//           </div>
//         )}
//       {campaignParticipant &&
//         campaignParticipant.status === '2' &&
//         (campaignstatus === 'stop' || campaignstatus === 'pause') && (
//           <div className="button-container">
//             <Button
//               variant="contained"
//               color="secondary"
//               className="button button-progress"
//               onClick={() => history.push(`${routes.RESULT_USER}`)}
//             >
//               {t('progress')}
//             </Button>
//           </div>
//         )}
//     </>
//   );
// }
