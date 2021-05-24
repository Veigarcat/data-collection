import styled from 'styled-components';

export default styled.div`
  .search-campaign-container {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
  }
  .search {
    position: relative;
    background-color: gray;
    opacity: 50%;
    width: 80%;
    border-radius: 10px;
    margin-top: 20px;
    margin: 20px auto;
    padding: 5px;
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
  .filter {
    box-shadow: none;
    margin: 20px;
    padding-top: 20px;
  }
  .title-filter {
    font-size: 20px;
    font-weight: bold;
  }
`;
