import React, { useState, useContext } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Icon,
  TextField,
} from '@material-ui/core';

import { ReportTemplateContext } from '../index';
// import TablePreview from './tablePreview';

export default function Preview() {
  const { curReport, setCurReport } = useContext(ReportTemplateContext);
  const { titleHeader } = curReport;

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(titleHeader);

  const handleChangeNewTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const confirmEditTitle = () => {
    setIsEditTitle(false);
    setCurReport({ ...curReport, titleHeader: newTitle });
  };

  const cancelEdit = () => {
    setIsEditTitle(false);
    setNewTitle(titleHeader);
  };

  const renderTitleHeader = () => {
    if (!isEditTitle) {
      return (
        <>
          <Typography variant="h5">{newTitle}</Typography>
        </>
      );
    }
    return (
      <>
        <TextField value={newTitle} onChange={handleChangeNewTitle} />
        <IconButton onClick={confirmEditTitle}>
          <Icon>check</Icon>
        </IconButton>
        <IconButton onClick={cancelEdit}>
          <Icon>close</Icon>
        </IconButton>
      </>
    );
  };

  return (
    <Paper className="preview">
      <div className="header">
        <div className="reportTitle">{renderTitleHeader()}</div>
      </div>
      {/* {renderContent()} */}
    </Paper>
  );
}
