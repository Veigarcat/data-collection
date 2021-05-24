import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .audio-manage-container {
    flex-grow: 1;
  }
  .table-row-header {
    background-color: ${COLOR.blue[500]};
    color: ${COLOR.white};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .table-cell {
    text-transform: capitalize;
  }
  .status-button {
    display: flex;
    justify-content: center;
  }
  .group-button{
    display: flex;
    justify-content: flex-end;
  }
  .color-white{
    color: white;
    font-size:20px;
  }
  .headerCell {
    background: ${COLOR.blue[500]};
    border: 1px solid rgba(224, 224, 224, 1);
    color: white;
  }
  .table-asr {
    margin: 5px 0;
  }
  .search-information {
    min-width: calc(100% / 6 - 5px);
    margin-right: 5px;
  }
`;
