import styled from 'styled-components';

export default styled.div`
  .select-container {
    width: 100%;
  }
  .select-item {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .select-component {
    width: 100%;
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
`;
