/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Select,
  InputLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import intentInfo from '../../constant/intent';
import './Dropdown.css';

const intentData = intentInfo.INTENT;
const genericIntentData = intentInfo.GENERIC_INTENT;

const useStyles = makeStyles((theme) => ({
  mainFormControl: {
    minWidth: 200,
    marginBottom: '10px',
  },
  formSelectControl: {
    marginRight: theme.spacing(1),
    marginTop: '5px',
    marginBottom: '20px',
    minWidth: 200,
    width: '31%',
  },
  formTypeControl: {
    marginRight: theme.spacing(1),
    minWidth: 200,
    width: '31%',
  },
  selectEmpty: {},
}));

export default function Dropdown(props) {
  const classes = useStyles();
  const tagVisible = props ? props.visible : true;
  const disabled = props ? props.disabled : false;
  const turn = props ? props.turn : -1;

  const [radioValue, setRadioValue] = useState('1');

  const [selectedIntent, setSelectedIntent] = useState(null);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtList, setDisctrictList] = useState([]);
  const [validator, setValidator] = useState({
    name: ' ',
    cmnd: ' ',
    four_last_digits: ' ',
  });

  useEffect(() => {
    if (selectedDistrict !== null || districtList.length !== 0) {
      setSelectedDistrict(null);
      setDisctrictList([]);
    }
  }, [turn]);

  const handleIntentChange = (value) => {
    const intentIndex = intentData.findIndex((item) => {
      return item.name === value;
    });
    setSelectedIntent(intentIndex);
    props.setIntent(intentIndex);
  };

  const handleGenericIntentChange = (value) => {
    const genericIntentIndex = genericIntentData.findIndex((item) => {
      return item === value;
    });
    props.setGenericIntent(genericIntentIndex);
  };

  const onSlotSelectChange = (slot, value) => {
    const slotIndex = intentInfo[slot.toUpperCase()].findIndex((item) => {
      return item.name === value;
    });

    props.setSlot(slot, slotIndex);
  };

  const onSlotTypeChange = (e) => {
    const slot = e.target.name;
    const slotValue = e.target.value;

    if (slotValue === '') {
      let newValidator = validator;
      newValidator[slot] = ' ';
      setValidator(newValidator);
    } else {
      if (slot === 'cmnd') {
        const re = '^[0-9]+$';
        if (!new RegExp(re).test(slotValue)) {
          let newValidator = validator;
          newValidator[slot] = 'CMND chỉ nhận số!';
          setValidator(newValidator);
        } else {
          let newValidator = validator;
          newValidator[slot] = ' ';
          setValidator(newValidator);
        }
      }

      if (slot === 'four_last_digits') {
        const re = '^[0-9]+$';
        if (slotValue.length !== 4 || !new RegExp(re).test(slotValue)) {
          let newValidator = validator;
          newValidator[slot] = 'Phải nhập 4 số!';
          setValidator(newValidator);
        } else {
          let newValidator = validator;
          newValidator[slot] = ' ';
          setValidator(newValidator);
        }
      }
    }

    // if the input contains only whitespace, nullify it
    props.setSlot(slot, !slotValue.trim() ? null : slotValue);
  };

  const handleCityChange = (value) => {
    setDisctrictList(intentInfo.DISTRICT[value]);
    setSelectedDistrict(null);
    const cityIndex = intentInfo.CITY.findIndex((item) => {
      return item === value;
    });

    props.setSlot('city', cityIndex);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    const districtIndex = districtList.findIndex((item) => {
      return item === value;
    });

    props.setSlot('district', districtIndex);
  };

  const onRadioGroupChange = (e) => {
    if (e.target.value === '1') props.toggleTagVisibility(true);
    else props.toggleTagVisibility(false);
    setRadioValue(e.target.value);
  };

  const getLabel = (slot) => {
    const slotIndex = intentInfo.SLOT_LABEL.findIndex((item) => {
      return item.tag.toUpperCase() === slot.toUpperCase();
    });

    return slotIndex === -1 ? '' : intentInfo.SLOT_LABEL[slotIndex].name;
  };

  const renderMainIntent = (
    <Grid container>
      <FormControl className={classes.mainFormControl} fullWidth={true}>
        <Autocomplete
          options={intentData}
          clearOnEscape={true}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) =>
            handleIntentChange(newValue !== null ? newValue.name : null)
          }
          disabled={disabled || !tagVisible}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
    </Grid>
  );

  const emptyOption = (
    <FormControl className={classes.formSelectControl}>
      <InputLabel>Phải chọn ý định trước!</InputLabel>
      <Select defaultValue="" disabled={true}></Select>
    </FormControl>
  );

  const renderSlots = (slot, slotValuePool) => {
    if (slot === null) return emptyOption;

    if (slot === 'city') {
      return (
        <FormControl
          className={classes.formSelectControl}
          key={`${selectedIntent} ${slot} ${turn}`}
        >
          <Autocomplete
            options={intentInfo.CITY}
            // key={`city_${turn}`}
            clearOnEscape={true}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => handleCityChange(newValue)}
            disabled={disabled || !tagVisible}
            renderInput={(params) => (
              <TextField {...params} label={getLabel(slot)} />
            )}
          />
        </FormControl>
      );
    }

    if (slot === 'district') {
      return (
        <FormControl
          className={classes.formSelectControl}
          key={`${selectedIntent} ${slot} ${turn}`}
        >
          <Autocomplete
            value={selectedDistrict}
            // key={`district_${turn}`}
            clearOnEscape={true}
            options={districtList || []}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => handleDistrictChange(newValue)}
            disabled={disabled || !tagVisible}
            renderInput={(params) => (
              <TextField {...params} label={getLabel(slot)} />
            )}
          />
        </FormControl>
      );
    }

    if (slotValuePool !== undefined) {
      return (
        <FormControl
          className={classes.formSelectControl}
          key={`${selectedIntent} ${slot} ${turn}`}
        >
          <Autocomplete
            options={slotValuePool}
            // key={`${getLabel(slot)}_${turn}`}
            clearOnEscape={true}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) =>
              onSlotSelectChange(slot, newValue !== null ? newValue.name : null)
            }
            disabled={disabled || !tagVisible}
            renderInput={(params) => (
              <TextField {...params} label={getLabel(slot)} />
            )}
          />
        </FormControl>
      );
    }

    return (
      <FormControl
        className={classes.formTypeControl}
        key={`${selectedIntent} ${slot} ${turn}`}
      >
        <TextField
          autoComplete="off"
          // key={`${getLabel(slot)}_${turn}`}
          error={validator[slot] !== ' '}
          helperText={validator[slot] !== ' ' ? validator[slot] : ' '}
          name={slot}
          label={getLabel(slot)}
          onChange={onSlotTypeChange}
          disabled={disabled || !tagVisible}
        />
      </FormControl>
    );
  };

  const renderGenericIntent = (
    <FormControl className={classes.mainFormControl} fullWidth={true}>
      <Autocomplete
        options={genericIntentData}
        clearOnEscape={true}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => handleGenericIntentChange(newValue)}
        disabled={disabled || tagVisible}
        renderInput={(params) => <TextField {...params} />}
      />
    </FormControl>
  );

  return (
    <FormControl fullWidth={true}>
      <RadioGroup
        onChange={onRadioGroupChange}
        value={radioValue}
        disabled={disabled}
      >
        <FormControlLabel
          value="1"
          control={
            <Radio style={{ paddingBottom: '85px' }} disabled={disabled} />
          }
          label={
            <Grid container alignItems="center">
              <Grid
                item
                xs={3}
                // style={{marginBottom: "13px"}}
              >
                <div>Ý định nghiệp vụ</div>
              </Grid>

              <Grid item xs={9}>
                {renderMainIntent}
              </Grid>

              <Grid item xs={3}></Grid>

              <Grid item xs={9}>
                <Grid container alignItems="flex-end">
                  {intentData[selectedIntent]
                    ? intentData[selectedIntent].slot.map((slot) => {
                        const slotValuePool = intentInfo[slot.toUpperCase()];
                        return renderSlots(slot, slotValuePool);
                      })
                    : emptyOption}
                </Grid>
              </Grid>
            </Grid>
          }
        />

        <FormControlLabel
          value="2"
          control={<Radio disabled={disabled} />}
          style={{ marginTop: '10px' }}
          label={
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <div>Ý định khác</div>
              </Grid>

              <Grid item xs={9}>
                {renderGenericIntent}
              </Grid>
            </Grid>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
