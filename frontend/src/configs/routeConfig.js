import React from "react";
import routers from '../constants/route';
import { PAGE_CAMPAIGN_TYPE } from '../constants/params';
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

const adminMenu = {
  overviewAdmin: {
    name: 'overview',
    logo: 'home',
    items: [
      {
        name: 'overview',
        logo: 'bar_chart',
        route: routers.OVERVIEW,
      },
    ],
  },
  managers: {
    name: 'manage',
    logo: 'storage',
    items: [
      {
        name: 'campaignManage',
        logo: 'widgets',
        route: routers.CAMPAIGN_MANAGE,
      },
      {
        name: 'userManage',
        logo: 'comment',
        route: routers.USER_MANAGE,
      },
      {
        name: 'audioManage',
        logo: <QueueMusicIcon/>,
        route: routers.AUDIO_MANAGE,
      },
    ],
  },
  reports: {
    name: 'report',
    logo: 'assessment',
    items: [
      {
        name: 'report',
        logo: 'assessment',
        route: routers.REPORT,
      },
      {
        name: 'Thống kê báo cáo ASR',
        logo: 'assessment',
        route: routers.REPORT,
      },
    ],
  },
  miscellaneous: {
    name: 'miscellaneous',
    logo: 'folder',
    items: [
      {
        name: 'SLU',
        logo: '',
        route: routers.SLU_REPORT,
      },
    ],
  },
};

const userMenu = {
  campaigns: {
    name: 'campaign',
    logo: 'home',
    items: [
      {
        name: 'totalCampaign',
        logo: 'bar_chart',
        route: routers.HOME,
      },
      {
        name: 'myCampaign',
        logo: 'widgets',
        route: `/home/sub-campaign/${PAGE_CAMPAIGN_TYPE.MY_CAMPAIGN}`,
      },
      {
        name: 'otherCampaign',
        logo: 'comment',
        route: `/home/sub-campaign/${PAGE_CAMPAIGN_TYPE.OTHER_CAMPAIGN}`,
      },
    ],
  },
  overviewUser: {
    name: 'overview',
    logo: 'assignment',
    items: [
      {
        name: 'myCampaign',
        logo: 'assignment',
        route: routers.YOUR_CAMPAIGN_OVERVIEW,
      },
    ],
  },
  search: {
    name: 'searchAdvance',
    logo: 'search',
    items: [
      {
        name: 'searchCampaign',
        logo: 'search',
        route: routers.SEARCH_CAMPAIGN,
      },
    ],
  },
};

const groupMenuNames = [
  'overviewAdmin',
  'campaigns',
  'managers',
  'overviewUser',
  'search',
  'reports',
  'miscellaneous',
];

export { adminMenu, userMenu, groupMenuNames };
