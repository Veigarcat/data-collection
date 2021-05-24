import React from 'react';
import { Card, Typography, Button } from '@material-ui/core';

import UsecaseListStyle from './usecaseList.style';

export default function UsecaseList(props) {
  const arrUsecase = [
    {
      title: 'Thông tin Usecase ABC',
      text_button: 'Tiếp tục',
    },
    {
      title: 'Thông tin Usecase ABC 1',
      text_button: 'Bắt đầu',
    },
    {
      title: 'Thông tin Usecase ABC 2',
      text_button: 'Bắt đầu',
    },
  ];
  const { handleConvertUsecase } = props;
  return (
    <UsecaseListStyle>
      <div className="usecase-list">
        {arrUsecase.map((item) => (
          <Card className="usecase-item" key={item.title}>
            <Typography gutterBottom variant="h4" component="h3">
              {item.title}
            </Typography>
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                className="button-continue"
                onClick={handleConvertUsecase}
              >
                {item.text_button}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </UsecaseListStyle>
  );
}
