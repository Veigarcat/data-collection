import styled from 'styled-components';
import { COLOR } from '../../styles/color';
import { mainColors } from '../../themes/styleConstant';

export default styled.div`
  .usecase {
    margin: 10px;
    height: calc(100vh - 95px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .title-usecase {
    text-transform: uppercase;
  }
  .desc-usecase {
    text-align: center;
    padding: 5px 10px;
    border-radius: none;
    .detail-desc-usecase {
      text-align: left;
    }
  }
  .tab-panel {
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 0%;
  }
  .content-main {
    height: calc(100vh - 164px);
    overflow: auto;
  }
  .content-main::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  .content-main::-webkit-scrollbar-track::-webkit-scrollbar-track {
    background: ${COLOR.gray[200]};
  }
  /* Handle */
  .content-main::-webkit-scrollbar-thumb {
    background: ${COLOR.gray[200]};
  }
  .intent {
    text-align: center;
    padding: 5px 10px;
    flex-grow: 1;
    .intent-detail {
      text-align: left;
    }
  }
  .discussion-container {
    padding-bottom: 10px;
  }
  .item-question {
    padding-bottom: 10px;
  }

  .number-detail {
    display: flex;
    justify-content: space-around;
  }
  .number {
    width: 25px;
    margin-left: 20px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sum-discussion {
    background-color: red;
    color: white;
  }
  .sum-submit {
    background-color: yellow;
    border-radius: 50%;
    color: black;
  }
  .button-convert {
    background-color: ${mainColors.buttercup};
    color: white;
  }
  .button-end {
    color: green;
  }
  .header {
    position: relative;
    height: auto;
  }
  .MuiTabs-flexContainer {
    display: flex;
    align-items: center;
  }
  .button {
    position: absolute;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 992px) {
    .text-button {
      display: none;
    }
  }
`;
