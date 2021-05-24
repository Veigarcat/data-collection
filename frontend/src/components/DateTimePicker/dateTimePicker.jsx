import React, { useMemo } from 'react';
import moment from 'moment';
import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import { ThemeProvider } from '@material-ui/styles';
import {
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { mainColors } from '../../configs/styleConstant';

const materialTheme = createMuiTheme({
  palette: {
    secondary: {
      light: amber[400],
      main: amber[600],
      dark: amber[700],
    },
    primary: {
      light: mainColors.darkBlue,
      main: mainColors.darkBlue,
      dark: mainColors.darkBlue,
    },
  },
  overrides: {
    MuiPickersBasePicker: {
      container: {
        minWidth: '355px',
      },
    },
  },
});

const primaryTheme = createMuiTheme({
  palette: {
    secondary: {
      light: amber[400],
      main: amber[600],
      dark: amber[700],
    },
    primary: {
      light: mainColors.havelockBlue,
      main: mainColors.havelockBlue,
      dark: mainColors.havelockBlue,
    },
  },
  overrides: {
    MuiPickersBasePicker: {
      container: {
        minWidth: '355px',
      },
    },
  },
});

const defaultProps = {
  disableToolbar: false,
  variant: 'inline',
  value: Date.now(),
  onChange() {},
  showTime: true,
  primary: false,
};

function CustomDateTimePicker({
  variant,
  format,
  value,
  onChange,
  onOpen,
  onClose,
  disableToolbar,
  showTime,
  primary,
  ...rest
}) {
  const dateTimeFormat = useMemo(() => {
    if (format) return format;
    if (showTime) return 'DD/MM/YYYY HH:mm';
    return 'DD/MM/YYYY';
  });

  const props = {
    disableToolbar,
    variant,
    value,
    onChange,
    onOpen,
    onClose,
    format: dateTimeFormat,
    ampm: false,
    ...rest,
  };

  const theme = primary ? primaryTheme : materialTheme;

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <ThemeProvider theme={theme}>
        {showTime ? <DateTimePicker {...props} /> : <DatePicker {...props} />}
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

CustomDateTimePicker.defaultProps = defaultProps;

export default CustomDateTimePicker;
