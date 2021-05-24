import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function InputConfirmDialog(props) {
  const { open, handleClose, title, onClick, buttonText } = props;
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('cancel')}
        </Button>
        <Button onClick={onClick} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
