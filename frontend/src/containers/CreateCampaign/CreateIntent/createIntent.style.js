import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .card {
    padding: 1px 0;
  }
  .card-container {
    margin: 20px 10px;
    min-height: 200px;
    width: unset;
    background: ${COLOR.gray[200]};
    border: 0px;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 14%) 0px 1px 4px 0px;
    border-radius: 6px;
    padding: 10px 15px 15px;
  }
  .select-usecase {
    width: 60%;
  }
  .title-name-usecase {
    text-align: center;
  }
  .add-usecase {
    margin: 20px auto;
    padding: 30px;
    width: 60%;
    border: 1px solid ${COLOR.gray[400]};
    border-radius: 20px;
  }
  .usecase-name {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .input-title {
    width: 20%;
  }
  .form-control-name-usecase {
    width: 100%;
  }
  .input-name-usecase {
    width: 100%;
    border: 1px solid ${COLOR.gray[400]};
    padding: 5px 10px;
  }
  .add-intent {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .add-participant {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .select-participant {
    width: 40%;
  }
  .number-participant {
    margin: 0 20px;
    display: flex;
  }
  .number-format {
    margin-top: 6px;
  }
  .usecase-desc {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .name-intent {
    margin-top: 20px;
  }
  .table-container {
    width: 80%;
    margin: 20px;
  }
  .table {
    width: 100%;
  }
  .button-add-intent {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
  .email-participant {
    margin: 0 20px;
    display: flex;
    width: 50%;
    flex: 1 1 0%;
  }
  .form-control {
    margin-left: 15px;
    width: 70%;
  }
`;
