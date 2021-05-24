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
  .table-container {
    width: 87%;
    margin: 0 auto;
  }
  .table {
    width: 100%;
  }
  .add-intent {
    display: flex;
    align-items: center;
  }
  .title-name-list-intent {
    text-align: center;
    margin-top: 20px;
  }
  .select-container {
    flex: 1 1 0%;
  }
`;
