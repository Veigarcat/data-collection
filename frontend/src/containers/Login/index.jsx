import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  Link,
  Input,
} from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import routes from '../../constants/route';
import { login } from '../../redux/auth/actions';

import StyleLogin from './index.style';

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit: handleSubmitForm } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    dispatch(login(email, password));
  };
  return (
    <StyleLogin>
      <Container component="main" className="container">
        <Grid container spacing={5}>
          <Grid item sm={4} md={7} className="bg-image" />
          <Grid item sm={8} md={5} className="grid-form">
            <div className="paper">
              <Typography component="h1" variant="h5">
                {t('login')}
              </Typography>
            </div>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="email"
                autoFocus
                label={t('emailAddress')}
                name="email"
                value={email}
                onChange={(e) => {
                  errors.email = false;
                  setEmail(e.target.value);
                }}
                error={!!errors.email}
              />
              <Input
                name="email"
                value={email}
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
                type="password"
                label={t('password')}
                name="password"
                value={password}
                onChange={(e) => {
                  errors.password = false;
                  setPassword(e.target.value);
                }}
                error={!!errors.password}
              />
              <Input
                name="password"
                value={password}
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t('rememberMe')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button-submit"
                onClick={handleSubmitForm(onHandleLogin)}
              >
                {t('login')}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href={routes.SIGNUP} variant="body2">
                    {t('forgotPassword')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={routes.SIGNUP} variant="body2">
                    {t('doNotHaveAccount')}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
      <NotificationContainer />
    </StyleLogin>
  );
}
