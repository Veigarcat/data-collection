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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { toastMsgError, toastSuccess } from '../../../commons/Toastify';
import ButtonAdd from '../../../components/ButtonAdd';
import CreateUsecaseStyle from './CreateUsecase.style';

export default function CreateUsecase({
  usecaseList,
  setUsecaseList,
  pageType,
  intentListApi,
  setIntentListApi,
}) {
  const { t } = useTranslation();
  const { register, errors, handleSubmit: handleSubmitForm } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const [showUsecase, setShowUsecase] = useState(false);
  const [intentListApiTemp, setIntentListApiTmp] = useState([]);
  const [option, setOption] = useState('');
  const [usecase, setUsecase] = useState({
    id: '',
    name: '',
    desc: '',
    intentList: [],
    participant: [],
  });
  const [intent, setIntent] = useState({
    id: '',
    name: '',
    display_name: '',
  });
  const [errorIntent, setErrorIntent] = useState(false);
  const OnHandleClickAdd = () => {
    if (intentListApiTemp.length === 0) {
      setIntentListApiTmp(intentListApi);
    }
    if (intentListApiTemp.length) {
      setIntentListApi(intentListApiTemp);
    }
    setUsecase({
      id: '',
      name: '',
      desc: '',
      intentList: [],
      participant: [],
    });
    setIntent({
      id: '',
      name: '',
    });
    setOption('ADD');
    setShowUsecase(true);
  };
  const onChangeSelectUsecase = (e) => {
    setIntent({
      id: '',
      name: '',
      display_name: '',
    });
    if (intentListApiTemp.length === 0) {
      setIntentListApiTmp(intentListApi);
    }
    if (intentListApiTemp.length) {
      setIntentListApi(intentListApiTemp);
    }
    const usecaseItem = usecaseList.find((item) => item.id === e.target.value);
    setUsecase(usecaseItem);
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
    const intentIndexById = usecase.intentList.findIndex(
      (item) => item.id === e.target.value,
    );
    const intentById = intentListApi.find((item) => item.id === e.target.value);
    setIntent((prev) => ({
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
    setIntentListApi(intentListApi.filter((item) => item.id !== intent.id));
    setUsecase((prev) => ({
      ...prev,
      intentList: [...usecase.intentList, intent],
    }));
    setIntent({
      id: '',
      name: '',
      display_name: '',
    });
  };
  const handleDeleteIntent = (intentDeleteId) => {
    const arrIntent = usecase.intentList.filter(
      (item) => item.id !== intentDeleteId,
    );
    const intentDelete = usecase.intentList.find(
      (item) => item.id === intentDeleteId,
    );
    setUsecase((prev) => ({
      ...prev,
      intentList: arrIntent,
    }));
    setIntentListApi([...intentListApi, intentDelete]);
  };
  const handleAddUsecase = () => {
    if (usecase.intentList.length === 0) {
      toastMsgError(t('pleaseEnterLessOneIntentUsecase'));
      return;
    }
    setIntentListApiTmp(intentListApi);
    setUsecaseList((prev) => [
      ...prev,
      {
        ...usecase,
        id: uuidv4(),
      },
    ]);
    toastSuccess('Tạo mới kịch bản thành công');
    setIntent({
      id: '',
      name: '',
      display_name: '',
    });
    setUsecase({
      id: '',
      name: '',
      desc: '',
      intentList: [],
      participant: [],
    });
    setOption('');
    setShowUsecase(false);
  };
  const handleDeleteUsecase = () => {
    const arrUsecase = usecaseList.filter((item) => item.id !== usecase.id);
    setUsecaseList(arrUsecase);
    toastSuccess('Xóa kịch bản thành công');
    setIntent({
      id: '',
      name: '',
      display_name: '',
    });
    setUsecase({
      id: '',
      name: '',
      desc: '',
      intentList: [],
      participant: [],
    });
    setOption('');
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
    setIntentListApiTmp(intentListApi);
    setIntent({
      id: '',
      name: '',
      display_name: '',
    });
    setUsecase({
      id: '',
      name: '',
      desc: '',
      intentList: [],
      participant: [],
    });
    setOption('');
    setShowUsecase(false);
  };

  return (
    <CreateUsecaseStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('usecaseInfo')}
          </Typography>
          {pageType !== 'view' && (
            <Button className="buttonIcon" onClick={OnHandleClickAdd}>
              <AddIcon />
              {t('new')}
            </Button>
          )}
        </div>
        <div className="cardBody">
          <div>
            {usecaseList.length > 0 && (
              <Typography variant="subtitle1">
                Tổng số kịch bản đã thêm {usecaseList.length}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                sm={3}
                md={2}
                lg={2}
                xl={2}
                className="choose-usecase-title"
              >
                <Typography variant="subtitle1">Chọn kịch bản</Typography>
              </Grid>
              <Grid item xs={7} sm={7} md={10} lg={8} xl={8}>
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
              </Grid>
            </Grid>
          </div>
          {showUsecase && (
            <div className="add-usecase">
              <Typography variant="h5" align="center" gutterBottom>
                {pageType === 'view' && t('usecaseDetail')}
                {pageType !== 'view' && option === 'ADD' && t('usecaseAdd')}
                {pageType !== 'view' && option === 'EDIT' && t('usecaseEdit')}
              </Typography>
              <Grid container className="uc-container">
                <Grid item xs={2} sm={2}>
                  <Typography variant="subtitle1" className="title">
                    {t('usecaseName')}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <FormControl
                    className="form-control-name-usecase"
                    error={errors.name}
                  >
                    <InputBase
                      disabled={pageType === 'view'}
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
                </Grid>
              </Grid>
              <Grid container className="uc-container">
                <Grid item xs={2} sm={2}>
                  <Typography variant="subtitle1" className="title">
                    {t('usecaseDescription')}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <FormControl
                    className="form-control-name-usecase"
                    error={errors.desc}
                  >
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={5}
                      className="input_text_tts"
                      name="desc"
                      value={usecase.desc}
                      onChange={(e) => {
                        errors.desc = false;
                        handleChangeUsecase(e);
                      }}
                      disabled={pageType === 'view'}
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
                </Grid>
              </Grid>
              <div className="intent-info">
                <Typography variant="h6" className="name-intent">
                  Thông tin ý định
                </Typography>
                {pageType !== 'view' && (
                  <div className="add-intent">
                    <Grid container className="select-container" spacing={2}>
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={2}
                        lg={2}
                        xl={2}
                        className="choose-intent-title"
                      >
                        <Typography variant="subtitle1">Chọn ý định</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        sm={7}
                        md={10}
                        lg={8}
                        xl={8}
                        className="select-item"
                      >
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
                          <Typography
                            style={{ color: 'red' }}
                            variant="caption"
                          >
                            {t('errorIntentHaveBeenAdded')}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <ButtonAdd
                      handleClick={intent.id ? handleClickAddIntent : null}
                      disable={!!errorIntent}
                    >
                      Thêm ý định
                    </ButtonAdd>
                  </div>
                )}
                <TableContainer className="table-container">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={2}>
                          Tổng ý định đã thêm: {usecase.intentList.length}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usecase.intentList &&
                        usecase.intentList.map((intentItem) => (
                          <TableRow key={intentItem.id}>
                            <TableCell component="th" scope="row">
                              {intentItem.displayName} {intentItem.display_name}
                            </TableCell>
                            {pageType !== 'view' && (
                              <TableCell>
                                <DeleteIcon
                                  color="secondary"
                                  className="icon icon-delete"
                                  onClick={() =>
                                    handleDeleteIntent(intentItem.id)
                                  }
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="button button-add-usecase">
                {pageType !== 'view' && option === 'ADD' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitForm(handleAddUsecase)}
                    className="button"
                  >
                    Thêm kịch bản
                  </Button>
                )}
                {pageType !== 'view' && option === 'EDIT' && (
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
                      onClick={handleSubmitForm(handleEditUsecase)}
                      className="button button-edit"
                    >
                      Chỉnh sửa kịch bản
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </CreateUsecaseStyle>
  );
}
