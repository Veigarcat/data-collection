import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Icon,
  Box,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
} from '@material-ui/core';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
// import { useTranslation } from '../../i18n';
import DialogCustomRange from './dialogCustomRange';

const StyledDateTimeRange = styled(Paper)`
  display: flex;

  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.87);

  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;

  .result {
    flex-grow: 1;
  }
`;

const defaultProps = {
  defaultRange: 'week',
  blocks: [
    {
      label: 'week',
      value: 'week',
    },
    {
      label: 'month',
      value: 'month',
    },
    {
      label: 'custom',
      value: '',
    },
  ],
};

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
  },
  dialog: {
    height: 80,
  },
}));

function DynamicDateTimeRange({ blocks, defaultRange, cbChangeRange }) {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const [range, setRange] = useState(defaultRange);
  const [openCustomDialog, setOpenCustomDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectBox = Boolean(anchorEl);

  useEffect(() => {
    if (defaultRange !== range) {
      cbChangeRange(range);
    }
  }, [range]);

  useEffect(() => {
    if (defaultRange !== range) {
      setRange(range);
    }
  }, [defaultRange]);

  function handleCloseCustomDialog() {
    setOpenCustomDialog(false);
  }

  function handleClickExpand(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectItem(rangeSelect) {
    if (rangeSelect) {
      setRange(rangeSelect);
      setAnchorEl(null);
    } else {
      setOpenCustomDialog(true);
    }
  }

  function confirmCustomDateRange(rangeSelect) {
    setRange(rangeSelect);
    setOpenCustomDialog(false);
    setAnchorEl(false);
  }

  function renderPrimary() {
    if (!Array.isArray(range)) {
      const rangeSelect = blocks.find((block) => block.value === range);
      return rangeSelect.label;
    }
    const [from, to] = range;
    const fromString = moment(from).format('DD/MM/YYYY');
    const toString = moment(to).format('DD/MM/YYYY');

    return `${fromString} - ${toString}`;
  }

  return (
    <StyledDateTimeRange elevation={0}>
      <Box className="result" onClick={handleClickExpand}>
        <Typography>{renderPrimary()}</Typography>
      </Box>
      <Box className="iconMore" onClick={handleClickExpand}>
        <Icon>expand_more</Icon>
      </Box>
      <Popover
        open={openSelectBox}
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
            {blocks.map(({ label, value }) => (
              <ListItem
                key={label}
                button
                onClick={() => handleSelectItem(value)}
              >
                <ListItemText primary={t(label)} />
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
      <Dialog open={openCustomDialog} onClose={handleCloseCustomDialog}>
        <DialogCustomRange
          defaultRange={range}
          handleCloseCustomDialog={handleCloseCustomDialog}
          confirmCustomDateRange={confirmCustomDateRange}
        />
      </Dialog>
    </StyledDateTimeRange>
  );
}

DynamicDateTimeRange.defaultProps = defaultProps;
export default DynamicDateTimeRange;
