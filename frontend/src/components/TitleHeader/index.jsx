import React from 'react';
import { Button, Typography } from '@material-ui/core';
import ButtonAddStyle from './index.style';

export default function TitleHeader({ title, button, onHandle }) {
  return (
    <ButtonAddStyle>
      <div className="card-header">
        <Typography variant="h6" className="header-text">
          {' '}
          {title}
        </Typography>
        {button && (
          <Button className="button-icon" onClick={onHandle}>
            {button}
          </Button>
        )}
      </div>
    </ButtonAddStyle>
  );
}
