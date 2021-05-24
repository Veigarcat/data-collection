import styled from 'styled-components';
import { SIZE } from '../../../styles/size';

export default styled.div`
  .root {
    display: flex;
    z-index: 1000000;
  }
  .topbar {
    height: ${SIZE.heightTopBar};
    display: flex;
    align-items: center;
    background-color: rgb(0, 0, 52);
  }
  .text {
    color: white;
  }
  .topbar-left {
    display: flex;
    align-items: center;
    width: 20%;
  }
  .topbar-right {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    align-items: center;
  }
  .menu button {
    margin-right: 20px;
  }
  .search {
    position: relative;
    background-color: white;
    opacity: 50%;
    width: 50%;
    border-radius: 5px;
  }
  .search-icon {
    padding: 0 10px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-search {
    padding-left: 50px;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
`;
