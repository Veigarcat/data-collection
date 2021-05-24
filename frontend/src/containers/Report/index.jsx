import React, { createContext, useState } from 'react';
import {
  Typography,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TemplateSide from './TemplateSide';
// eslint-disable-next-line import/no-cycle
import DetailTemplateSide from './DetailTemplateSide';
import { GridContainer, GridItem } from '../../components/Grid';
import ReportStyle from './report.style';

export const MODE_REPORT_NEW = 'NEW';
export const STATISTIC_TYPE = 'campaign'; // user
export const defaultRanges = [
  {
    label: 'Một tuần',
    value: 'week',
  },
  {
    label: 'Một tháng',
    value: 'month',
  },
  {
    label: 'Tùy chọn',
    value: '',
  },
];

const defaultTemp = {
  name: '',
  type: '0',
  fields: [],
  filterRange: 'week',
  outputTypes: ['EXCEL'],
};

const defaultReport = {
  titleHeader: 'Thống kê chiến dịch',
  logo: '',
};

export const ReportTemplateContext = createContext();

export default function Overview() {
  const { t } = useTranslation();
  const [statisticType, setStatisticType] = useState(STATISTIC_TYPE);
  const [curModeReport, setCurModeReport] = useState(MODE_REPORT_NEW);
  const [curTemplate, setCurTemplate] = useState(defaultTemp);
  const [curReport, setCurReport] = useState(defaultReport);
  const [statisticCampaign, setStatisticCampaign] = useState([]);
  const [statisticCamType, setStatisticCamType] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'statisticType': {
        setStatisticType(event.target.value);
        break;
      }
      case 'statisticCampaign': {
        setStatisticCampaign(event.target.value);
        break;
      }
      case 'statisticCamType': {
        setStatisticCamType(event.target.value);
        break;
      }
      default:
    }
  };
  const ctxPropsTemplate = {
    curTemplate,
    setCurTemplate,
    defaultRanges,
    curReport,
    setCurReport,
    statisticCampaign,
    statisticCamType,
    handleChange,
  };

  return (
    <ReportStyle>
      <div className="report-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="title-report"
        >
          {t('report')}
        </Typography>
        <div className="main-content-report">
          <Grid container>
            <Grid item xs={3} sm={3}>
              <Typography variant="subtitle1" className="title">
                Chọn kiểu thống kê
              </Typography>
            </Grid>
            <Grid item xs={9} sm={9} className="grid-content">
              <RadioGroup
                row
                aria-label="position"
                name="statisticType"
                value={statisticType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="campaign"
                  control={<Radio color="primary" />}
                  label="Thống kê theo chiến dịch"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio color="primary" />}
                  label="Thống kê theo người dùng"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </div>
        <GridContainer spacing={2}>
          <ReportTemplateContext.Provider value={ctxPropsTemplate}>
            <GridItem xs={12} sm={12} md={3}>
              <TemplateSide
                curModeReport={curModeReport}
                setCurModeReport={setCurModeReport}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              <DetailTemplateSide />
            </GridItem>
          </ReportTemplateContext.Provider>
        </GridContainer>
      </div>
    </ReportStyle>
  );
}
