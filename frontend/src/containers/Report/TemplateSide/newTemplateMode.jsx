import React, { useContext, useState } from 'react';
import {
  FormControl,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  Divider,
  Input,
  Chip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ReportTemplateContext } from '../index';
import { DynamicDateTimeRange } from '../../../components/DateTimePicker';

function NewTemplateMode() {
  const { t } = useTranslation();
  const {
    curTemplate,
    setCurTemplate,
    defaultRanges,
    statisticCampaign,
    statisticCamType,
    handleChange,
  } = useContext(ReportTemplateContext);
  const {
    type: curType,
    fields: curFields,
    number: curNumber = 10,
    filterRange: curFilterRange,
    outputTypes: curOutputTypes,
  } = curTemplate;
  const handleChangeRange = (range) => {
    setCurTemplate({ ...curTemplate, filterRange: range });
  };
  const isCheckedOutput = (outputReport) =>
    curOutputTypes.some((outputType) => outputType === outputReport);
  const handleCheckedOutputType = (event) => {
    const { name: outputType, checked } = event.target;

    let newOutputTypes = [];
    if (checked) {
      newOutputTypes = [...curOutputTypes, outputType];
    } else {
      newOutputTypes = curOutputTypes.filter(
        (curOutputFile) => curOutputFile !== outputType,
      );
    }
    setCurTemplate({ ...curTemplate, outputTypes: newOutputTypes });
  };
  const renderOutputType = () => {
    const allTypes = ['EXCEL', 'PDF', 'CSV'];
    return allTypes.map((type) => (
      <FormControlLabel
        key={type}
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            checked={isCheckedOutput(type)}
            onChange={handleCheckedOutputType}
            color="primary"
            name={type}
          />
        }
        label={type}
      />
    ));
  };
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <div className="newTemplateWrapper">
      <div className="reportType reportWrapper">
        <div className="campaign-name">
          <Typography>{t('Chọn chiến dịch')}</Typography>
          <FormControl className="formControl">
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              name="statisticCampaign"
              value={statisticCampaign}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className="chips">
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
              className="mutiple-select"
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Divider className="dividerTemp" />
        <div className="campaign-criteria">
          <Typography>{t('Chọn loại thống kê')}</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="statisticCamType"
              value={statisticCamType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="Thống kê người dùng"
              />
              <FormControlLabel
                value="intent"
                control={<Radio />}
                label="Thống kê ý định"
              />
              <FormControlLabel
                value="usecase"
                control={<Radio />}
                label="thông kê kịch bản "
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="reportFilterTime reportWrapper">
        <Typography>{t('Thời gian lọc dữ liệu')}</Typography>
        <DynamicDateTimeRange
          defaultRange={curFilterRange}
          blocks={defaultRanges}
          cbChangeRange={handleChangeRange}
        />
      </div>
      <div className="reportTypeOutput reportWrapper">
        <Typography>{t('Loại file')}</Typography>
        {renderOutputType()}
      </div>
    </div>
  );
}
export default NewTemplateMode;
