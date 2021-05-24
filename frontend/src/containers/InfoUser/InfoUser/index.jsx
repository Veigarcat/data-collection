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
  Checkbox,
} from '@material-ui/core';
// import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfoUserStyle from './infoUser.style';
import { apiGetUser } from '../../../apis/user';

export default function InfoUser() {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    gender: '',
    password: '',
    birthday: '',
  });
  const notificationUpdate = () => {
    // eslint-disable-next-line no-console
    console.log('update');
  };
  useEffect(() => {
    apiGetUser('60515bce905163397cdd45e8')
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
        <div id="info-user">
          <Typography gutterBottom className="update-success">
            {t('updateInfoUserSuccess')}
          </Typography>
          <Typography gutterBottom className="update-failed">
            {t('updateInfoUserFailed')}
          </Typography>
          <TextField
            label={t('nameUser')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            name="nameUser"
            value={dataUser.name}
            onChange={onHandleDataUser}
          />
          <TextField
            label={t('phone')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            name="phone"
            value={dataUser.phone}
            onChange={onHandleDataUser}
          />
          <TextField
            label={t('email')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
            name="email"
            value={dataUser.email}
            onChange={onHandleDataUser}
          />
          <TextField
            label={t('birthday')}
            type="date"
            format="dd-MM-yyyy"
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
            <FormLabel component="legend">{t('gender')}</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              className="gender"
              value={dataUser.gender}
              onChange={onHandleDataUser}
            >
              <FormControlLabel
                value={t('female')}
                control={<Radio />}
                label={t('female')}
              />
              <FormControlLabel
                value={t('male')}
                control={<Radio />}
                label={t('male')}
              />
              <FormControlLabel
                value={t('other')}
                control={<Radio />}
                label={t('other')}
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="update-button"
            onClick={notificationUpdate}
          >
            {t('update')}
          </Button>
        </div>
        <FormControlLabel
          className="input-info"
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          }
          label={t('changePassword')}
        />
        <div
          className={checked ? 'change-password-show' : 'change-password-hide'}
        >
          <Typography gutterBottom className="update-success">
            {t('updatePasswordSuccess')}
          </Typography>
          <Typography gutterBottom className="update-failed">
            {t('updatePasswordFailed')}
          </Typography>
          <TextField
            type="password"
            label={t('oldPassword')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
          />
          <TextField
            type="password"
            label={t('newPassword')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
          />
          <TextField
            type="password"
            label={t('confirmPassword')}
            id="outlined-start-adornment"
            className="input-info"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className="update-button"
            onClick={notificationUpdate}
          >
            {t('update')}
          </Button>
        </div>
      </div>
    </InfoUserStyle>
  );
}
