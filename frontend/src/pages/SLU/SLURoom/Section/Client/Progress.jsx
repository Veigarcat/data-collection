/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-lonely-if */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import intentInfo from '../../constant/intent';
import './Progress.css';

export default function Progress(props) {
  const { scenario, currentIntent } = props;

  /* eslint-disable-next-line no-shadow */
  const compareProperty = (scenarioProp, currentIntent) => {
    if (!scenarioProp) return false;
    if (!currentIntent || currentIntent.length === 0) return null;
    const scenarioPropIndex = currentIntent.findIndex((item) => {
      return item[0] === scenarioProp[0];
    });

    if (scenarioPropIndex === -1) return null;
    else {
      if (
        (scenarioProp[1] === '-1' || scenarioProp[1] === -1) &&
        currentIntent[scenarioPropIndex][1] !== null
      )
        return currentIntent[scenarioPropIndex][1];
      else {
        if (scenarioProp[0] === 'name') {
          if (
            scenarioProp[1].toLowerCase() ===
            currentIntent[scenarioPropIndex][1].toLowerCase()
          ) {
            return currentIntent[scenarioPropIndex][1];
          }
        }
        if (scenarioProp[1] === currentIntent[scenarioPropIndex][1])
          return currentIntent[scenarioPropIndex][1];
        return null;
      }
    }
  };

  const getLabel = (slot) => {
    const slotIndex = intentInfo.SLOT_LABEL.findIndex((item) => {
      return item.tag.toUpperCase() === slot.toUpperCase();
    });

    return slotIndex === -1 ? '' : intentInfo.SLOT_LABEL[slotIndex].name;
  };

  const showCity = (cityIndex) => {
    return intentInfo.CITY[cityIndex];
  };

  const showDistrictScenario = (districtIndex) => {
    const cityIndex = scenario.findIndex((item) => {
      return item[0] === 'city';
    });
    const cityName = showCity(scenario[cityIndex][1]);
    return intentInfo.DISTRICT[cityName][districtIndex];
  };

  const renderProgress =
    scenario && scenario.length !== 0
      ? scenario.map((property, index) => {
          const slotValue = compareProperty(property, currentIntent);
          return (
            <Grid item sm={12} md={12} key={property[0]}>
              <Checkbox color="primary" checked={slotValue !== null} />
              <b>{index === 0 ? 'Ý định' : getLabel(property[0])}</b>:{' '}
              {property[1] === '-1' || property[1] === -1
                ? '<Tùy chọn>'
                : property[0] === 'name' ||
                  property[0] === 'cmnd' ||
                  property[0] === 'four_last_digits'
                ? property[1]
                : property[0] === 'city'
                ? showCity(property[1])
                : property[0] === 'district'
                ? showDistrictScenario(property[1])
                : intentInfo[property[0].toUpperCase()][property[1]].name}
            </Grid>
          );
        })
      : 'Đang tải...';

  if (scenario.length === 0) {
    return 'Đang tải';
  }

  return (
    <>
      <Grid container>{renderProgress}</Grid>
    </>
  );
}
