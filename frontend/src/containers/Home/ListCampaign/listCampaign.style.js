import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .list-campaign-container {
    border: 1px solid black;
    padding: 10px 20px;
    margin: 10px;
  }
  .title-list-campaign {
    text-align: center;
  }
  .campaign-item {
    padding: 20px 10px;
    margin-bottom: 20px;
    box-shadow: ${COLOR.gray[400]} 0px 2px 4px 0px,
      ${COLOR.gray[400]} 0px 2px 16px 0px;
  }
  .image-campaign {
    width: 90%;
  }
  .name-campaign {
    font-size: 35px;
  }
  .content-campaign {
    padding: 5px;
    position: relative;
  }
  .bonus-info {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 2%;
    right: 2%;
  }
  .button {
    margin-right: 10px;
  }
  .text-warning {
    color: ${COLOR.red[700]};
  }
  .loader-view {
    display: flex;
    justify-content: center;
  }
`;
