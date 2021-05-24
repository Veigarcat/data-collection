import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .choose-usecase-container {
    width: 80%;
  }
  .choose-usecase-title {
    margin-top: 11px;
    padding-right: 10px;
  }
  .add-usecase {
    padding: 30px;
    background-color: ${COLOR.gray[100]};
  }
  .uc-container {
    margin-bottom: 10px;
  }
  .form-control-name-usecase {
    width: 100%;
  }
  .input-name-usecase {
    border: 1px solid ${COLOR.gray[400]};
    padding: 5px 10px;
  }
  .input_text_tts {
    border: 1px solid ${COLOR.gray[400]};
    background-color: ${COLOR.gray[100]};
    padding: 10px;
  }
  .add-intent {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .choose-intent-title {
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
`;
