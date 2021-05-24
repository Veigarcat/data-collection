import styled from 'styled-components';
import { COLOR } from '../../styles/color';

export default styled.div`
  .info-campaign-container {
    width: 80%;
    padding: 20px;
    margin: 20px auto;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    border-radius: 10px;
  }
  .campaign-wrapper {
    height: 67vh;
    overflow: auto;
    margin: 0 20px;
  }
  .campaign-wrapper::-webkit-scrollbar {
    width: 10px;
  }
  .campaign-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${COLOR.gray[200]};
    border-radius: 10px;
  }
  .campaign-wrapper::-webkit-scrollbar-thumb {
    background: ${COLOR.gray[400]};
    border-radius: 10px;
  }
  .campaign-wrapper::-webkit-scrollbar-thumb:hover {
    background: ${COLOR.gray[100]};
  }
  .title-info-campaign {
    text-align: center;
  }
  .image-campaign {
    max-width: 60%;
    max-height: 40%;
    width: auto;
    height: auto;
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
  .button-functions {
    margin: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .button {
    margin-right: 10px;
  }
  .no-data-info-campaign {
    text-align: center;
    color: red;
  }
`;
