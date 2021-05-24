import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { CircularProgress } from '@material-ui/core';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routes from '../constants/route';
import appRoutes from './appRoutes';
import { verifyToken } from '../redux/auth/actions';
import { getCookie, setCookie } from '../utils/cookie';
import { JWT_EXPIRES_TIME } from '../configs';

let socketSLU;
let socketASR;
export default () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { search } = window.location;

  const dispatch = useDispatch();
  const { accessToken, verifying } = useSelector((state) => state.auth);

  const [socketSLUReady, setSocketSLUReady] = useState(false);
  const [socket_ASR_ready, setsocket_ASR_ready] = useState(false);

  const setupSocketSLU = async () => {
    let cookieAccessToken;
    document.cookie.split(';').map((info) => {
      // eslint-disable-next-line
      info = info.replace(' ', '');
      if (info.slice(0, 'accessToken='.length) === 'accessToken=') {
        cookieAccessToken = info.substring('accessToken='.length);
        return document.cookie.substring('accessToken='.length);
      }
      return null;
    });

    socketSLU = io(process.env.REACT_APP_SLU_BACKEND_DOMAIN, {
      query: {
        token: cookieAccessToken,
      },
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    socketSLU.on('disconnect', () => {
      socketSLU = null;
      console.log('Socket Disconnected!');
    });

    socketSLU.on('connection', () => {});
    setSocketSLUReady(true);
  };

  useEffect(() => {
    if (!socketSLUReady) {
      setupSocketSLU();
    }
  }, [socketSLUReady]);

  const setupSocket_ASR = async () => {
    let cookieAccessToken;
    document.cookie.split(';').map((info) => {
      info = info.replace(' ', '');
      if (info.slice(0, 'accessToken='.length) === 'accessToken=') {
        cookieAccessToken = info.substring('accessToken='.length);
        return document.cookie.substring('accessToken='.length);
      }
      return null;
    });
    socketASR = io(process.env.REACT_APP_ASR_APP, {
      query: {
        token: cookieAccessToken,
      },
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    socketASR.on('disconnect', () => {
      socketASR = null;
      console.log('Socket Disconnected!');

      // socket leaveroom
    });

    socketASR.on('connection', () => {
      console.log('Socket Connected!');
    });
    setsocket_ASR_ready(true);
  };

  useEffect(() => {
    if (!socket_ASR_ready) {
      setupSocket_ASR();
    }
  }, [socket_ASR_ready]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const ssoToken = params.get('access_token');

    if (ssoToken) {
      window.open(window.location.pathname, '_self');
      setCookie('accessToken', ssoToken, JWT_EXPIRES_TIME);
      return;
    }
    if (!accessToken) {
      const accessTokenFromCookie = getCookie('accessToken');
      if (accessTokenFromCookie) {
        dispatch(verifyToken(accessTokenFromCookie));
      }
    }

    setIsFirstTime(false);
  }, []);

  if (isFirstTime || verifying) {
    return <CircularProgress />;
  }
  return (
    <BrowserRouter>
      <Switch>
        {appRoutes.map(
          ({
            path,
            exact = true,
            component: Component,
            isPrivate = false,
            ...rest
          }) => {
            if (!isPrivate) {
              return (
                <PublicRoute
                  key={uuidv4}
                  exact={exact}
                  path={path}
                  component={Component}
                  {...rest}
                />
              );
            }
            if (
              (path === routes.SLU_LANDING_PAGE || path === routes.SLU_ROOM) &&
              socketSLUReady
            ) {
              return (
                <PrivateRoute
                  socket={socketSLU}
                  key={uuidv4}
                  exact={exact}
                  path={path}
                  component={Component}
                  {...rest}
                />
              );
            }
            if (
              (path === routes.ASR || path === routes.CHATROOM) &&
              socket_ASR_ready
            ) {
              return (
                <PrivateRoute
                  socket={socketASR}
                  key={uuidv4}
                  exact={exact}
                  path={path}
                  component={Component}
                  {...rest} // let socket
                />
              );
            }
            return (
              <PrivateRoute
                key={uuidv4}
                exact={exact}
                path={path}
                component={Component}
                {...rest}
              />
            );
          },
        )}
        <Redirect to={routes.HOME} />
      </Switch>
    </BrowserRouter>
  );
};
