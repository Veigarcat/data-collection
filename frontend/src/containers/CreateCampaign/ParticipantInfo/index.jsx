import React, { useState } from 'react';

import {
  Typography,
  Card,
  CardContent,
  Input,
  FormControl,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { toastMsgError } from '../../../commons/Toastify';
import TitleHeader from '../../../components/TitleHeader';
import ButtonAdd from '../../../components/ButtonAdd';
import ParticipantInfoStyle from './participantInfo.style';

export default function ParticipantInfo({ campaign, setCampaign }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleClickAddUse = () => {
    const emailByRole = campaign.participant.findIndex(
      (item) => item.email === email,
    );
    if (emailByRole >= 0) {
      toastMsgError(t('errorEmailExits'));
      return;
    }
    setCampaign((prev) => ({
      ...prev,
      participant: [...campaign.participant, { email, status: 1 }],
    }));
    setEmail('');
  };
  const handleDeleteEmail = ({ emailDelete }) => {
    const emailList = campaign.participant.filter(
      (item) => item.email !== emailDelete,
    );
    setCampaign((prev) => ({
      ...prev,
      participant: emailList,
    }));
  };
  return (
    <ParticipantInfoStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader title="Thêm thông tin về người tham gia" />
          <CardContent>
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
              <ButtonAdd handleClick={handleClickAddUse}>Thêm</ButtonAdd>
            </div>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      Tổng số người tham gia : {campaign.participant.length}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaign.participant &&
                    campaign.participant.map((emailItem) => (
                      <TableRow key={emailItem.email}>
                        <TableCell component="th" scope="row">
                          {emailItem.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {emailItem.status === 1
                            ? 'Được chỉ định'
                            : 'Đã tham gia'}
                        </TableCell>
                        <TableCell>
                          <DeleteIcon
                            color="secondary"
                            className="icon icon-delete"
                            onClick={() =>
                              handleDeleteEmail({
                                emailDelete: emailItem.email,
                              })
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </ParticipantInfoStyle>
  );
}
