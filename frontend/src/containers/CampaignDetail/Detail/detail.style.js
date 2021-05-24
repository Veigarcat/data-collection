import styled from 'styled-components';
// import { COLOR } from '../../styles/color';

export default styled.div`
  .info-campaign-container {
    padding: 10px;
    box-shadow: none;
    border-radius: 10px;
  }
  .title-info-campaign {
    text-align: center;
    padding-bottom: 10px;
    text-transform: uppercase;
  }
  .image-campaign {
    width: 100%;
    height: 260px;
    margin: auto;
  }
  .description-info-campaign {
    margin: 10px;
    text-align: justify;
  }
  .grid-title {
    width: 10%;
  }
  .grid-content {
    width: 90%;
  }
  .intent-title {
    list-style: disc outside none;
    display: list-item;
    margin-left: 50px;
  }
  .no-data-info-campaign {
    text-align: center;
    color: red;
  }
  .display-none {
    display: none;
  }
  .rdw-editor-wrapper {
    margin: 10px;
    font-size: 18px;
  }
  .time-info {
    padding-left: 30px;
  }
  .footer-container {
    margin: 0 auto;
    position: fixed;
    bottom: 0%;
    background: white;
    right: 0;
  }
  .button-functions {
    display: flex;
    justify-content: flex-end;
    z-index: 100000;
    padding-bottom: 10px;
  }
  .button {
    margin-right: 10px;
  }
  .campaign-content {
    margin-top: 20px;
    margin-bottom: 70px;
  }
  .MuiAccordion-rounded:last-child {
    width: 100%;
  }
`;
