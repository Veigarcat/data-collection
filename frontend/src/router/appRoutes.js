import Home from '../pages/Home';
import routes from '../constants/route';
import ChatBot from '../pages/Chatbot';
import InfoUser from '../pages/InfoUser';
import ResultUser from '../pages/ResultUser';
import InfoCampaign from '../pages/InfoCampaign';
import CreateCampaign from '../pages/Admin/CreateCampaign';
import CampaignManage from '../pages/Admin/CampaignManage';
import UserManage from '../pages/Admin/UserManage';
import Overview from '../pages/Admin/Overview';
import Report from '../pages/Admin/Report';
import SLULandingPage from '../pages/SLU/SLULandingPage/SLULandingPage';
import SLURoom from '../pages/SLU/SLURoom/SLURoom';
import SLUSolo from '../pages/SLU/SLUSolo/SLUSolo';
import SLUAdmin from '../pages/SLU/Admin/Admin';
import Chatroom from '../containers/ASR/Chatroom/Chatroom';
import AudioImport from '../pages/ImportAudio';
import ValidateData from '../pages/Validate';
import AudioManage from '../pages/Admin/AudioManage';
import LandingPage from '../containers/ASR/LandingPage/LandingPage';
import SearchCampaign from '../pages/Search';
import YourCampaignOverview from '../pages/YourCampaignOverview';

export default [
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
    path: routes.SUB_CAMPAIGN,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.SEARCH_CAMPAIGN,
    component: SearchCampaign,
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
  {
    path: routes.EDIT_CAMPAIGN,
    component: CreateCampaign,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.VIEW_CAMPAIGN,
    component: CreateCampaign,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.CAMPAIGN_MANAGE,
    component: CampaignManage,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.USER_MANAGE,
    component: UserManage,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.OVERVIEW,
    component: Overview,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.REPORT,
    component: Report,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.SLU_LANDING_PAGE,
    component: SLULandingPage,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.SLU_ROOM,
    component: SLURoom,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.SLU_SOLO,
    component: SLUSolo,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.SLU_REPORT,
    component: SLUAdmin,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.ASR,
    component: LandingPage,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.CHATROOM,
    component: Chatroom,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.IMPORT_AUDIO,
    component: AudioImport,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.VALIDATE_DATA,
    component: ValidateData,
    exact: true,
    restricted: false,
    isPrivate: true,
    special: true,
  },
  {
    path: routes.AUDIO_MANAGE,
    component: AudioManage,
    role: 'admin',
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.YOUR_CAMPAIGN_OVERVIEW,
    component: YourCampaignOverview,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
