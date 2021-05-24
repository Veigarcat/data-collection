import React from 'react';
import { Grid, Select, MenuItem, Typography } from '@material-ui/core';
import SelectStyle from './index.style';

export default function SelectComponent({
  params,
  name,
  setState,
  title,
  select,
}) {
  const onHandleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <SelectStyle>
      <Grid container className="select-container">
        <Grid item sm={4} sx={4} className="select-item">
          <Typography variant="subtitle1">{title}</Typography>
        </Grid>
        <Grid item sm={8} sx={8} className="select-item">
          <Select
            labelId="demo-customized-select-label"
            className="select-component"
            value={params}
            name={name}
            onChange={onHandleChange}
          >
            {select &&
              select.map((item) => (
                <MenuItem
                  value={item.id}
                  className="select-component-item"
                  key={item.id}
                >
                  {item.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </Grid>
    </SelectStyle>
  );
}
