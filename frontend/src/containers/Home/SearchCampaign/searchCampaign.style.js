import styled from 'styled-components';
import { COLOR } from '../../../styles/color';

export default styled.div`
  .search-campaign-container {
    padding: 10px 15px;
    background-color: ${COLOR.white[100]};
    display: flex;
  }
  /* .search {
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }*/
  .input-search {
    width: 100%;
  }
  /* .search-icon {
    right: 0;
    height: 100%;
    position: absolute;
    pointer-events: none;
    align-items: center;
    justify-content: center;
  } */
  .filter {
    box-shadow: none;
  }
  .title-filter {
    font-size: 18px;
    font-weight: bold;
  }
  .radio-group {
    margin-left: 10px;
  }
`;
