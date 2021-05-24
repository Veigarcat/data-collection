import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateTimeRangePicker from './dateTimeRangePicker';
// import { useTranslation } from '../../i18n';

const useStyles = makeStyles(() => ({
  dialog: {
    height: 80,
  },
}));

function DialogCustomRange({
  defaultRange,
  handleCloseCustomDialog,
  confirmCustomDateRange,
  primary,
}) {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const [customRangeDialog, setCustomRangeDialog] = useState(() => {
    if (!Array.isArray(defaultRange)) {
      return [
        moment().startOf('day').subtract(1, 'week').add(1, 'day'),
        moment().endOf('day'),
      ];
    }
    return defaultRange;
  });

  const confirmAction = () => {
    confirmCustomDateRange(customRangeDialog);
  };

  return (
    <>
      <DialogTitle>{t('Choose fix time')}</DialogTitle>
      <DialogContent className={classes.dialog}>
        <DateTimeRangePicker
          defaultValue={customRangeDialog}
          cbChangeRange={setCustomRangeDialog}
          showTime={false}
          primary={primary}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCustomDialog} color="primary">
          {t('cancel')}
        </Button>
        <Button onClick={confirmAction} color="primary" autoFocus>
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  );
}

export default DialogCustomRange;
