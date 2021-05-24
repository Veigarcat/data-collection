import React, { useState } from 'react';
import {
  Typography,
  Card,
  InputBase,
  Button,
  TextareaAutosize,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Input,
  Grid,
  Select,
  MenuItem,
  TableHead,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { toastMsgError, toastSuccess } from '../../../commons/Toastify';
import ButtonAdd from '../../../components/ButtonAdd';
import TitleHeader from '../../../components/TitleHeader';
import CreateUsecaseStyle from './CreateUsecase.style';
import { LIST_INTENT } from '../../../constants/params';

export default function CreateUsecase({ usecaseList, setUsecaseList }) {
  const { t } = useTranslation();
  const { register, errors, handleSubmit: handleSubmitForm } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const [showUsecase, setShowUsecase] = useState(false);
  const [option, setOption] = useState('');
  const [usecase, setUsecase] = useState({
    id: '',
    name: '',
    desc: '',
    listIntent: [],
    participant: [],
  });
  const [listIntent, setListIntent] = useState([]);
  const [intent, setIntent] = useState({
    id: '',
    name: '',
  });
  const [errorIntent, setErrorIntent] = useState(false);
  const [email, setEmail] = useState('');
  const OnHandleClickAdd = () => {
    setUsecase({
      id: '',
      name: '',
      desc: '',
      listIntent: [],
      participant: [],
    });
    setListIntent([]);
    setOption('ADD');
    setEmail('');
    setShowUsecase(true);
  };
  const onChangeSelectUsecase = (e) => {
    setListIntent([]);
    setEmail('');
    const usecaseItem = usecaseList.find((item) => item.id === e.target.value);
    setUsecase(usecaseItem);
    if (usecaseItem.listIntent) {
      const listIntentFind = [];
      for (let i = 0; i < usecaseItem.listIntent.length; i += 1) {
        const intentFind = LIST_INTENT.find(
          (item) => item.id === usecaseItem.listIntent[i].id,
        );
        if (intentFind) {
          listIntentFind.push(intentFind);
        }
      }
      setListIntent(listIntentFind);
    }
    setOption('EDIT');
    setShowUsecase(true);
  };
  const handleChangeUsecase = (e) => {
    e.persist();
    setUsecase((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeSelectIntent = (e) => {
    setErrorIntent(false);
    const intentIndexById = usecase.listIntent.findIndex(
      (item) => item.id === e.target.value,
    );
    const intentById = LIST_INTENT.find((item) => item.id === e.target.value);
    setIntent((prev) => ({
      ...prev,
      id: e.target.value,
      name: intentById.name,
    }));
    if (intentIndexById >= 0) {
      setErrorIntent(true);
    }
  };

  const handleClickAddIntent = () => {
    setListIntent([...listIntent, intent]);
    setUsecase((prev) => ({
      ...prev,
      listIntent: [...usecase.listIntent, { id: intent.id }],
    }));
    setIntent({
      id: '',
      name: '',
    });
  };
  const handleDeleteIntent = (intentDeleteId) => {
    const arrIntent = usecase.listIntent.filter(
      (item) => item.id !== intentDeleteId,
    );
    if (arrIntent) {
      const listIntentFind = [];
      for (let i = 0; i < arrIntent.length; i += 1) {
        const intentFind = LIST_INTENT.find(
          (item) => item.id === arrIntent[i].id,
        );
        if (intentFind) {
          listIntentFind.push(intentFind);
        }
      }
      setListIntent(listIntentFind);
    }
    setUsecase((prev) => ({
      ...prev,
      listIntent: arrIntent,
    }));
  };
  const handleAddParticipant = () => {
    const emailByRole = usecase.participant.findIndex(
      (item) => item.email === email,
    );
    if (emailByRole >= 0) {
      toastMsgError(t('errorEmailExits'));
      return;
    }
    const emailNew = email
      ? [...usecase.participant, { email, status: 1 }]
      : [...usecase.participant];
    setUsecase((prev) => ({
      ...prev,
      participant: emailNew,
    }));
    setEmail('');
  };
  const handleDeleteParticipant = (emailDelete) => {
    const arrEmail = usecase.participant.filter(
      (item) => item.email !== emailDelete,
    );
    setUsecase((prev) => ({
      ...prev,
      participant: arrEmail,
    }));
  };
  const handleAddUsecase = () => {
    if (usecase.listIntent.length === 0) {
      toastMsgError(t('pleaseEnterLessOneIntentUsecase'));
      return;
    }
    setUsecaseList((prev) => [
      ...prev,
      {
        ...usecase,
        id: uuidv4(),
      },
    ]);
    toastSuccess('Tạo mới kịch bản thành công');
    setUsecase({
      id: '',
      name: '',
      desc: '',
      listIntent: [],
      participant: [],
    });
    setListIntent([]);
    setOption('');
    setEmail('');
    setShowUsecase(false);
  };
  const handleDeleteUsecase = () => {
    const arrUsecase = usecaseList.filter((item) => item.id !== usecase.id);
    setUsecaseList(arrUsecase);
    toastSuccess('Xóa kịch bản thành công');
    setUsecase({
      id: '',
      name: '',
      desc: '',
      listIntent: [],
      participant: [],
    });
    setListIntent([]);
    setOption('');
    setEmail('');
    setShowUsecase(false);
  };
  const handleEditUsecase = () => {
    const usecaseIndexById = usecaseList.findIndex(
      (item) => item.id === usecase.id,
    );
    setUsecaseList([
      ...usecaseList.slice(0, usecaseIndexById),
      usecase,
      ...usecaseList.slice(usecaseIndexById + 1),
    ]);
    toastSuccess('Chỉnh sửa kịch bản thành công');
    setUsecase({
      id: '',
      name: '',
      desc: '',
      listIntent: [],
      participant: [],
    });
    setListIntent([]);
    setOption('');
    setEmail('');
    setShowUsecase(false);
  };

  return (
    <CreateUsecaseStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader
            title="Thông tin về kịch bản"
            button="Thêm kịch bản"
            onHandle={OnHandleClickAdd}
          />
          <div className="select-usecase">
            <Grid container className="select-container">
              <Grid item sm={4} sx={4} className="select-item">
                <Typography variant="subtitle1">Chọn kịch bản</Typography>
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
                    defaultValue={1}
                    value={usecase.id}
                    onChange={onChangeSelectUsecase}
                  >
                    {usecaseList &&
                      usecaseList.map((item) => (
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
                {errorIntent && (
                  <Typography style={{ color: 'red' }} variant="caption">
                    {t('errorIntentHaveBeenAdded')}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
          {showUsecase && (
            <div className="add-usecase">
              <Typography variant="h6" className="title-name-usecase">
                {option === 'ADD' ? 'Thêm kịch bản' : 'Chỉnh sửa kịch bản'}
              </Typography>
              <div className="usecase-name">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="input-title"
                >
                  Tên kịch bản
                </Typography>
                <FormControl
                  className="form-control-name-usecase"
                  error={errors.name}
                >
                  <InputBase
                    className={
                      errors.name
                        ? 'input-name-usecase error'
                        : 'input-name-usecase'
                    }
                    name="name"
                    value={usecase.name}
                    onChange={(e) => {
                      errors.name = false;
                      handleChangeUsecase(e);
                    }}
                    inputRef={register({
                      required: true,
                    })}
                  />
                  {errors.name && (
                    <h5 className="text-errors">
                      {t('pleaseEnterNameUsecase')}
                    </h5>
                  )}
                </FormControl>
              </div>
              <div className="usecase-desc">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="input-title"
                >
                  Mô tả kịch bản
                </Typography>
                <FormControl
                  className="form-control-name-usecase"
                  error={errors.desc}
                >
                  <TextareaAutosize
                    aria-label="minimum height"
                    rowsMin={5}
                    className="input-name-usecase"
                    name="desc"
                    value={usecase.desc}
                    onChange={(e) => {
                      errors.desc = false;
                      handleChangeUsecase(e);
                    }}
                  />
                  <Input
                    name="desc"
                    value={usecase.desc}
                    inputRef={register({
                      required: true,
                    })}
                    className="input-errors"
                  />
                  {errors.desc && (
                    <h5 className="text-errors">
                      {t('pleaseEnterDescUsecase')}
                    </h5>
                  )}
                </FormControl>
              </div>
              <div className="intent-info">
                <Typography variant="h6" className="name-intent">
                  Thông tin ý định
                </Typography>
                <div className="add-intent">
                  <div className="select-intent">
                    <Grid container className="select-container">
                      <Grid item sm={4} sx={4} className="select-item">
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
                            value={intent.id}
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
                  <ButtonAdd
                    handleClick={intent.id ? handleClickAddIntent : null}
                    disable={!!errorIntent}
                  >
                    Thêm ý định
                  </ButtonAdd>
                </div>
                <TableContainer className="table-container">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={2}>
                          Tổng ý định đã thêm: {listIntent.length}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listIntent &&
                        listIntent.map((intentItem) => (
                          <TableRow key={intentItem.id}>
                            <TableCell component="th" scope="row">
                              {intentItem.name}
                            </TableCell>
                            <TableCell>
                              <DeleteIcon
                                color="secondary"
                                className="icon icon-delete"
                                onClick={() =>
                                  handleDeleteIntent(intentItem.id)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
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
                          {usecase.participant.length}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usecase.participant &&
                        usecase.participant.map((emailItem) => (
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
              <div className="button button-add-usecase">
                {option === 'ADD' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitForm(handleAddUsecase)}
                    className="button"
                  >
                    Thêm kịch bản
                  </Button>
                )}
                {option === 'EDIT' && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteUsecase}
                      className="button"
                    >
                      Xóa kịch bản
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitForm(handleEditUsecase)}
                      className="button"
                    >
                      Chỉnh sửa kịch bản
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </CreateUsecaseStyle>
  );
}
