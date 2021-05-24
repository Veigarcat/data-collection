import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .result-user-container {
    margin: 20px;
  }
  .title-result-user {
    text-align: center;
  }
  .container-box {
    display: flex;
    flex-wrap: wrap;
  }
  .grid-item {
    width: 17%;
    height: 150px;
    display: flex;
    flex-direction: column;
    border-top: 10px solid ${COLOR.green[600]};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin: 15px;
  }
  .account-box {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px;
  }
  .title-account-box {
    height: 65%;
  }
  .number-account-box {
    height: 30%;
  }
  .divider {
    border: none;
    height: 1px;
    margin: 0 20px;
    flex-shrink: 0;
    background-color: ${COLOR.gray[400]};
  }
  .chart-progress {
    margin: 20px;
  }
`;
