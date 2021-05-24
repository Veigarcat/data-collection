import React, { useState } from 'react';
import {
  Typography,
  Card,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import ButtonAdd from '../../../components/ButtonAdd';
import CreateIntentStyle from './createIntent.style';

export default function CreateIntent({
  intentList,
  setIntentList,
  pageType,
  intentListApi,
  setIntentListApi,
}) {
  const { t } = useTranslation();
  const [intents, setIntents] = useState({
    name: '',
    id: '',
    display_name: '',
  });
  const [errorIntent, setErrorIntent] = useState(false);

  const onChangeSelectIntent = (e) => {
    setErrorIntent(false);
    const intentIndexById = intentList.findIndex(
      (item) => item.id === e.target.value,
    );
    const intentById = intentListApi.find((item) => item.id === e.target.value);
    setIntents((prev) => ({
      ...prev,
      id: e.target.value,
      name: intentById.name,
      display_name: intentById.display_name,
    }));
    if (intentIndexById >= 0) {
      setErrorIntent(true);
    }
  };
  const handleClickAddIntent = () => {
    setIntentList((prev) => [...prev, intents]);
    setIntentListApi(intentListApi.filter((item) => item.id !== intents.id));
    setIntents({
      id: '',
      name: '',
      display_name: '',
    });
  };
  const handleDeleteIntent = (intentId) => {
    const arrIntent = intentList.filter((item) => item.id !== intentId);
    const intentDelete = intentList.find((item) => item.id === intentId);
    setIntentList(arrIntent);
    setIntentListApi([...intentListApi, intentDelete]);
  };

  return (
    <CreateIntentStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('intentInfo')}
          </Typography>
        </div>
        <div className="cardBody">
          <div className="intent-info">
            <Typography variant="h6" className="title-name-list-intent">
              Danh sách ý định
            </Typography>
            {pageType !== 'view' && (
              <div className="add-intent">
                <Grid container className="select-container">
                  <Grid item sm={3} sx={3} className="select-item">
                    <Typography variant="subtitle1">Chọn ý định</Typography>
                  </Grid>

                  <Grid item sm={8} sx={8} className="select-item">
                    <FormControl
                      error={!!errorIntent}
                      className="form-control-select"
                    >
                      <Select
                        className={
                          errorIntent
                            ? 'select-component error'
                            : 'select-component'
                        }
                        value={intents.id}
                        name="id"
                        onChange={onChangeSelectIntent}
                      >
                        {intentListApi &&
                          intentListApi.map((item) => (
                            <MenuItem
                              value={item.id}
                              className="select-component-item"
                              key={item.id}
                            >
                              {item.display_name} {item.displayName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    {errorIntent && (
                      <Typography style={{ color: 'red' }} variant="caption">
                        {t('errorIntentHaveBeenAdded')}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <ButtonAdd
                  handleClick={intents.id ? handleClickAddIntent : null}
                  disable={!!errorIntent}
                >
                  Thêm ý định
                </ButtonAdd>
              </div>
            )}
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  {intentList &&
                    intentList.map((intentItem) => (
                      <TableRow key={intentItem.id}>
                        <TableCell component="th" scope="row">
                          {intentItem.display_name} {intentItem.displayName}
                        </TableCell>
                        {pageType !== 'view' && (
                          <TableCell>
                            <DeleteIcon
                              color="secondary"
                              className="icon icon-delete"
                              onClick={() => handleDeleteIntent(intentItem.id)}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  {!intentList && (
                    <Typography variant="body2">{t('noData')}</Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Card>
    </CreateIntentStyle>
  );
}
