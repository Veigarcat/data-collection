import styled from 'styled-components';
// import { COLOR } from '../../styles/color';

export default styled.div`
  .select-container {
    width: 100%;
  }
  .select-item {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .form-control-select {
    width: 100%;
  }
  .select-component {
    width: 100%;
  }
  .error {
    color: red;
  }
  .icon {
    cursor: pointer;
  }
  .select-component-item {
    padding-right: 24px;
    height: auto;
    overflow: hidden;
    min-height: 1.1876em;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    min-width: 16px;
    user-select: none;
    border-radius: 0;
    padding: 6px 0 7px;
    animation-duration: 10ms;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  .input-errors {
    display: none;
  }
  .text-errors {
    color: red;
    margin: 0px;
  }
  .button {
    margin-left: 20px;
  }
  .container-button {
    display: flex;
    justify-content: center;
  }
  .grid-container-step-1 {
    display: flex;
  }
`;
