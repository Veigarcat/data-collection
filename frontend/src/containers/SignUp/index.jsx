import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Input,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import routes from '../../constants/route';
import actions from '../../redux/actions';

import StyleSignUp from './signUp.style';

export default function SignUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit: handleSubmitForm } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    gender: 'other',
  });
  const handleChangeInput = (e) => {
    e.persist();
    setAccount((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const onHandleSignUp = () => {
    dispatch(actions.auth.signUp(account));
  };

  return (
    <StyleSignUp>
      <Container component="main" className="container" maxWidth="md">
        <div className="paper">
          <Typography component="h1" variant="h5">
            {t('signIn')}
          </Typography>
        </div>
        <form>
          <Grid container spacing={5}>
            <Grid item sm={6} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                label={t('name')}
                name="name"
                value={account.name}
                onChange={(e) => {
                  errors.name = false;
                  handleChangeInput(e);
                }}
                error={!!errors.name}
              />
              <Input
                name="name"
                value={account.name}
                inputRef={register({
                  required: true,
                })}
                className="input-errors"
              />
              {errors.name && (
                <h5 className="text-errors">{t('pleaseEnterName')}</h5>
              )}
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                autoComplete="email"
                label={t('emailAddress')}
                name="email"
                autoFocus
                value={account.email}
                onChange={(e) => {
                  errors.email = false;
                  handleChangeInput(e);
                }}
                error={!!errors.email}
              />
              <Input
                name="email"
                value={account.email}
                inputRef={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  },
                })}
                className="input-errors"
              />
              {errors.email && (
                <h5 className="text-errors">{t('pleaseEnterEmail')}</h5>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item sm={6} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('password')}
                type="password"
                id="password"
                autoComplete="current-password"
                value={account.password}
                onChange={(e) => {
                  errors.password = false;
                  handleChangeInput(e);
                }}
                error={!!errors.password}
              />
              <Input
                name="password"
                value={account.password}
                inputRef={register({
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}$/,
                  },
                })}
                className="input-errors"
              />
              {errors.password && (
                <h5 className="text-errors">{t('pleaseEnterPassword')}</h5>
              )}
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField
                id="date"
                label={t('birthday')}
                type="date"
                className="textField"
                InputLabelProps={{
                  shrink: true,
                }}
                format="MM/dd/yyyy"
                name="birthday"
                value={account.birthday}
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </Grid>
          </Grid>
          <FormControl component="fieldset" className="formControl">
            <FormLabel component="legend">{t('gender')}</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={account.gender}
              onChange={(e) => {
                handleChangeInput(e);
              }}
            >
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label={t('male')}
              />
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label={t('female')}
              />
            </RadioGroup>
          </FormControl>
          <div className="grid-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button-submit"
              onClick={handleSubmitForm(onHandleSignUp)}
            >
              {t('signIn')}
            </Button>
          </div>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link href={routes.LOGIN} variant="body2">
                {t('hadAccount')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </StyleSignUp>
  );
}
