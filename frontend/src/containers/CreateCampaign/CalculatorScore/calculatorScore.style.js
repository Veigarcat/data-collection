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
  .add-criteria {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .select-criteria {
    width: 50%;
  }
  .choose-score {
    width: 20%;
    display: flex;
    margin: 0 20px;
  }
  .number-format {
    margin-top: 6px;
  }
  .input-number-title {
    margin: 0 10px;
  }
  .table-container {
    width: 80%;
    margin: 20px auto;
  }
  .table {
    width: 100%;
  }
`;
