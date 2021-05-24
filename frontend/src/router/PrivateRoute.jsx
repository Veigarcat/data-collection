/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NormalDashboard from '../containers/Dashboard/index';
import Dashboard from '../containers/Dashboard/LayoutUser';
import LayoutAdmin from '../containers/Dashboard/LayoutAdmin';
import routes from '../constants/route';
import { LOGIN_DOMAIN } from '../configs';

export default function PrivateRoute({
  component: Component,
  role,
  path,
  value,
  ...rest
}) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  if (!accessToken) {
    return window.location.assign(LOGIN_DOMAIN);
  }
  if (accessToken) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !role ? (
            rest.special ? (
              <NormalDashboard>
                <Component
                  {...props}
                  socket={
                    rest.path === routes.SLU_LANDING_PAGE ||
                    routes.SLU_ROOM ||
                    routes.ASR ||
                    routes.CHATROOM
                      ? rest.socket
                      : null
                  }
                />
              </NormalDashboard>
            ) : (
              <Dashboard {...props} {...rest} key={uuidv4()}>
                <Component
                  {...props}
                  socket={
                    rest.path === routes.SLU_LANDING_PAGE ||
                    routes.SLU_ROOM ||
                    routes.ASR ||
                    routes.CHATROOM
                      ? rest.socket
                      : null
                  }
                />
              </Dashboard>
            )
          ) : (
            <LayoutAdmin {...props} {...rest}>
              <Component {...props} />
            </LayoutAdmin>
          )
        }
      />
    );
  }
}
