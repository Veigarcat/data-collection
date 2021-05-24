import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .usecase-list {
    margin: 10px;
    border: 2px solid #d0c6c6;
    height: calc(100vh - 95px);
    box-shadow: ${COLOR.gray[400]} 0px 2px 4px 0px,
      ${COLOR.gray[400]} 0px 2px 16px 0px;
    border-radius: 10px;
  }
  .usecase-item {
    margin: 10px;
    padding: 15px;
    box-shadow: none;
    border: 2px solid #d0c6c6;
  }
  .button {
    display: flex;
    justify-content: flex-end;
  }
`;
