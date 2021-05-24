import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

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
  }
  .update-failed {
    color: ${COLOR.red[1000]};
    margin: 10px;
  }
  .input-info {
    margin: 5px 10px 5px;
    width: 90%;
  }
  .gender {
    margin-left: 25px;
    display: table-cell;
  }
  .update-button {
    text-align: center;
    display: flex;
    margin: auto;
    margin-bottom: 10px;
  }
  .change-password-show {
    display: block;
  }
  .change-password-hide {
    display: none;
  }
`;
