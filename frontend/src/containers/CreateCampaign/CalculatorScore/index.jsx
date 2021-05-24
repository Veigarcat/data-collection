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
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import ButtonAdd from '../../../components/ButtonAdd';
import TitleHeader from '../../../components/TitleHeader';
import CalculatorScoreStyle from './calculatorScore.style';
import { LIST_CRITERIA } from '../../../constants/params';

export default function CalculatorScore({ campaign, setCampaign }) {
  const { t } = useTranslation();
  const [criteria, setCriteria] = useState({
    id: '',
    name: '',
    point: '',
  });
  const [criteriaError, setCriteriaError] = useState(false);
  const onChangeCriteria = (e) => {
    e.persist();
    setCriteria((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeSelectCriteria = (e) => {
    setCriteriaError(false);
    const criteriaIndexById = campaign.criteria.findIndex(
      (item) => item.id === e.target.value,
    );
    const criteriaById = LIST_CRITERIA.find(
      (item) => item.id === e.target.value,
    );
    setCriteria((prev) => ({
      ...prev,
      id: e.target.value,
      name: criteriaById.name,
    }));
    if (criteriaIndexById >= 0) {
      setCriteriaError(true);
    }
  };
  const handleClickAddCriteria = () => {
    const criteriaIndexById = campaign.criteria.findIndex(
      (item) => item.id === criteria.id,
    );
    if (criteriaIndexById >= 0) {
      setCampaign((prev) => ({
        ...prev,
        criteria: [
          ...campaign.criteria.slice(0, criteriaIndexById),
          {
            ...campaign.criteria[criteriaIndexById],
            point: criteria.point,
          },
          ...campaign.criteria.slice(criteriaIndexById + 1),
        ],
      }));
    } else {
      setCampaign((prev) => ({
        ...prev,
        criteria: [...campaign.criteria, criteria],
      }));
    }
    setCriteria({
      id: '',
      name: '',
      point: '',
    });
  };
  const handleEditCriteria = (itemEdit) => {
    setCriteriaError(false);
    setCriteria(itemEdit);
  };
  const handleDeleteCriteria = (itemDelete) => {
    const arrCriteria = campaign.criteria.filter(
      (item) => item.id !== itemDelete.id,
    );
    setCampaign((prev) => ({
      ...prev,
      criteria: arrCriteria,
    }));
  };
  return (
    <CalculatorScoreStyle>
      <div className="card">
        <Card className="card-container">
          <TitleHeader title="Cách tính điểm" />
          <CardContent>
            <div className="add-criteria">
              <div className="select-criteria">
                <Grid container className="select-container">
                  <Grid item sm={4} sx={4} className="select-item">
                    <Typography variant="subtitle1">Tiêu chí</Typography>
                  </Grid>
                  <Grid item sm={8} sx={8} className="select-item">
                    <FormControl
                      error={!!criteriaError}
                      className="form-control-select"
                    >
                      <Select
                        className={
                          criteriaError
                            ? 'select-component error'
                            : 'select-component'
                        }
                        value={criteria.id}
                        onChange={onChangeSelectCriteria}
                      >
                        {LIST_CRITERIA &&
                          LIST_CRITERIA.map((item) => (
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
                    {criteriaError && (
                      <Typography style={{ color: 'red' }} variant="caption">
                        {t('errorCriteriaHaveBeenAdded')}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </div>
              <div className="choose-score">
                <Typography variant="subtitle1" className="input-number-title">
                  Điểm
                </Typography>
                <FormControl className="number-format">
                  <NumberFormat
                    customInput={Input}
                    decimalScale={2}
                    name="point"
                    value={criteria.point}
                    onChange={onChangeCriteria}
                  />
                </FormControl>
              </div>
              <ButtonAdd
                handleClick={criteria.id ? handleClickAddCriteria : null}
                disable={!!criteriaError}
              >
                Thêm
              </ButtonAdd>
            </div>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tiêu chí </TableCell>
                    <TableCell align="right">Điểm</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaign.criteria &&
                    campaign.criteria.map((criteriaItem) => (
                      <TableRow key={criteriaItem.id}>
                        <TableCell component="th" scope="row">
                          {criteriaItem.name}
                        </TableCell>
                        <TableCell align="right">
                          {criteriaItem.point}
                        </TableCell>
                        <TableCell>
                          <EditIcon
                            className="icon icon-edit"
                            onClick={() => handleEditCriteria(criteriaItem)}
                          />
                          <DeleteIcon
                            className="icon icon-delete"
                            color="secondary"
                            onClick={() => handleDeleteCriteria(criteriaItem)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  {!campaign.criteria && (
                    <TableRow>
                      <TableCell colSpan={3}>Chưa có giá trị</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </CalculatorScoreStyle>
  );
}
