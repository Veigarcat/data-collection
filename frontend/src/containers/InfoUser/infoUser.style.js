import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .info-user-container {
    margin: 10px;
  }
  .info-user-title {
    text-align: center;
    margin: 10px;
  }
  .update-success {
    color: ${COLOR.green[1000]};
    margin: 10px;
    padding-top: 10px;
  }
  .update-failed {
    color: ${COLOR.red[1000]};
    margin: 10px;
  }
  .input-info {
    margin: 20px 10px 5px;
    width: 90%;
  }
  .gender {
    margin-left: 25px;
    display: table-cell;
  }
  .accent {
    margin-left: 25px;
    display: table-cell;
  }
  .change-password-show {
    display: block;
  }
  .change-password-hide {
    display: none;
  }
  .update {
    margin-bottom: 20px;
    margin-right: 20px;
  }
  .update-advanced {
    margin-bottom: 20px;
  }
  .info-user {
    background: white;
    box-shadow: ${COLOR.gray[400]} 0px 2px 4px 0px,
      ${COLOR.gray[400]} 0px 2px 16px 0px;
    width: 50%;
    margin: 0 auto;
    text-align: center;
    border-radius: 1px;
  }
`;
