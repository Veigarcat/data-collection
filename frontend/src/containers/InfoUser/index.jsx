/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Link,
  // Checkbox,
  // Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEditUser,
  fetchHandleUserSuccess,
} from '../../redux/user/actions';

import InfoUserStyle from './infoUser.style';
import { toastMsgError, toastSuccess } from '../../commons/Toastify';
import { apiGetUser } from '../../apis/user';
import { SSO_DOMAIN } from '../../configs';

export default function InfoUser() {
  const { t } = useTranslation();
  const { userId, accessToken } = useSelector((state) => state.auth);
  const { noticeHandleUserSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    gender: '',
    password: '',
    birthday: '',
    accent: '',
  });
  const notificationUpdate = () => {
    dispatch(
      fetchEditUser({
        accessToken,
        user: dataUser,
      }),
    );
    console.log('update');
  };
  useEffect(() => {
    apiGetUser(userId)
      .then((res) => {
        setDataUser(res.user);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const onHandleDataUser = (e) => {
    e.persist();
    setDataUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (noticeHandleUserSuccess) {
      toastSuccess('Cập nhật thông tin người dùng thành công');
      dispatch(fetchHandleUserSuccess(false));
    }
  }, [noticeHandleUserSuccess]);
  return (
    <InfoUserStyle>
      <div className="info-user-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="info-user-title"
        >
          {t('infoUser')}
        </Typography>
        <div className="info-user">
          <TextField
            label={t('name')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            name="nameUser"
            value={dataUser.name}
            disabled="true"
          />
          <TextField
            label={t('phone')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            type="number"
            name="phone"
            value={dataUser.phone}
            onChange={onHandleDataUser}
          />
          <TextField
            label={t('email')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            type="email"
            name="email"
            value={dataUser.email}
            disabled="true"
          />
          <TextField
            label={t('birthday')}
            type="date"
            className="input-info"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="birthday"
            value={dataUser.birthday}
            onChange={onHandleDataUser}
          />
          <FormControl component="fieldset" className="input-info">
            <FormLabel component="legend">{t('accent')}</FormLabel>
            <RadioGroup
              aria-label="accent"
              name="accent"
              className="accent"
              value={dataUser.accent}
              onChange={onHandleDataUser}
            >
              <FormControlLabel
                value="north"
                control={<Radio />}
                label={t('north')}
              />
              <FormControlLabel
                value="central"
                control={<Radio />}
                label={t('central')}
              />
              <FormControlLabel
                value="south"
                control={<Radio />}
                label={t('south')}
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className="input-info">
            <FormLabel component="legend">{t('gender')}</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              className="gender"
              value={dataUser.gender}
              onChange={onHandleDataUser}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={t('female')}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={t('male')}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label={t('other')}
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="update"
            onClick={notificationUpdate}
          >
            {t('update')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="update-advanced"
          >
            <Link
              href={`${SSO_DOMAIN}/settings`}
              color="inherit"
              underline="none"
            >
              {t('updateAdvanced')}
            </Link>
          </Button>
        </div>
      </div>
    </InfoUserStyle>
  );
}
