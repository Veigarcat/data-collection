import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .container {
    padding: 20px;
    margin-top: 60px;
    display: flex;
  }
  .title_filter {
    color: ${COLOR.black};
    margin-bottom: 20px;
  }
  .table-container {
    margin: 0 20px;
    padding: 20px;
    border: 1px solid black;
    background-color: #FFFFE;
  }
  .title-table-result-user {
    padding-bottom: 20px;
    text-align: center;
  }
  .table-header {
    background-color: ${COLOR.green[200]};
  }
  .table-row {
    background-color: ${COLOR.white};
  }
  .table-row-sole {
    background-color: ${COLOR.gray[200]};
  }
  .table-pagination {
    background-color: ${COLOR.pink[100]};
  }
`;
