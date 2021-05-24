import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .container {
    margin-top: 140px;
    box-shadow: 10px 10px 5px ${COLOR.gray[200]};
    padding: 20px;
    border: 1px solid ${COLOR.gray[300]};
  }
  .grid-form {
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .grid-button {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .button-submit {
    width: 20%;
    margin-bottom: 20px;
    padding: 10px 20px;
  }
  .textField {
    width: 100%;
    margin-top: 20px;
  }
  .formControl {
    margin-top: 20px;
  }
  .input-errors {
    display: none;
  }
  .text-errors {
    color: red;
    margin: 0px;
  }
`;
