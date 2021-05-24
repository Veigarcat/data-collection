import styled from 'styled-components';
import { COLOR } from '../../../styles/color';
import { mainColors } from '../../../themes/styleConstant';

export default styled.div`
  .title-list-campaign {
    text-align: center;
    text-transform: uppercase;
  }
  .name-campaign {
    min-height: 64px;
  }
  .campaign-item {
    padding: 20px 10px;
    margin-bottom: 20px;
    box-shadow: ${COLOR.gray[400]} 0px 2px 4px 0px,
      ${COLOR.gray[400]} 0px 2px 16px 0px;
  }
  .bonus-info {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  /* .button-container {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 2%;
    right: 2%;
  } */
  .text-warning {
    color: ${COLOR.red[700]};
  }
  .loader-view {
    display: flex;
    justify-content: center;
  }
  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card-media {
    padding-top: 50%;
  }
  .card-action-container {
    display: flex;
    justify-content: center;
  }
  .pagination {
    margin: 10px;
  }
  .MuiCardContent-root {
    padding: 5px 15px;
  }
  .button-participate {
    background-color: ${mainColors.darkBlue};
  }
  .button-continue {
    background-color: ${mainColors.darkBlue};
  }
  .button-exit {
    background-color: ${mainColors.froly};
  }
  .button-progress {
    background-color: ${mainColors.buttercup};
  }
  .noData {
    margin: 0 auto;
  }
`;
