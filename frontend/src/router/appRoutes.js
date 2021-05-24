import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

import routes from '../constants/route';
import ChatBot from '../pages/Chatbot';
import InfoUser from '../pages/InfoUser';
import ResultUser from '../pages/ResultUser';
import InfoCampaign from '../pages/InfoCampaign';
import CreateCampaign from '../pages/Admin/CreateCampaign';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.SIGNUP,
    component: SignUp,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.CHATBOT,
    component: ChatBot,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.INFO_USER,
    component: InfoUser,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.RESULT_USER,
    component: ResultUser,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.INFO_CAMPAIGN,
    component: InfoCampaign,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.CREATE_CAMPAIGN,
    component: CreateCampaign,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
