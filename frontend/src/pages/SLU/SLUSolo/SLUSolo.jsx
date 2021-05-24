/* eslint-disable no-underscore-dangle */
import React from 'react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { Grid } from '@material-ui/core';
// import { toastMsgError } from '../../../commons/Toastify';

// import intentInfo from '../SLURoom/constant/intent';

export default function SLUSolo() {
  // let cookieAccessToken;
  // document.cookie.split(';').map((info) => {
  //   // remove space
  //   const processedInfo = info.replace(' ', '');
  //   if (processedInfo.slice(0, 'accessToken='.length) === 'accessToken=') {
  //     cookieAccessToken = processedInfo.substring('accessToken='.length);
  //     return document.cookie.substring('accessToken='.length);
  //   }
  //   return null;
  // });

  // const parseIntent = (intent) => {
  //   // eslint-disable-next-line
  //   const tempIntent = [];
  //   /* eslint-disable-next-line no-restricted-syntax */
  //   for (const property in intent) {
  //     if (
  //       property !== '_id' &&
  //       property !== '__v' &&
  //       intent[property] !== null
  //     ) {
  //       tempIntent.push([property, intent[property], intent[property]]);
  //     }
  //   }

  //   return tempIntent;
  // };

  // const { history } = props;
  // const [user, setUser] = useState(null);
  // const [prevIntent, setPrevIntent] = useState([]);
  // const [nextIntent, setNextIntent] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       // `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/${cookieAccessToken}`,
  //       `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/accessToken`,
  //       {
  //         headers: {
  //           accessToken: cookieAccessToken,
  //         },
  //       },
  //       // `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/auth`,
  //       // { withCredentials: true },
  //     )
  //     .then((response) => {
  //       // redirect to real login path later.
  //       if (!response.data.isAuth) {
  //         history.push('/login');
  //         toastMsgError('Bạn không có quyền tham gia chiến dịch này!');
  //       }
  //       setUser(response.data.userFound);
  //     });

  //   axios
  //     .get(`${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/intent/random`)
  //     .then((response) => {
  //       // redirect to real login path later.
  //       console.log(response);
  //       /* eslint-disable-next-line no-shadow */
  //       const { prevIntent, nextIntent } = response.data;

  //       const tempPrevIntent = parseIntent(prevIntent);
  //       setPrevIntent(tempPrevIntent);

  //       const tempNextIntent = parseIntent(nextIntent);
  //       setNextIntent(tempNextIntent);
  //     });
  // }, []);

  // const getLabel = (slot) => {
  //   const slotIndex = intentInfo.SLOT_LABEL.findIndex((item) => {
  //     return item.tag.toUpperCase() === slot.toUpperCase();
  //   });

  //   return slotIndex === -1 ? '' : intentInfo.SLOT_LABEL[slotIndex].name;
  // };

  // const showCity = (cityIndex) => {
  //   return intentInfo.CITY[cityIndex];
  // };

  // const showDistrict = (currentIntent, districtIndex) => {
  //   const cityIndex = currentIntent.findIndex((item) => {
  //     return item[0] === 'city';
  //   });
  //   const cityName = showCity(currentIntent[cityIndex][1]);
  //   return intentInfo.DISTRICT[cityName][districtIndex];
  // };

  // const renderIntent = (intent) => {
  //   intent && intent.length !== 0
  //     ? intent.map((property, index) => {
  //       const slotValue = compareProperty(property, currentIntent);
  //       return (
  //         <Grid item sm={12} md={12} key={property[0]}>
  //           <Checkbox color="primary" checked={slotValue !== null} />
  //           <b>{index === 0 ? 'Ý định' : getLabel(property[0])}</b>:{' '}
  //           {property[1] === '-1' || property[1] === -1
  //             ? '<Tùy chọn>'
  //             : property[0] === 'name' ||
  //               property[0] === 'cmnd' ||
  //               property[0] === 'four_last_digits'
  //             ? property[1]
  //             : property[0] === 'city'
  //             ? showCity(property[1])
  //             : property[0] === 'district'
  //             ? showDistrictScenario(property[1])
  //             : intentInfo[property[0].toUpperCase()][property[1]].name}
  //         </Grid>
  //       );
  //     })
  //   : 'Đang tải...';
  // };

  return <>{}</>;
}
