import React from 'react';

// import NavigationContainer from '../containers/Dashboard/Navigation';
import InfoUserContainer from '../containers/InfoUser';
// import routes from '../constants/route';

export default function InfoUser() {
  // const navLink = [
  //   {
  //     title: 'Home',
  //     link: routes.HOME,
  //   },
  //   {
  //     title: 'Thông tin cá nhân',
  //   },
  // ];
  return (
    <div>
      {/* <NavigationContainer navLink={navLink} /> */}
      <InfoUserContainer />
    </div>
  );
}
