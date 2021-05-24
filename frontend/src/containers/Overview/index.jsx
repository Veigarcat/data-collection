import { Typography } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import React from 'react';
import OverviewStyle from './overview.styles';
import StaticOverview from './StatisticOverview';

export default function Overview() {
  const { t } = useTranslation();

  return (
    <OverviewStyle>
      <div className="result-user-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="title-result-user"
        >
          {t('overview')}
        </Typography>
        <StaticOverview />
      </div>
    </OverviewStyle>
  );
}
