import styled from 'styled-components';

export default styled.div`
  .card-header {
    min-height: 50px;
    padding: 8px 20px 8px 10px;
    margin-top: 10px;
    border-radius: 3px;
    background-color: rgb(73, 145, 226);
    box-shadow: rgb(73 145 226 / 28%) 0px 12px 20px -10px,
      rgb(0 0 0 / 12%) 0px 4px 20px 0px, rgb(73 145 226 / 20%) 0px 7px 8px -5px;
    color: rgb(255, 255, 255);
    position: relative;
    width: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .header-text {
    margin: 0px;
    line-height: 30px;
    flex: 1 1 0%;
    color: rgb(255, 255, 255);
    padding: 0px 15px;
  }
  .button-icon {
    padding: 5px 10px;
    margin: 0px 10px;
    transition: background-color 0.2s ease 0.1s;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgb(255, 255, 255);
  }
`;
