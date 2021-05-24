import React, { useState, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import {
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { toastMsgError } from '../../../commons/Toastify';
import ButtonAdd from '../../../components/ButtonAdd';
import ParticipantInfoStyle from './participantInfo.style';
import { apiSearchAllByKeyEmail, apiGetUser } from '../../../apis/user';

export default function ParticipantInfo({ campaign, setCampaign, pageType }) {
  const { t } = useTranslation();
  const [newParticipant, setNewParticipant] = useState({
    userId: '',
    email: '',
  });
  const [accounts, setAccounts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleClickAddUser = () => {
    const userExist = campaign.participant.findIndex(
      (item) => item.userId === newParticipant.userId,
    );
    if (userExist >= 0) {
      setInputValue('');
      setNewParticipant({});
      toastMsgError(t('errorEmailExits'));
      return;
    }
    apiGetUser(newParticipant.userId)
      .then((res) => {
        if (!res.user) {
          setInputValue('');
          setNewParticipant({});
          toastMsgError(t('userNotRegister'));
        } else {
          setCampaign((prev) => ({
            ...prev,
            participant: [
              ...campaign.participant,
              {
                userId: newParticipant.userId,
                email: newParticipant.email,
                status: 'NOMINATION',
              },
            ],
          }));
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setInputValue('');
    setNewParticipant({});
  };

  const handleDeleteEmail = ({ parDelete }) => {
    const emailList = campaign.participant.filter(
      (item) => item.userId !== parDelete,
    );
    setCampaign((prev) => ({
      ...prev,
      participant: emailList,
    }));
  };

  const delaySearch = useRef(
    debounce(async (searchValue) => {
      if (searchValue.trim() !== '') {
        const data = await apiSearchAllByKeyEmail({ key: searchValue });
        if (data.status) {
          setAccounts(data.result);
        }
      } else {
        setAccounts([]);
      }
    }, 800),
  ).current;
  useEffect(() => {
    if (inputValue === '') {
      setAccounts(newParticipant.email ? [newParticipant.email] : []);
    }
    delaySearch(inputValue);
  }, [newParticipant.email, inputValue]);

  return (
    <ParticipantInfoStyle>
      <Card className="card">
        <div className="cardHeader">
          <Typography variant="h5" className="headerText">
            {t('addInfoParticipant')}
          </Typography>
        </div>
        <div className="cardBody">
          {pageType !== 'view' && (
            <div className="add-participant">
              <Autocomplete
                className="emailField"
                fullWidth
                getOptionLabel={(option) =>
                  option.email ? option.email : option
                }
                options={accounts}
                autoComplete
                autoHighlight
                includeInputInList
                filterSelectedOptions
                value={newParticipant.email}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setAccounts([newValue, ...accounts]);
                    setNewParticipant({
                      ...newParticipant,
                      email: newValue.email,
                      userId: newValue.id,
                    });
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('enterEmail')}
                    name="email"
                  />
                )}
                renderOption={(option) => (
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs>
                      <Typography>{option.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {option.email}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
              <ButtonAdd handleClick={handleClickAddUser}>{t('Add')}</ButtonAdd>
            </div>
          )}

          <TableContainer className="table-container">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Tổng số người tham gia : {campaign.participant.length}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {campaign.participant &&
                  campaign.participant.map((item) => (
                    <TableRow key={item.email}>
                      <TableCell component="th" scope="row">
                        {item.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.status === 1 ? 'Được chỉ định' : 'Đã tham gia'}
                      </TableCell>
                      {pageType !== 'view' && (
                        <TableCell>
                          <DeleteIcon
                            color="secondary"
                            className="icon icon-delete"
                            onClick={() =>
                              handleDeleteEmail({
                                parDelete: item.userId,
                              })
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
      </Card>
    </ParticipantInfoStyle>
  );
}
