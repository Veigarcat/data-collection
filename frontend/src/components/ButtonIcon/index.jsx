import React from 'react';
import { Button } from '@material-ui/core';
import ButtonIconStyle from './index.style';

export default function TitleHeader({ children }) {
  return (
    <ButtonIconStyle>
      <Button className="button-icon">{children}</Button>
    </ButtonIconStyle>
  );
}
