import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../constants/route';
import Dashboard from '../containers/Dashboard';
import LayoutAdmin from '../containers/Dashboard/LayoutAdmin';

export default function PrivateRoute({ component: Component, role, ...rest }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log('private ', role);
  return (
    <Route
      {...rest}
      render={
        (props) =>
          !role ? (
            <Dashboard {...props} {...rest}>
              <Component {...props} />
            </Dashboard>
          ) : (
            <LayoutAdmin {...props} {...rest}>
              <Component {...props} />
            </LayoutAdmin>
          )
        // ) : (
        //   <Redirect to={routes.LOGIN} />
        // )
      }
    />
  );
}
