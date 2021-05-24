import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .audio-manage-container {
    min-height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .title-page {
    margin-top: 10px;
    text-align: center;
    text-transform: uppercase;
  }
  .pagination {
    margin: 20px 0;
  }
  .color-white {
    color: ${COLOR.white};
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .icon {
    cursor: pointer;
  }
  .text-icon {
    cursor: pointer;
  }
  .color-yellow {
    color: ${COLOR.yellow[800]};
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
  }
`;
