import React, { useState, useEffect } from 'react';
import {
  Box,
  Icon,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DateTimePicker from './dateTimePicker';
// import { useTranslation } from '../../i18n';

const StyledDateTimeRangePicker = styled.div`
  display: inline-flex;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: ${(props) => (props['data-header'] ? '0px' : '5px 15px')};
  background: ${(props) => (props['data-header'] ? '#ffffff' : 'inherit')};
  color: rgba(0, 0, 0, 0.87);

  .datePicker {
    padding: 4px;
    width: ${(props) => (props['data-showtime'] ? '140px' : '100px')};
  }
  .iconMore {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .dividerDateRange {
    display: flex;
    align-items: center;
    font-size: 28px;
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
  },
}));

const defaultProps = {
  defaultValue: [moment().subtract(1, 'months'), moment()],
  showTime: true,
  cbChangeRange() {},
  blocks: [
    {
      label: 'today',
      range: [moment().startOf('day'), moment().endOf('day')],
    },
    {
      label: 'yesterday',
      range: [
        moment().startOf('day').subtract(1, 'day'),
        moment().startOf('day').subtract(1, 'milliseconds'),
      ],
    },
    {
      label: 'weekAgo',
      range: [
        moment().startOf('day').subtract(1, 'week').add(1, 'day'),
        moment().endOf('day'),
      ],
    },
    {
      label: 'monthAgo',
      range: [
        moment().startOf('day').subtract(1, 'month').add(1, 'day'),
        moment().endOf('day'),
      ],
    },
  ],
};

function DateTimeRangePicker({
  defaultValue,
  cbChangeRange,
  blocks,
  showTime,
  square = true,
  header = false,
  primary = false,
}) {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [selectedRange, setSelectedRange] = useState(defaultValue);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openRangeBlocks = Boolean(anchorEl);
  const [fromDate, toDate] = selectedRange;
  const open = openDatePicker || openRangeBlocks;
  useEffect(() => {
    if (!open) {
      cbChangeRange(selectedRange);
    }
  }, [open]);

  useEffect(() => {
    if (defaultValue !== selectedRange) {
      setSelectedRange(defaultValue);
    }
  }, [defaultValue]);

  function handleOpenDateTimePicker() {
    setOpenDatePicker(true);
  }

  function handleCloseDateTimePicker() {
    setOpenDatePicker(false);
  }

  function setFromDate(datetime) {
    setSelectedRange([datetime, toDate]);
  }

  function setToDate(datetime) {
    setSelectedRange([fromDate, datetime]);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function selectBlockRange(range) {
    setSelectedRange(range);
    setAnchorEl(null);
  }

  function checkSelected(rangeItem) {
    const [startDate, endDate] = rangeItem;
    const [selectedStartDate, selectedEndDate] = selectedRange;
    return (
      moment(startDate).isSame(selectedStartDate) &&
      moment(endDate).isSame(selectedEndDate)
    );
  }

  return (
    <StyledDateTimeRangePicker
      variant="outlined"
      square={square}
      data-showtime={showTime}
      data-header={header}
    >
      <Box className="datePicker">
        <DateTimePicker
          value={fromDate}
          onChange={setFromDate}
          onOpen={handleOpenDateTimePicker}
          onClose={handleCloseDateTimePicker}
          maxDate={toDate}
          showTime={showTime}
          primary={primary}
        />
      </Box>
      <Box className="dividerDateRange">-</Box>
      <Box className="datePicker">
        <DateTimePicker
          value={toDate}
          onChange={setToDate}
          onOpen={handleOpenDateTimePicker}
          onClose={handleCloseDateTimePicker}
          showTime={showTime}
          primary={primary}
          disableFuture
        />
      </Box>
      <Box className="iconMore" onClick={handleClick}>
        <Icon>expand_more</Icon>
      </Box>
      <Popover
        open={openRangeBlocks}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.root}>
          <List component="nav">
            {blocks.map(({ label, range }) => (
              <ListItem
                key={t(label)}
                button
                onClick={() => selectBlockRange(range)}
                selected={checkSelected(range)}
              >
                <ListItemText primary={t(label)} />
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </StyledDateTimeRangePicker>
  );
}

DateTimeRangePicker.defaultProps = defaultProps;

export default DateTimeRangePicker;
