import React, { useState } from 'react';
import {
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Grid,
  Select,
  MenuItem,
  TableHead,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { toastMsgError, toastSuccess } from '../../../commons/Toastify';
import ButtonAdd from '../../../components/ButtonAdd';
import TitleHeader from '../../../components/TitleHeader';
import CreateIntentStyle from './createIntent.style';
import { LIST_INTENT } from '../../../constants/params';

export default function CreateIntent({ intentList, setIntentList }) {
  const { t } = useTranslation();
  const [intents, setIntents] = useState({
    name: '',
    id: '',
    participant: [],
  });
  const [errorIntent, setErrorIntent] = useState(false);
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('');

  const [showIntent, setShowIntent] = useState(false);

  const OnHandleClickAdd = () => {
    setOption('ADD');
    setShowIntent(true);
    setIntents({
      name: '',
      id: '',
      participant: [],
    });
    setEmail('');
  };
  const handleChooseIntent = (e) => {
    const intentItem = intentList.find((item) => item.id === e.target.value);
    setIntents(intentItem);
    setOption('EDIT');
    setShowIntent(true);
    setEmail('');
  };
  const onChangeSelectIntent = (e) => {
    setErrorIntent(false);
    const intentIndexById = intentList.findIndex(
      (item) => item.id === e.target.value,
    );
    const intentById = LIST_INTENT.find((item) => item.id === e.target.value);
    setIntents((prev) => ({
      ...prev,
      id: e.target.value,
      name: intentById.name,
    }));
    if (intentIndexById >= 0) {
      setErrorIntent(true);
    }
  };
  const handleAddParticipant = () => {
    const emailDuplicate = intents.participant.findIndex(
      (item) => item.email === email,
    );
    if (emailDuplicate >= 0) {
      toastMsgError(t('errorEmailExits'));
      return;
    }
    setIntents((prev) => ({
      ...prev,
      participant: [...intents.participant, { email, status: 1 }],
    }));
    setEmail('');
  };
  const handleDeleteParticipant = (emailDelete) => {
    const arrEmail = intents.participant.filter(
      (item) => item.email !== emailDelete,
    );
    setIntents((prev) => ({
      ...prev,
      participant: arrEmail,
    }));
  };
  const handleAddIntentToList = () => {
    if (!intents.id) {
      toastMsgError(t('pleaseEnterLessOneIntentUsecase'));
      return;
    }
    setIntentList((prev) => [
      ...prev,
      {
        ...intents,
        id: uuidv4(),
      },
    ]);
    toastSuccess('Tạo mới ý định thành công');
    setIntents({
      id: '',
      name: '',
      participant: [],
    });
    setOption('');
    setShowIntent(false);
    setEmail('');
  };
  const handleDeleteIntentToList = () => {
    const arrIntent = intentList.filter((item) => item.id !== intents.id);
    setIntentList(arrIntent);
    setIntents({
      id: '',
      name: '',
      participant: [],
    });
    setOption('');
    setEmail('');
    setShowIntent(false);
    toastSuccess('Xóa ý định thành công');
  };
  const handleEditIntentToList = () => {
    const intentEditIndex = intentList.findIndex(
      (item) => item.id === intents.id,
    );
    setIntentList([
      ...intentList.slice(0, intentEditIndex),
      intents,
      ...intentList.slice(intentEditIndex + 1),
    ]);
    setShowIntent(false);
    toastSuccess('Chỉnh sửa ý định thành công');
    setIntents({
      id: '',
      name: '',
      participant: [],
    });
    setOption('');
    setEmail('');
  };

  return (
    <CreateIntentStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader
            title="Thông tin về ý đinh"
            button="Thêm ý định"
            onHandle={OnHandleClickAdd}
          />
          <div className="select-usecase">
            <Grid container className="select-container">
              <Grid item sm={4} sx={4} className="select-item">
                <Typography variant="subtitle1">Chọn ý định</Typography>
              </Grid>
              <Grid item sm={8} sx={8} className="select-item">
                <FormControl className="form-control-select">
                  <Select
                    className="select-component"
                    value={intents.id}
                    onChange={handleChooseIntent}
                  >
                    {intentList &&
                      intentList.map((item) => (
                        <MenuItem
                          value={item.id}
                          className="select-component-item"
                          key={item.id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    <MenuItem aria-label="None" value="" />
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          {showIntent && (
            <div className="add-usecase">
              <div className="intent-info">
                <Typography variant="h6" className="title-name-usecase">
                  {option === 'ADD' ? 'Thêm ý định' : 'Chỉnh sửa ý định'}
                </Typography>
                {option === 'ADD' && (
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
                            {LIST_INTENT &&
                              LIST_INTENT.map((item) => (
                                <MenuItem
                                  value={item.id}
                                  className="select-component-item"
                                  key={item.id}
                                >
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        {errorIntent && (
                          <Typography
                            style={{ color: 'red' }}
                            variant="caption"
                          >
                            {t('errorIntentHaveBeenAdded')}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                )}

                <TableContainer className="table-container">
                  <Table aria-label="simple table">
                    <TableBody>
                      {intents.name && (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {intents.name}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="participant-info">
                <Typography variant="h6" className="name-intent">
                  Thêm người tham gia chat
                </Typography>
                <div className="add-participant">
                  <div className="email-participant">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      className="input-number-title"
                    >
                      Nhập email
                    </Typography>
                    <FormControl className="form-control">
                      <TextField
                        className="text-field"
                        value={email}
                        name="email"
                        onChange={(e) => {
                          e.persist();
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <ButtonAdd handleClick={handleAddParticipant}>Thêm</ButtonAdd>
                </div>
                <TableContainer className="table-container">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={2}>
                          Tổng số lượng người tham gia:{' '}
                          {intents.participant.length}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {intents.participant &&
                        intents.participant.map((emailItem) => (
                          <TableRow key={emailItem.email}>
                            <TableCell component="th" scope="row">
                              {emailItem.email}
                            </TableCell>
                            <TableCell>
                              <DeleteIcon
                                color="secondary"
                                className="icon icon-delete"
                                onClick={() =>
                                  handleDeleteParticipant(emailItem.email)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="button button-add-intent">
                {option === 'ADD' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddIntentToList}
                    className="button"
                  >
                    Thêm ý định
                  </Button>
                )}
                {option === 'EDIT' && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteIntentToList}
                      className="button"
                    >
                      Xóa ý định
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEditIntentToList}
                      className="button"
                    >
                      Chỉnh sửa ý định
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </CreateIntentStyle>
  );
}
