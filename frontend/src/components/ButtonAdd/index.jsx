import React from 'react';
import { Button } from '@material-ui/core';
import ButtonAddStyle from './index.style';

export default function ButtonAdd({ children, handleClick, disable }) {
  return (
    <ButtonAddStyle>
      <Button className="button-add" onClick={handleClick} disabled={disable}>
        {children}
      </Button>
    </ButtonAddStyle>
  );
}
